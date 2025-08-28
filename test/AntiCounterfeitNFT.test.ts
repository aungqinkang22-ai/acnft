import { expect } from "chai";
import { ethers } from "hardhat";

describe("AntiCounterfeitNFT", () => {
  it("mint → ownerOf → revoke", async () => {
    const [owner, alice] = await ethers.getSigners();

    const Factory = await ethers.getContractFactory("AntiCounterfeitNFT");
    const c = await Factory.deploy();
    await c.waitForDeployment();

    // mint 一顆給 alice
    const tx = await c.mint(alice.address, "ipfs://demo-metadata");
    await tx.wait();

    // tokenId 會從 0 開始
    expect(await c.ownerOf(0)).to.equal(alice.address);
    expect(await c.isRevoked(0)).to.equal(false);

    // 撤銷
    const tx2 = await c.revoke(0);
    await tx2.wait();
    expect(await c.isRevoked(0)).to.equal(true);
  });
});
