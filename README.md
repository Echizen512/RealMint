# 🟢 RWS-Forge

<p align="center">
  <img width="400" height="400" alt="favicon" src="https://github.com/user-attachments/assets/5458ae68-fc75-471c-b924-468699b95e07" />
</p>

**RWS-Forge** is a modular Web3 marketplace for buying and selling tokenized real-world assets (RWAs). Built with Scaffold ETH 2 and Base, it delivers a premium user experience with robust smart contract logic and a visually immersive frontend powered by V0.

---

## 🧠 Definition

RWS-Forge is a decentralized application (dApp) that enables users to tokenize, publish, and trade real-world assets on-chain. It bridges the gap between physical ownership and digital liquidity by leveraging Ethereum Layer 2 scalability.

---

## 💡 Justification

The current landscape of asset exchange is fragmented, opaque, and slow. RWS-Forge addresses this by:

- Bringing RWAs on-chain with verifiable ownership and provenance  
- Enabling peer-to-peer trading with trustless settlement  
- Offering a composable architecture for future modules (governance, auctions, etc.)  
- Delivering a visually elegant and reactive UI powered by DaisyUI and V0  
- Running on Base for fast, low-cost transactions  

---

## 🎯 Objectives

- ✅ Build a fully on-chain marketplace for publishing and trading RWAs  
- ✅ Ensure frontend reflects live contract state—no hardcoded data  
- ✅ Deliver a premium UI with animated components and responsive layouts  
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

## 🧪 Testing

RWS-Forge includes smart contract testing using **Hardhat** and **Chai**, ensuring reliability and correctness across core functionalities.

- The test suite is located at [`RwaForge.ts`](https://github.com/Echizen512/rws-forge/blob/master/packages/hardhat/test/RwaForge.ts)
- To run the tests, simply execute:

![Testing](https://i.ibb.co/VpTJDzrJ/Testing.png)

---

## 🔗 URLs

| Resource         | Link (to be added)                  |
|------------------|-------------------------------------|
| Live dApp        | `https://rws-forge.vercel.app` |
| GitHub Repo      | `https://github.com/Echizen512/rws-forge` |
| Demo Video       |`https://www.youtube.com/watch?v=00AnODhJCPk&feature=youtu.be` |
| Contract Address | `0x9027237B996ee70B77b058A5c0Ca640Fc62BAf5d` |
| Block Explorer   | `https://sepolia.basescan.org/address/0x9027237b996ee70b77b058a5c0ca640fc62baf5d` |
| Testing Script   | `https://github.com/Echizen512/rws-forge/blob/master/packages/hardhat/test/RwaForge.ts` |
---

## 🚀 Installation

```bash
git clone [repo-url]
cd rws-forge
yarn install
yarn start
