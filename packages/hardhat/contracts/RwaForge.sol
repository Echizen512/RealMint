// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract RwaForge is Ownable {
    //Structs
    struct Asset {
        uint256 id;
        address seller;
        string title;
        string description;
        string category;
        string location;
        string[] imageURIs;
        uint256 price;
        uint256 tokenSupply;
        uint256 tokensAvailable;
        bool isActive;
        uint256 date;
    }

    struct AssetPurchased {
        uint256 purchaseID;
        uint256 assetID;
        address buyer;
        string title;
        string description;
        string category;
        string[] imageUris;
        uint256 amount;
    }

    //States
    uint256 public nextAssetId;
    uint256 public purchaseID;

    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public assetsPublishedBy;
    mapping(address => mapping(uint256 => uint256)) public tokensOwnedByUser;
    mapping(address => AssetPurchased[]) private purchasesByBuyer;

    //Events
    event AssetPublished(uint256 indexed _assetId, address indexed seller);
    event AssetsPurchasedEvent(uint256 indexed _assetId, address indexed buyer, uint256 amount);
    event AssetDeactivated(uint256 indexed _assetId);

    constructor() Ownable(msg.sender) {}

    function publishAsset(
        string memory title,
        string memory description,
        string memory category,
        string memory location,
        string[] memory _imageURIs,
        uint256 price,
        uint256 tokenSupply
    ) external {
        require(price > 0, "Price must be positive");
        require(tokenSupply > 0, "Token supply must be positive");
        require(_imageURIs.length >= 1, "At least one image is required");
        require(_imageURIs.length <= 5, "Maximum of 5 images allowed");

        for (uint i = 0; i < _imageURIs.length; i++) {
            require(bytes(_imageURIs[i]).length > 0, "Image URI cannot be empty");
        }

        assets[nextAssetId] = Asset({
            id: nextAssetId,
            seller: msg.sender,
            title: title,
            description: description,
            category: category,
            location: location,
            imageURIs: _imageURIs,
            price: price,
            tokenSupply: tokenSupply,
            tokensAvailable: tokenSupply,
            isActive: true,
            date: block.timestamp
        });

        assetsPublishedBy[msg.sender].push(nextAssetId);
        emit AssetPublished(nextAssetId, msg.sender);
        nextAssetId++;
    }

    function buyTokens(uint256 _assetId, uint256 amount) external payable {
        Asset storage asset = assets[_assetId];
        require(asset.seller != address(0), "Asset does not exist");
        require(asset.isActive, "Asset not active");
        require(amount > 0 && amount <= asset.tokensAvailable, "Invalid amount");
        require(asset.tokenSupply > 0, "Invalid token supply");

        uint256 pricePerToken = asset.price / asset.tokenSupply;
        uint256 totalCost = pricePerToken * amount;

        require(msg.value == totalCost, "Incorrect ETH amount sent");

        (bool sent, ) = asset.seller.call{ value: msg.value }("");
        require(sent, "ETH transfer failed");

        asset.tokensAvailable -= amount;

        if (asset.tokensAvailable == 0) {
            asset.isActive = false;
            emit AssetDeactivated(_assetId);
        }

        emit AssetsPurchasedEvent(_assetId, msg.sender, amount);

        tokensOwnedByUser[msg.sender][_assetId] += amount;
        purchasesByBuyer[msg.sender].push(
            AssetPurchased(
                purchaseID,
                _assetId,
                msg.sender,
                asset.title,
                asset.description,
                asset.category,
                asset.imageURIs,
                amount
            )
        );
        purchaseID++;
    }

    // === Getters ===
    function getAsset(uint256 _assetId) external view returns (Asset memory) {
        require(assets[_assetId].seller != address(0), "Asset does not exist");
        return assets[_assetId];
    }

    function getPricePerToken(uint256 _assetId) external view returns (uint256) {
        Asset memory asset = assets[_assetId];
        require(asset.tokenSupply > 0, "Invalid token supply");
        return asset.price / asset.tokenSupply;
    }

    function deactivateAsset(uint256 _assetId) external {
        Asset storage asset = assets[_assetId];
        require(asset.seller != address(0), "Asset does not exist");
        require(msg.sender == asset.seller || msg.sender == owner(), "Not authorized");
        require(asset.isActive, "Asset already inactive");

        asset.isActive = false;
        emit AssetDeactivated(_assetId);
    }

    function getAllAssets() external view returns (Asset[] memory) {
        Asset[] memory allAssets = new Asset[](nextAssetId);
        for (uint256 i = 0; i < nextAssetId; i++) {
            allAssets[i] = assets[i];
        }
        return allAssets;
    }

    function getAllPublishedAssets(address _publisher) external view returns (Asset[] memory) {
        Asset[] memory allAssets = new Asset[](nextAssetId);
        for (uint256 i = 0; i < nextAssetId; i++) {
            if (assets[i].seller == _publisher) {
                allAssets[i] = assets[i];
            }
        }
        return allAssets;
    }

    function getAllAssetsPurchased(address _buyer) external view returns (AssetPurchased[] memory) {
        return purchasesByBuyer[_buyer];
    }

    function getTokensOwnedByUser(address user, uint256 _assetId) external view returns (uint256) {
        return tokensOwnedByUser[user][_assetId];
    }
}
