import { expect } from "chai";
import { ethers } from "hardhat";
import { RwaForge } from "../typechain-types";
import { parseEther } from "ethers";

describe("RwaForge", () => {
  //smart contract
  let rwaForge: RwaForge;
  before(async () => {
    // const [owner] = await ethers.getSigners();
    // owner.address
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
    it("create a asset", async () => {
      await rwaForge.publishAsset(
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
  });
});
