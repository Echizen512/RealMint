# 🟢 RWS-Forge

**RWS-Forge** is a modular Web3 marketplace for buying and selling tokenized real-world assets (RWAs). Built with Scaffold ETH 2, Circle, and Base, it delivers a premium user experience with robust smart contract logic and a visually immersive frontend powered by V0.

---

## 🧠 Definition

RWS-Forge is a decentralized application (dApp) that enables users to tokenize, publish, and trade real-world assets on-chain. It bridges the gap between physical ownership and digital liquidity by leveraging Ethereum Layer 2 scalability and stablecoin integration.

---

## 💡 Justification

The current landscape of asset exchange is fragmented, opaque, and slow. RWS-Forge addresses this by:

- Bringing RWAs on-chain with verifiable ownership and provenance  
- Enabling peer-to-peer trading with trustless settlement  
- Offering a composable architecture for future modules (governance, auctions, etc.)  
- Delivering a visually elegant and reactive UI powered by DaisyUI and V0  
- Integrating Circle (USDC) for stable, real-world value exchange  
- Running on Base for fast, low-cost transactions  

---

## 🎯 Objectives

- ✅ Build a fully on-chain marketplace for publishing and trading RWAs  
- ✅ Ensure frontend reflects live contract state—no hardcoded data  
- ✅ Deliver a premium UI with animated components and responsive layouts  
- ✅ Integrate stablecoin payments via Circle (USDC)  
- ✅ Architect the system for modular upgrades (e.g. governance, auctions)  
- ✅ Optimize developer experience with Scaffold ETH 2 and Typechain  
- ✅ Showcase composability and speed during hackathon constraints  

---

## 🧰 Tech Stack

| Layer            | Technology                          | Purpose                                  |
|------------------|--------------------------------------|------------------------------------------|
| Smart Contracts  | Solidity + Hardhat + Typechain       | Modular, extensible contract logic       |
| Frontend         | React + TypeScript + DaisyUI + V0    | Premium UI with animated components      |
| Blockchain       | Base (L2) + Ethereum                 | Scalable, secure execution environment   |
| Payments         | Circle (USDC)                        | Stablecoin integration for real value    |
| Dev Tools        | Scaffold ETH 2 + RainbowKit          | Rapid prototyping and wallet UX          |
| UI Components    | Lucide React                         | Clean, consistent iconography            |
| Auth & State     | On-chain membership + wallet connect | No localStorage, full contract sync      |

---

## 🧩 dApp Sections

### 🏠 Home — Marketplace  
The landing and marketplace view. Users can browse tokenized assets, view metadata, and initiate purchases. Built with animated DaisyUI components and reactive contract state.

### 📤 Publish — Asset Publishing  
Allows users to mint and list new RWAs. Includes form validation, media upload, and contract interaction for asset registration. Designed for speed and clarity.

### 👤 Profile — User Dashboard  
Displays recent activity, owned assets, earnings, and transaction history. Fully reactive to on-chain state. Future upgrades will include analytics, governance participation, and notifications.

---

## 📊 Business Model

![Business Model](https://i.ibb.co/VYH2cWrY/Modelo-de-Negocio.png)

---

## 🔗 URLs

| Resource         | Link (to be added)                  |
|------------------|-------------------------------------|
| Live dApp        | ``              |
| GitHub Repo      | `` |
| Devpost          | `` |
| Demo Video       | `` |
| Contract Address | `0x...`                             |
| Explorer         | `` |

> Replace these with your actual links when ready.

---

## 🚀 Installation

```bash
git clone 
cd rws-forge
pnpm install
pnpm dev
