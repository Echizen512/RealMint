"use client";

import { useState } from "react";
import { BarChart3, Calendar, HandCoins, Package } from "lucide-react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";

export default function ProfilePage() {
  const { address } = useAccount();

  //states
  const [activeTab, setActiveTab] = useState("published");

  // const formatPrice = (price: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "USD",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(price);
  // };

  //smart contract
  const { data: allAssets } = useScaffoldReadContract({
    contractName: "RwaForge",
    functionName: "getAllAssets",
  });

  const { data: allAssetsPurchased } = useScaffoldReadContract({
    contractName: "RwaForge",
    functionName: "getAllAssetsPurchased",
    args: [address],
  });

  const { data: allPublishedAssets } = useScaffoldReadContract({
    contractName: "RwaForge",
    functionName: "getAllPublishedAssets",
    args: [address],
  });

  const soldCount =
    allAssets?.filter(
      asset => asset.seller.toLowerCase() === address?.toLowerCase() && Number(asset.tokensAvailable) === 0,
    ).length || 0;

  return (
    <div className="min-h-screen bg-primary">
      <div className=" mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Assets Published</p>
                  {allPublishedAssets === undefined ? (
                    <div className="h-8 w-20 skeleton" />
                  ) : (
                    <p className="text-2xl font-bold">
                      {allPublishedAssets[0]?.seller.includes("0x000000000000000000000")
                        ? 0
                        : allPublishedAssets.length}
                    </p>
                  )}

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

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Total assets purchased</p>
                  {allAssetsPurchased === undefined ? (
                    <div className="skeleton h-8 w-12" />
                  ) : (
                    <p className="text-2xl font-bold">{allAssetsPurchased.length}</p>
                  )}

                  {/* <p className="text-xs opacity-60">Fully purchased</p> */}
                </div>
                <HandCoins className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col items-center mb-8">
          <div className="tabs tabs-boxed bg-base-200 shadow-md rounded-xl px-4 py-2">
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${
                activeTab === "published" ? "tab-active bg-primary text-primary-content" : ""
              }`}
              onClick={() => setActiveTab("published")}
            >
              Published
            </button>
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${
                activeTab === "purchased" ? "tab-active bg-primary text-primary-content" : ""
              }`}
              onClick={() => setActiveTab("purchased")}
            >
              Purchased
            </button>
            <button
              className={`tab text-sm font-medium px-6 py-2 transition-all duration-200 ${
                activeTab === "sold" ? "tab-active bg-primary text-primary-content" : ""
              }`}
              onClick={() => setActiveTab("sold")}
            >
              Sold
            </button>
          </div>
        </div>

        {/* Published tab  */}
        {activeTab === "published" && (
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <Calendar className="w-5 h-5" />
                  Published
                </h2>

                <div className="space-y-4">
                  {allPublishedAssets === undefined ? (
                    <div className="w-full h-20 skeleton" />
                  ) : allPublishedAssets[0]?.seller.includes("0x000000000000000000000") ? (
                    <p className="text-center font-semibold text-neutral/80">You have no published products.</p>
                  ) : (
                    allPublishedAssets.map(x => (
                      <div key={x.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <p className="font-medium">{x.title}</p>
                          <p className="text-sm opacity-70">
                            {x.category} • {x.location}
                          </p>
                        </div>
                        {x.price && <div className={`badge ${x.price}`}>{x.price.toString()}</div>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purchased Tab */}
        {activeTab === "purchased" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAssetsPurchased === undefined ? (
              [1, 2, 3, 4].map(x => <div key={x} className="h-20 w-full skeleton bg-secondary" />)
            ) : allAssetsPurchased.length === 0 ? (
              <div className="text-center col-span-full py-12 text-sm opacity-50">No assets purchased yet</div>
            ) : (
              allAssetsPurchased.map(x => (
                <div key={x.purchaseID} className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h2 className="card-title">{x.title}</h2>
                    <p className="text-sm opacity-70">{x.description}</p>
                    <div className="badge badge-outline">{x.category}</div>
                    <p className="text-xs opacity-60 mt-2">You own {x.amount} tokens</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Sold Tab */}
        {activeTab === "sold" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPublishedAssets === undefined ? (
              <div className="w-full h-full skeleton" />
            ) : allPublishedAssets[0]?.seller.includes("0x0000000") ? (
              <div className="text-center col-span-full py-12 text-sm opacity-50">No assets sold yet</div>
            ) : (
              allPublishedAssets.map(x => (
                <div key={x.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300">
                  <figure className="relative">
                    <img
                      src={x.imageURIs[0] || "/placeholder.svg"}
                      alt={x.title}
                      className="w-full h-48 object-cover opacity-80"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="badge badge-primary">Sold</div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="badge badge-outline bg-base-100/80">{x.category}</div>
                    </div>
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-lg">{x.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-70">Tokens Sold:</span>
                        <span className="font-medium">{x.tokenSupply - x.tokensAvailable}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Price:</span>
                        <span className="font-medium">{formatEther(x.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-70">Date:</span>
                        <span className="font-medium">{new Date(Number(x.date * 1000n)).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
