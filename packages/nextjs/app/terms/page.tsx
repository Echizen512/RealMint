"use client";

import React from "react";
import {
  ScrollText,
  ShieldAlert,
  FileWarning,
  Banknote,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="hero bg-base-200 rounded-xl mb-6">
        <div className="hero-content flex-col">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <ScrollText className="w-6 h-6" />
            Terms & Conditions
          </h1>
          <p className="py-4 text-base-content">
            These terms govern the use of <span className="font-semibold">RWS-Forge</span>. As this is a hackathon prototype, terms may evolve post-submission.
          </p>
        </div>
      </div>

      {/* Terms Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-warning" />
              Prototype Disclaimer
            </h2>
            <p>RWS-Forge is built for demonstration and educational purposes only.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-error" />
              Smart Contract Risk
            </h2>
            <p>Users interact with smart contracts at their own risk. No liability is assumed for bugs or exploits.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-neutral" />
              Simulated Assets
            </h2>
            <p>Assets listed are simulated and do not represent real-world ownership or legal rights.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Banknote className="w-5 h-5 text-success" />
              No Financial Advice
            </h2>
            <p>RWS-Forge does not provide investment advice or guarantee any financial returns.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md md:col-span-2">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <Info className="w-5 h-5" />
              User Agreement
            </h2>
            <p>By using the dApp, you agree to these terms and acknowledge its experimental nature.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
