"use client";

import { useEffect, useState } from "react";
import { BarChart3, Calendar, Package, ShoppingBag } from "lucide-react";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [ownedAssets] = useState<any[]>([]);
  const { address } = useAccount();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const { data: publishedIds } = useScaffoldReadContract({
    contractName: "RwaForge",
    functionName: "getPublishedAssets",
    args: [address],
  });

  const { data: allAssets } = useScaffoldReadContract({
    contractName: "RwaForge",
    functionName: "getAllAssets",
  });

  const publishedCount = Array.isArray(publishedIds) ? publishedIds.length : 0;
  const soldCount =
    allAssets?.filter(
      asset => asset.seller.toLowerCase() === address?.toLowerCase() && Number(asset.tokensAvailable) === 0,
    ).length || 0;

  const soldAssets =
    allAssets
      ?.filter(asset => asset.seller.toLowerCase() === address?.toLowerCase() && Number(asset.tokensAvailable) === 0)
      .map(asset => ({
        id: asset.id,
        title: asset.title,
        category: asset.category,
        image: asset.imageURIs[0],
        tokensSold: Number(asset.tokenSupply),
        totalTokens: Number(asset.tokenSupply),
        originalPrice: Number(asset.price),
        salePrice: Number(asset.price),
        profit: 0,
        saleDate: Date.now(),
      })) || [];

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Assets Published</p>
                  <p className="text-2xl font-bold">{publishedCount}</p>
                  <p className="text-xs opacity-60">Listed by you</p>
                </div>
                <BarChart3 className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Assets Sold</p>
                  <p className="text-2xl font-bold">{soldCount}</p>
                  <p className="text-xs opacity-60">Fully purchased</p>
                </div>
                <Package className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col items-center mb-8">
          <div className="tabs tabs-boxed bg-base-200 shadow-md rounded-xl px-4 py-2">
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${activeTab === "overview" ? "tab-active bg-primary text-primary-content" : ""
                }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${activeTab === "purchased" ? "tab-active bg-primary text-primary-content" : ""
                }`}
              onClick={() => setActiveTab("purchased")}
            >
              Purchased
            </button>
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${activeTab === "sold" ? "tab-active bg-primary text-primary-content" : ""
                }`}
              onClick={() => setActiveTab("sold")}
            >
              Sold
            </button>
          </div>
        </div>


        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {[...(allAssets || [])]
                    .filter(asset => {
                      const isSeller = asset.seller.toLowerCase() === address?.toLowerCase();
                      const isSold = isSeller && Number(asset.tokensAvailable) === 0;
                      const isPublished = isSeller;
                      const isPurchased = ownedAssets.some(o => o.id === asset.id);
                      return isSold || isPublished || isPurchased;
                    })
                    .slice(-3)
                    .reverse()
                    .map(asset => {
                      const isSeller = asset.seller.toLowerCase() === address?.toLowerCase();
                      const isSold = isSeller && Number(asset.tokensAvailable) === 0;
                      const isPublished = isSeller;
                      const isPurchased = ownedAssets.some(o => o.id === asset.id);

                      let label = "";
                      let badge = "";
                      let amount = "";

                      if (isSold) {
                        label = `Sold ${asset.title}`;
                        badge = "badge-primary";
                        amount = "+" + formatPrice(Number(asset.price));
                      } else if (isPurchased) {
                        label = `Purchased ${asset.title}`;
                        badge = "badge-outline";
                        amount = "-" + formatPrice(Number(asset.price));
                      } else if (isPublished) {
                        label = `Published ${asset.title}`;
                        badge = "badge-neutral";
                        amount = "";
                      }

                      return (
                        <div key={asset.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm opacity-70">
                              {asset.category} • {asset.location}
                            </p>
                          </div>
                          {amount && <div className={`badge ${badge}`}>{amount}</div>}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchased Tab */}
        {activeTab === "purchased" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ownedAssets.map(asset => (
              <div key={asset.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title">{asset.title}</h2>
                  <p className="text-sm opacity-70">{asset.description}</p>
                  <div className="badge badge-outline">{asset.category}</div>
                  <p className="text-xs opacity-60 mt-2">You own {asset.tokensOwned} tokens</p>
                </div>
              </div>
            ))}
            {ownedAssets.length === 0 && (
              <div className="text-center col-span-full py-12 text-sm opacity-50">No assets purchased yet</div>
            )}
          </div>
        )}

        {/* Sold Tab */}
        {activeTab === "sold" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soldAssets.map(asset => (
              <div key={asset.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
                <figure className="relative">
                  <img
                    src={asset.image || "/placeholder.svg"}
                    alt={asset.title}
                    className="w-full h-48 object-cover opacity-80"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="badge badge-primary">Sold</div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="badge badge-outline bg-base-100/80">{asset.category}</div>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{asset.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-70">Tokens Sold:</span>
                      <span className="font-medium">
                        {asset.tokensSold}/{asset.totalTokens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Price:</span>
                      <span className="font-medium">{formatPrice(asset.salePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-70">Date:</span>
                      <span className="font-medium">{new Date(asset.saleDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {soldAssets.length === 0 && (
              <div className="text-center col-span-full py-12 text-sm opacity-50">No assets sold yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

{
  /*

          {activeTab === "purchased" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <figure className="relative">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="badge badge-outline bg-base-100/80">{asset.category}</div>
                      </div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-lg">{asset.title}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="opacity-70">Tokens Owned:</span>
                          <span className="font-medium">
                            {asset.tokensOwned}/{asset.totalTokens}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Purchase Price:</span>
                          <span className="font-medium">{formatPrice(asset.purchasePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Current Value:</span>
                          <span className="font-medium ">{formatPrice(asset.currentValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">ROI:</span>
                          <span
                            className={`font-medium ${Number.parseFloat(calculateROI(asset.currentValue, asset.purchasePrice)) >= 0 ? "" : "text-error"}`}
                          >
                            {calculateROI(asset.currentValue, asset.purchasePrice)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
*/
}
