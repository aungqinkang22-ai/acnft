import { ethers } from "hardhat";

async function main() {
  const contractAddr = "0xd88c83F5E503e7c7c52891b488e0Bd2507e4a20f"; // 你的合約地址
  const c = await ethers.getContractAt("AntiCounterfeitNFT", contractAddr);

  // 測試網通常只有一個 signer（你的 PRIVATE_KEY）
  const [deployer] = await ethers.getSigners();
  const to = process.env.MINT_TO || deployer.address; // 可用 .env 指定接收者，沒填就自己
  const uri = process.env.METADATA_URI || "ipfs://demo-metadata";

  console.log("Deployer:", deployer.address);
  console.log("Mint to:", to);
  console.log("URI:", uri);

  const tx = await c.mint(to, uri); // onlyOwner，可由 deployer 呼叫
  await tx.wait();

  console.log("✅ Minted tokenId 0 to:", to);
  console.log("ownerOf(0):", await c.ownerOf(0));
  console.log("isRevoked(0):", await c.isRevoked(0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
