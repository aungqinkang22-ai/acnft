import { ethers } from "hardhat";

async function main() {
  const contractAddr = "0xd88c83F5E503e7c7c52891b488e0Bd2507e4a20f"; // 你的Sepolia合約
  const c = await ethers.getContractAt("AntiCounterfeitNFT", contractAddr);

  const [deployer] = await ethers.getSigners();
  const to = process.env.MINT_TO || deployer.address;
  const uri = process.env.METADATA_URI || "ipfs://bafkreidgoxmw6gdmsurcawiitogoah3ek5abldmx6wroev3njwe5hhkorq";

  console.log("Deployer:", deployer.address);
  console.log("Mint to :", to);
  console.log("URI     :", uri);

  const tx = await c.mint(to, uri); // onlyOwner：必須用部署者私鑰
  const receipt = await tx.wait();
  console.log("Mint tx:", receipt?.hash);

  // 假設第一顆是 tokenId 0，第二顆是 1…（你的合約是自增）
  // 這裡不從事件抓，直接示範查 0/1，視你之前是否已經鑄造過而定
  try { console.log("ownerOf(0):", await c.ownerOf(0)); } catch {}
  try { console.log("ownerOf(1):", await c.ownerOf(1)); } catch {}
}

main().catch((e) => { console.error(e); process.exit(1); });
