"use client";

import { Coin3d } from "./Coin3d";
import { CreateParticles } from "./CreateParticles";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import GradientText from "./ui/GradientText";
import RotatingText from "./ui/RotatingText";
import { DollarSign, LineChart, PackageSearch, ShieldCheck, Store, Wallet } from "lucide-react";

const features = [
  { icon: Store, title: "Marketplace", desc: "Buy and sell tokenized real-world assets" },
  { icon: PackageSearch, title: "Asset Discovery", desc: "Explore verified listings with live contract state" },
  { icon: DollarSign, title: "USDC Payments", desc: "Secure transactions via Circle or Base" },
  { icon: ShieldCheck, title: "Escrow Logic", desc: "Optional escrow for safer trades" },
  { icon: LineChart, title: "Portfolio Analytics", desc: "Track earnings and asset performance" },
  { icon: Wallet, title: "Wallet Integration", desc: "Connect and manage your assets seamlessly" },
] as const;

export const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CreateParticles />

      {/* Overlay */}
      <div className="absolute inset-0 bg-base-100/40 z-10" />

      {/* Coins3D */}
      <Coin3d coinName="polygon" className="z-20" appearanceRight={true} />
      <div className="w-full flex justify-end">
        <Coin3d coinName="usdc" className="z-20" />
      </div>

      {/* Hero Section */}
      <section className="h-screen w-screen flex justify-center items-center flex-col">
        <div>
          <h1 className="flex flex-col gap-6">
            <span>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-6xl md:text-8xl font-bold mb-6"
              >
                The Future
              </GradientText>
            </span>

            <span>
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-6xl md:text-8xl font-bold"
              >
                of Real Assets
              </GradientText>
            </span>
          </h1>
        </div>

        <div className="pb-2">
          <RotatingText
            texts={[
              "Tokenize watches, art, and land",
              "Buy and sell with USDC on Base",
              "Escrow-secured smart contracts",
              "Track your portfolio in real time",
              "Own verified real-world assets",
              "Trade with trust and transparency",
            ]}
            mainClassName="px-2 sm:px-2 md:px-3 lg:text-4xl overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={8000}
          />
        </div>

        <div className="relative w-full flex justify-center z-20 mt-12">
          <RainbowKitCustomConnectButton />
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-mono">MARKETPLACE FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((x, index) => (
              <div
                key={index}
                className="card bg-base-200 border border-primary/30 shadow-md hover:border-primary transition-transform hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <x.icon className="size-10" />
                  <h3 className="card-title text-base-content font-mono">{x.title}</h3>
                  <p className="text-base-content/70 font-mono text-sm">{x.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-base-content font-mono">READY TO TRADE REAL ASSETS?</h2>
          <p className="text-xl text-base-content/70 mb-8 font-mono">
            Join the future of decentralized commerce with RealMint
          </p>
          <RainbowKitCustomConnectButton />
        </div>
      </section>
    </div>
  );
};
