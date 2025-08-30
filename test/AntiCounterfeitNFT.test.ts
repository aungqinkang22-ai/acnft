import { expect } from "chai";
import { ethers } from "hardhat";
import {
  AntiCounterfeitNFT,
  AntiCounterfeitNFT__factory,
} from "../typechain-types";


describe("AntiCounterfeitNFT", function () {
 async function deploy() {
  const [owner, user] = await ethers.getSigners();

  // 型別化工廠
  const Factory = (await ethers.getContractFactory(
    "AntiCounterfeitNFT"
  )) as AntiCounterfeitNFT__factory;

  const c: AntiCounterfeitNFT = await Factory.deploy();
  await c.waitForDeployment();

  return { c, owner, user };
}


  it("mint → ownerOf → revoke", async () => {
    const { c, owner } = await deploy();

    const uri = "ipfs://bafy-demo-json";
    await (await c.mint(owner.address, uri)).wait();

    // 第一顆 tokenId 應該是 0
    expect(await c.ownerOf(0n)).to.equal(owner.address);
    expect(await c.tokenURI(0n)).to.equal(uri);

    // revoke 前應為 false
    expect(await c.revoked(0n)).to.equal(false);
    await (await c.revoke(0n)).wait();
    expect(await c.revoked(0n)).to.equal(true);

    // 不能重複 revoke
    await expect(c.revoke(0n)).to.be.revertedWith("Already revoked");
  });

  it("freezeTokenURI prevents further updates", async () => {
    const { c, owner } = await deploy();

    await (await c.mint(owner.address, "ipfs://old")).wait();
    // 未凍結前可改
    await (await c.ownerSetTokenURI(0n, "ipfs://new1")).wait();
    expect(await c.tokenURI(0n)).to.equal("ipfs://new1");

    // 凍結
    await (await c.freezeTokenURI(0n)).wait();
    expect(await c.uriFrozen(0n)).to.equal(true);

    // 凍結後禁止更改
    await expect(c.ownerSetTokenURI(0n, "ipfs://new2")).to.be.revertedWith("URI frozen");
    expect(await c.tokenURI(0n)).to.equal("ipfs://new1");
  });
});
