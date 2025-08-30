"use client";

import React from "react";
import { Database, EyeOff, LockKeyhole, ShieldCheck, Wallet } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="hero bg-base-200 rounded-xl mb-6">
        <div className="hero-content flex-col">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <LockKeyhole className="w-6 h-6" />
            Privacy Policy
          </h1>
          <p className="py-4 text-base-content">
            This privacy policy outlines how <span className="font-semibold">RWS-Forge</span> handles user data during
            the hackathon phase.
          </p>
        </div>
      </div>

      {/* Privacy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Database className="w-5 h-5 text-neutral" />
              No Off-Chain Storage
            </h2>
            <p>RWS-Forge does not collect or store personal data off-chain. All logic is handled on-chain.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" />
              Blockchain-Based Interactions
            </h2>
            <p>All user actions occur via public blockchain transactions, ensuring transparency and verifiability.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Wallet className="w-5 h-5 " />
              Wallet-Only Identity
            </h2>
            <p>
              Wallet addresses are used solely for contract execution and UI personalization. No additional identity
              data is stored.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-warning" />
              No Tracking or Analytics
            </h2>
            <p>
              This prototype does not embed cookies, trackers, or analytics tools. User privacy is preserved by design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
