// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealMintMarketplace is Ownable {
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

    IERC20 public usdc;
    uint256 public nextAssetId;
    mapping(uint256 => Asset) public assets;

    event AssetPublished(uint256 indexed assetId, address indexed seller);
    event TokensPurchased(uint256 indexed assetId, address indexed buyer, uint256 amount);
    event AssetDeactivated(uint256 indexed assetId);

    constructor(address _usdcAddress) Ownable(msg.sender) {
        require(_usdcAddress != address(0), "Invalid USDC address");
        usdc = IERC20(_usdcAddress);
    }

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

        // Validar que ninguna URI esté vacía
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

        emit AssetPublished(nextAssetId, msg.sender);
        nextAssetId++;
    }

    function buyTokens(uint256 assetId, uint256 amount) external {
        Asset storage asset = assets[assetId];
        require(asset.seller != address(0), "Asset does not exist");
        require(asset.isActive, "Asset not active");
        require(amount > 0 && amount <= asset.tokensAvailable, "Invalid amount");
        require(asset.tokenSupply > 0, "Invalid token supply");

        uint256 pricePerToken = asset.price / asset.tokenSupply;
        uint256 totalCost = pricePerToken * amount;

        require(usdc.transferFrom(msg.sender, asset.seller, totalCost), "USDC transfer failed");

        asset.tokensAvailable -= amount;

        if (asset.tokensAvailable == 0) {
            asset.isActive = false;
            emit AssetDeactivated(assetId);
        }

        emit TokensPurchased(assetId, msg.sender, amount);
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
}
