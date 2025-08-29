"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, ShoppingBag, Package, Calendar, BarChart3 } from "lucide-react"

// Mock user data
const userData = {
  totalEarnings: 125750,
  totalInvested: 89500,
  assetsOwned: 12,
  assetsSold: 8,
}

// Mock purchased assets
const purchasedAssets = [
  {
    id: 1,
    title: "Manhattan Luxury Apartment",
    tokensOwned: 250,
    totalTokens: 1000,
    purchasePrice: 212500,
    currentValue: 225000,
    purchaseDate: "2024-01-15",
    category: "Real Estate",
    image: "/luxury-apartment-manhattan-skyline.png",
  },
  {
    id: 2,
    title: "Vintage Rolex Submariner",
    tokensOwned: 45,
    totalTokens: 100,
    purchasePrice: 20250,
    currentValue: 22500,
    purchaseDate: "2024-02-03",
    category: "Collectibles",
    image: "/vintage-rolex-submariner-watch-luxury.png",
  },
  {
    id: 4,
    title: "Tesla Model S Plaid",
    tokensOwned: 80,
    totalTokens: 200,
    purchasePrice: 50000,
    currentValue: 52000,
    purchaseDate: "2024-02-20",
    category: "Vehicles",
    image: "/tesla-model-s-plaid-electric-car.png",
  },
]

// Mock sold assets
const soldAssets = [
  {
    id: 3,
    title: "Gold Bullion Bars",
    tokensSold: 25,
    totalTokens: 50,
    salePrice: 35000,
    originalPrice: 32500,
    saleDate: "2024-03-01",
    category: "Commodities",
    profit: 2500,
    image: "/gold-bullion-bars-precious-metals.png",
  },
  {
    id: 5,
    title: "Banksy Original Artwork",
    tokensSold: 100,
    totalTokens: 5000,
    salePrice: 52000,
    originalPrice: 50000,
    saleDate: "2024-02-28",
    category: "Art",
    profit: 2000,
    image: "/banksy-street-art-graffiti-original.png",
  },
]

// Mock chart data
const monthlyEarnings = [
  { month: "Jan", earnings: 15000, investments: 25000 },
  { month: "Feb", earnings: 28000, investments: 35000 },
  { month: "Mar", earnings: 45000, investments: 29500 },
  { month: "Apr", earnings: 37500, investments: 0 },
]

const categoryDistribution = [
  { category: "Real Estate", percentage: 45, value: 225000 },
  { category: "Collectibles", percentage: 25, value: 22500 },
  { category: "Vehicles", percentage: 20, value: 52000 },
  { category: "Art", percentage: 10, value: 26000 },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const calculateROI = (current: number, original: number) => {
    return (((current - original) / original) * 100).toFixed(1)
  }

  return (
    <div className="min-h-screen bg-primary">

      <div className="container mx-auto px-6 py-8">

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Total Earnings</p>
                  <p className="text-2xl font-bold ">{formatPrice(userData.totalEarnings)}</p>
                  <p className="text-xs opacity-60">+12.5% from last month</p>
                </div>
                <TrendingUp className="h-8 w-8 " />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Total Invested</p>
                  <p className="text-2xl font-bold">{formatPrice(userData.totalInvested)}</p>
                  <p className="text-xs opacity-60">Across {userData.assetsOwned} assets</p>
                </div>
                <DollarSign className="h-8 w-8 " />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Assets Owned</p>
                  <p className="text-2xl font-bold">{userData.assetsOwned}</p>
                  <p className="text-xs opacity-60">Active investments</p>
                </div>
                <ShoppingBag className="h-8 w-8 " />
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-70">Assets Sold</p>
                  <p className="text-2xl font-bold">{userData.assetsSold}</p>
                  <p className="text-xs opacity-60">Completed trades</p>
                </div>
                <Package className="h-8 w-8 " />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="space-y-6">
          <div className="tabs tabs-boxed bg-base-200">
            <button
              className={`tab ${activeTab === "overview" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`tab ${activeTab === "purchased" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("purchased")}
            >
              Purchased
            </button>
            <button className={`tab ${activeTab === "sold" ? "tab-active" : ""}`} onClick={() => setActiveTab("sold")}>
              Sold
            </button>
            <button
              className={`tab ${activeTab === "analytics" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Analytics
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      <Calendar className="w-5 h-5 " />
                      Recent Activity
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <p className="font-medium">Sold Gold Bullion Bars</p>
                          <p className="text-sm opacity-70">March 1, 2024</p>
                        </div>
                        <div className="badge badge-primary">+{formatPrice(2500)}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <p className="font-medium">Purchased Tesla Model S</p>
                          <p className="text-sm opacity-70">February 20, 2024</p>
                        </div>
                        <div className="badge badge-outline">-{formatPrice(50000)}</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div>
                          <p className="font-medium">Sold Banksy Artwork</p>
                          <p className="text-sm opacity-70">February 28, 2024</p>
                        </div>
                        <div className="badge badge-primary">+{formatPrice(2000)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portfolio Distribution */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">
                      <BarChart3 className="w-5 h-5 " />
                      Portfolio Distribution
                    </h2>
                    <div className="space-y-4">
                      {categoryDistribution.map((item, index) => (
                        <div key={item.category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{item.category}</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                          <progress
                            className="progress progress-success w-full"
                            value={item.percentage}
                            max="100"
                          ></progress>
                          <div className="text-xs opacity-70 text-right">{formatPrice(item.value)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Purchased Tab */}
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

          {/* Sold Tab */}
          {activeTab === "sold" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldAssets.map((asset) => (
                  <div key={asset.id} className="card bg-base-100 shadow-xl">
                    <figure className="relative">
                      <img
                        src={asset.image || "/placeholder.svg"}
                        alt={asset.title}
                        className="w-full h-48 object-cover opacity-75"
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
                          <span className="opacity-70">Original Price:</span>
                          <span className="font-medium">{formatPrice(asset.originalPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Sale Price:</span>
                          <span className="font-medium">{formatPrice(asset.salePrice)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Profit:</span>
                          <span className="font-medium ">+{formatPrice(asset.profit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Sale Date:</span>
                          <span className="font-medium">{new Date(asset.saleDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Performance Chart */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Monthly Performance</h2>
                    <div className="space-y-4">
                      {monthlyEarnings.map((month, index) => (
                        <div key={month.month} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{month.month}</span>
                            <div className="flex gap-4">
                              <span>Earnings: {formatPrice(month.earnings)}</span>
                              <span className="opacity-70">Invested: {formatPrice(month.investments)}</span>
                            </div>
                          </div>
                          <progress
                            className="progress progress-success w-full h-3"
                            value={month.earnings}
                            max="50000"
                          ></progress>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Performance Metrics</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="opacity-70">Total ROI</span>
                          <span className="font-bold ">+40.5%</span>
                        </div>
                        <progress className="progress progress-success w-full" value="40.5" max="100"></progress>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="opacity-70">Best Performing Asset</span>
                          <span className="font-medium">Tesla Model S</span>
                        </div>
                        <div className="text-sm ">+4.0% ROI</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="opacity-70">Average Hold Time</span>
                          <span className="font-medium">45 days</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="opacity-70">Success Rate</span>
                          <span className="font-medium ">87.5%</span>
                        </div>
                        <progress className="progress progress-success w-full" value="87.5" max="100"></progress>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
