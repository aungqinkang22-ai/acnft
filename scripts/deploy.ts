import { ethers, artifacts } from "hardhat";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const C = await ethers.getContractFactory("AntiCounterfeitNFT");
  const c = await C.deploy();
  await c.waitForDeployment();

  const address = await c.getAddress();
  console.log("AntiCounterfeitNFT:", address);

  // 輸出到 deployments/<network>/
  const network = (await ethers.provider.getNetwork()).name || "local";
  const outDir = join(__dirname, "..", "deployments", network);
  mkdirSync(outDir, { recursive: true });

  writeFileSync(join(outDir, "address.json"), JSON.stringify({ address }, null, 2));
  const artifact = await artifacts.readArtifact("AntiCounterfeitNFT");
  writeFileSync(join(outDir, "AntiCounterfeitNFT.abi.json"), JSON.stringify(artifact.abi, null, 2));

  console.log("Saved:", outDir);
}

main().catch((e) => { console.error(e); process.exit(1); });
