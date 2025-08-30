import { ethers } from "hardhat";
import {
  AntiCounterfeitNFT,
  AntiCounterfeitNFT__factory,
} from "../typechain-types";

async function main() {
  const [owner, alice] = await ethers.getSigners();
  console.log("Owner:", owner.address);
  console.log("Alice:", alice.address);

  // 型別化的工廠（關鍵）
  const Factory = (await ethers.getContractFactory(
    "AntiCounterfeitNFT"
  )) as AntiCounterfeitNFT__factory;

  const c: AntiCounterfeitNFT = await Factory.deploy();
  await c.waitForDeployment();

  console.log("Deployed AntiCounterfeitNFT at:", await c.getAddress());

  // --- Mint 一顆給 Alice ---
  await (await c.mint(alice.address, "ipfs://demo-metadata")).wait();
  console.log("Minted tokenId 0 to:", alice.address);

  console.log("ownerOf(0):", await c.ownerOf(0n));
  console.log("revoked(0):", await c.revoked(0n)); // <= 這裡用 revoked，而不是 isRevoked

  // --- Revoke tokenId 0 ---
  await (await c.revoke(0n)).wait();
  console.log("Revoked tokenId 0");
  console.log("revoked(0):", await c.revoked(0n)); // 再查一次
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
