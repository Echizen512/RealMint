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
    }

    //States
    uint256 public nextAssetId;
    mapping(uint256 => Asset) public assets;
    mapping(address => uint256[]) public assetsPublishedBy;
    mapping(address => mapping(uint256 => uint256)) public tokensOwnedByUser;

    //Events
    event AssetPublished(uint256 indexed assetId, address indexed seller);
    event TokensPurchased(uint256 indexed assetId, address indexed buyer, uint256 amount);
    event AssetDeactivated(uint256 indexed assetId);

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
            isActive: true
        });

        assetsPublishedBy[msg.sender].push(nextAssetId);
        emit AssetPublished(nextAssetId, msg.sender);
        nextAssetId++;
    }

    function buyTokens(uint256 assetId, uint256 amount) external payable {
        Asset storage asset = assets[assetId];
        require(asset.seller != address(0), "Asset does not exist");
        require(asset.isActive, "Asset not active");
        require(amount > 0 && amount <= asset.tokensAvailable, "Invalid amount");
        require(asset.tokenSupply > 0, "Invalid token supply");

        uint256 pricePerToken = asset.price / asset.tokenSupply;
        uint256 totalCost = pricePerToken * amount;

        require(msg.value == totalCost, "Incorrect ETH amount sent");

        // Transfer ETH to the seller
        payable(asset.seller).transfer(msg.value);

        asset.tokensAvailable -= amount;

        if (asset.tokensAvailable == 0) {
            asset.isActive = false;
            emit AssetDeactivated(assetId);
        }

        emit TokensPurchased(assetId, msg.sender, amount);

        tokensOwnedByUser[msg.sender][assetId] += amount;
    }

    function getAsset(uint256 assetId) external view returns (Asset memory) {
        require(assets[assetId].seller != address(0), "Asset does not exist");
        return assets[assetId];
    }

    function getPricePerToken(uint256 assetId) external view returns (uint256) {
        Asset memory asset = assets[assetId];
        require(asset.tokenSupply > 0, "Invalid token supply");
        return asset.price / asset.tokenSupply;
    }

    function deactivateAsset(uint256 assetId) external {
        Asset storage asset = assets[assetId];
        require(asset.seller != address(0), "Asset does not exist");
        require(msg.sender == asset.seller || msg.sender == owner(), "Not authorized");
        require(asset.isActive, "Asset already inactive");

        asset.isActive = false;
        emit AssetDeactivated(assetId);
    }

    function getAllAssets() external view returns (Asset[] memory) {
        Asset[] memory allAssets = new Asset[](nextAssetId);
        for (uint256 i = 0; i < nextAssetId; i++) {
            allAssets[i] = assets[i];
        }
        return allAssets;
    }

    function getPublishedAssets(address user) external view returns (uint256[] memory) {
        return assetsPublishedBy[user];
    }

}
