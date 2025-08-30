"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Hammer, HeartHandshake, Home, Info, Lightbulb, Target, Upload, User } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="hero bg-base-200 rounded-xl mb-6">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
              <Info className="w-6 h-6" />
              Welcome to RWS-Forge
            </h1>
            <p className="py-4 text-base-content">
              RWS-Forge is a modular Web3 marketplace for buying and selling tokenized real-world assets (RWAs). Built
              with Scaffold ETH 2, Circle, Base, and V0, it delivers a premium user experience with robust smart
              contract logic and immersive UI.
            </p>
            <Link href="/" className="btn btn-primary mt-2">
              <Home className="w-4 h-4 mr-2" />
              Go to Marketplace
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Home className="w-5 h-5" />
              Home — Marketplace
            </h2>
            <p>Browse tokenized assets, view metadata, and initiate purchases. Fully reactive to contract state.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Publish — Asset Publishing
            </h2>
            <p>
              Mint and list new RWAs. Includes form validation, media upload, and contract interaction for asset
              registration.
            </p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile — User Dashboard
            </h2>
            <p>
              View recent activity, owned assets, earnings, and transaction history. Future upgrades will include
              analytics and governance.
            </p>
          </div>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center gap-2">
          <Info className="w-5 h-5" />
          Definition
        </div>
        <div className="collapse-content">
          <p>
            RWS-Forge is a dApp that enables users to tokenize, publish, and trade real-world assets on-chain. It
            bridges physical ownership and digital liquidity using Ethereum L2 scalability and stablecoin integration.
          </p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Justification
        </div>
        <div className="collapse-content">
          <ul className="list-disc list-inside">
            <li>Verifiable ownership and provenance</li>
            <li>Trustless peer-to-peer trading</li>
            <li>Composable architecture for future modules</li>
            <li>Premium UI powered by DaisyUI and V0</li>
            <li>Stablecoin payments via Circle (USDC)</li>
            <li>Fast, low-cost transactions on Base</li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center gap-2">
          <Target className="w-5 h-5" />
          Objectives
        </div>
        <div className="collapse-content">
          <ul className="list-disc list-inside">
            <li>Fully on-chain marketplace for RWAs</li>
            <li>Frontend synced with contract state</li>
            <li>Premium UI with animated components</li>
            <li>Stablecoin integration via Circle</li>
            <li>Modular architecture for future upgrades</li>
            <li>Optimized DX with Scaffold ETH 2</li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center gap-2">
          <Hammer className="w-5 h-5" />
          Tech Stack
        </div>
        <div className="collapse-content">
          <ul className="list-disc list-inside">
            <li>Solidity + Hardhat + Typechain</li>
            <li>React + TypeScript + DaisyUI + V0</li>
            <li>Base (L2) + Ethereum</li>
            <li>Circle (USDC)</li>
            <li>Scaffold ETH 2 + RainbowKit</li>
            <li>Lucide React for iconography</li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 shadow-sm mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          External Links
        </div>
        <div className="collapse-content">
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Live dApp:</span> <code></code>
            </li>
            <li>
              <span className="font-semibold">GitHub Repo:</span> <code>https://github.c</code>
            </li>
            <li>
              <span className="font-semibold">Devpost:</span> <code></code>
            </li>
            <li>
              <span className="font-semibold">Demo Video:</span> <code></code>
            </li>
            <li>
              <span className="font-semibold">Contract Address:</span> <code>0x...</code>
            </li>
            <li>
              <span className="font-semibold">Explorer:</span> <code></code>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-base-content opacity-70 flex items-center justify-center gap-2">
        <HeartHandshake className="w-4 h-4" />
        Built with ❤️ by Echizen512 & NightmareFox12
      </div>
    </div>
  );
}
