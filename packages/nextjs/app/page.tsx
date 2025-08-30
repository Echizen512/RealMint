"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const categories = ["All", "Real Estate", "Collectibles", "Commodities", "Vehicles", "Art"];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price-low");

  const { address: connectedAddress } = useAccount();

  const { data: assets } = useScaffoldReadContract({
    contractName: "RealMintMarketplace",
    functionName: "getAllAssets",
  });

  const { writeContractAsync: buyTokens } = useScaffoldWriteContract("RealMintMarketplace");

  const filteredAssets = useMemo(() => {
    if (!assets) return [];

    return assets
      .filter(asset => {
        const matchesSearch =
          asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || asset.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return Number(a.price) - Number(b.price);
          case "price-high":
            return Number(b.price) - Number(a.price);
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [assets, searchTerm, selectedCategory, sortBy]);

  const formatPrice = (price: bigint) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(price));

  return (
    <div className="min-h-screen bg-base-300 text-base-content">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Asset Marketplace</h1>
          <p className="text-sm opacity-70">Discover and invest in tokenized real-world assets</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-outline"}`}
              >
                {category}
              </button>
            ))}
          </div>

          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="select select-bordered">
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map(asset => {
            const isSeller = asset.seller.toLowerCase() === connectedAddress?.toLowerCase();
            const isSoldOut = Number(asset.tokensAvailable) === 0;
            const canBuy = asset.isActive && !isSeller && !isSoldOut;

            return (
              <div
                key={Number(asset.id)}
                className="rounded-box border border-base-300 bg-base-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={asset.imageURIs[0] || "/placeholder.svg"}
                    alt={asset.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <div className={`badge ${asset.isActive ? "badge-primary" : "badge-neutral"}`}>
                      {asset.isActive ? "Available" : "Sold Out"}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="badge badge-outline backdrop-blur-sm bg-base-100/80">{asset.category}</div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{asset.title}</h3>
                  <p className="text-sm opacity-70 mb-3 line-clamp-2">{asset.description}</p>
                  <div className="flex justify-between text-sm opacity-70 mb-3">
                    <span>{asset.location}</span>
                    <span>
                      {Number(asset.tokensAvailable)}/{Number(asset.tokenSupply)} tokens
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-2xl font-bold text-success">{formatPrice(asset.price)}</div>
                      <div className="text-xs opacity-70">USDC</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {((Number(asset.tokensAvailable) / Number(asset.tokenSupply)) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs opacity-70">Available</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    className="btn btn-primary w-full"
                    disabled={!canBuy}
                    onClick={() => {
                      const pricePerToken = asset.price / BigInt(asset.tokenSupply);
                      const totalCost = pricePerToken * BigInt(1);

                      buyTokens(
                        {
                          functionName: "buyTokens",
                          args: [BigInt(asset.id), BigInt(1)],
                        },
                        {
                          value: totalCost,
                        }
                      );
                    }}
                  >
                    {canBuy ? "Buy Tokens" : isSeller ? "Your Asset" : "Sold Out"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg opacity-70 mb-2">No assets found</div>
            <div className="text-sm opacity-50">Try adjusting your search terms or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
