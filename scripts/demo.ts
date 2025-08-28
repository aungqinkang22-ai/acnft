import { ethers } from "hardhat";

async function main() {
  const [owner, alice] = await ethers.getSigners();
  console.log("Owner:", owner.address);
  console.log("Alice:", alice.address);

  const Factory = await ethers.getContractFactory("AntiCounterfeitNFT");
  const c = await Factory.deploy();
  await c.waitForDeployment();
  console.log("Deployed AntiCounterfeitNFT at:", await c.getAddress());

  // Mint 一顆 NFT 給 Alice
  await (await c.mint(alice.address, "ipfs://demo-metadata")).wait();
  console.log("Minted tokenId 0 to:", alice.address);

  console.log("ownerOf(0):", await c.ownerOf(0));
  console.log("isRevoked(0):", await c.isRevoked(0));

  // Revoke tokenId 0
  await (await c.revoke(0)).wait();
  console.log("Revoked tokenId 0");
  console.log("isRevoked(0):", await c.isRevoked(0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
