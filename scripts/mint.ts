import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  // 從環境變數讀取
  const contractAddr = process.env.CONTRACT;
  const to = process.env.MINT_TO || deployer.address;
  const uri =
    process.env.METADATA_URI ||
    "ipfs://bafkreidgoxmw6gdmsurcawiitogoah3ek5abldmx6wroev3njwe5hhkorq";

  if (!contractAddr) {
    throw new Error("❌ Missing CONTRACT env var");
  }

  console.log("Deployer:", deployer.address);
  console.log("Contract:", contractAddr);
  console.log("Mint to :", to);
  console.log("URI     :", uri);

  const c = await ethers.getContractAt("AntiCounterfeitNFT", contractAddr);

  const tx = await c.mint(to, uri);
  const receipt = await tx.wait(); // v6: ContractTransactionReceipt | null
  if (!receipt) {
    throw new Error("❌ Transaction was dropped/replaced (receipt is null)");
  }

  console.log("✅ Mint tx:", receipt.hash); // v6 用 hash，不是 transactionHash
  console.log("ownerOf(0):", await c.ownerOf(0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
