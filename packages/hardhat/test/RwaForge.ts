import { expect } from "chai";
import { ethers } from "hardhat";
import { RwaForge } from "../typechain-types";
import { ContractTransactionResponse, parseEther } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("RwaForge", () => {
  let rwaForge: RwaForge;
  let publishTx: ContractTransactionResponse;
  let owner: HardhatEthersSigner;

  before(async () => {
    [owner] = await ethers.getSigners();
    const yourRwaForgeFactory = await ethers.getContractFactory("RwaForge");
    rwaForge = (await yourRwaForgeFactory.deploy()) as RwaForge;
    await rwaForge.waitForDeployment();
  });

  describe("Deployment", () => {
    it("Verify if the contract starts empty 🫙", async () => {
      expect(await rwaForge.nextAssetId()).to.equal(0n);
    });
  });

  describe("Publish an asset 📣", () => {
    it("should create an asset", async () => {
      publishTx = await rwaForge.publishAsset(
        "Table",
        "A table made of thick brown wood",
        "category",
        "zulia",
        ["imagen numero 1"],
        parseEther("0.002"),
        2n,
      );

      expect(await rwaForge.nextAssetId()).to.equal(1n);
    });

    it("should emit AssetPublished event with correct args", async () => {
      await expect(publishTx).to.emit(rwaForge, "AssetPublished").withArgs(0n, owner.address);
    });
  });
});
