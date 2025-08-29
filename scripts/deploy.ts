import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("AntiCounterfeitNFT");
  const c = await Factory.deploy();
  await c.waitForDeployment();
  console.log("✅ AntiCounterfeitNFT deployed to:", await c.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
