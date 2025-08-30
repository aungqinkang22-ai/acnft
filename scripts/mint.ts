import { ethers } from "hardhat";

function getArg(name: string, fallback?: string) {
  const idx = process.argv.findIndex(a => a === `--${name}`);
  if (idx !== -1) return process.argv[idx + 1];
  return process.env[name.toUpperCase()] || fallback;
}

async function main() {
  const contractAddr = getArg("contract", process.env.CONTRACT);
  const to = getArg("to", process.env.MINT_TO);
  const uri = getArg("uri", process.env.METADATA_URI);

  if (!contractAddr || !to || !uri) {
    console.error("❌ Missing params");
    console.error("Usage:");
    console.error("  npx hardhat run scripts/mint.ts --network <net> --contract <addr> --to <address> --uri ipfs://<cid>");
    console.error("Or set CONTRACT, MINT_TO, METADATA_URI as env vars.");
    process.exit(1);
  }

  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Contract:", contractAddr);
  console.log("Mint to :", to);
  console.log("URI     :", uri);

  const c = await ethers.getContractAt("AntiCounterfeitNFT", contractAddr);
  const tx = await c.mint(to, uri);
  const receipt = await tx.wait();
  console.log("✅ Mint tx:", receipt?.hash);

  try { console.log("ownerOf(0):", await c.ownerOf(0n)); } catch {}
  try { console.log("ownerOf(1):", await c.ownerOf(1n)); } catch {}
}

main().catch((e) => { console.error(e); process.exit(1); });
