# 🛡️ AntiCounterfeitNFT (ACNFT)

A minimal Web3 project that demonstrates how NFTs can be used for **anti-counterfeit verification**.  
Built with **Hardhat**, **Solidity**, and **TypeScript**.

---

## ✨ Features
- **Mint** → Owner can issue NFTs as certificates of authenticity.  
- **Revoke** → Owner can revoke an NFT (mark as counterfeit).  
- **Pause/Unpause** → System can be paused to stop minting when necessary.  
- **ERC721URIStorage** → Each NFT carries a metadata URI (e.g., IPFS link).  

---

## 📂 Project Structure
acnft/
├── contracts/ # Solidity smart contracts
│ └── AntiCounterfeitNFT.sol
├── scripts/ # Demo scripts
│ └── demo.ts
├── test/ # Unit tests
│ └── AntiCounterfeitNFT.test.ts
├── images/ # Project screenshots
│ ├── test-result.png
│ └── demo-output.png
├── hardhat.config.ts # Hardhat config
└── README.md # Project documentation

yaml
Copy code

---

## ⚡ Getting Started

### 1. Install dependencies
```bash
npm install
2. Compile contracts
bash
Copy code
npx hardhat compile
3. Run tests
bash
Copy code
npx hardhat test
4. Run demo script
bash
Copy code
npx hardhat run scripts/demo.ts
✅ Expected output:

yaml
Copy code
Owner: 0x...
Alice: 0x...
Deployed AntiCounterfeitNFT at: 0x...
Minted tokenId 0 to: 0xAlice...
ownerOf(0): 0xAlice...
isRevoked(0): false
Revoked tokenId 0
isRevoked(0): true
🧪 Example Test
The project includes a unit test to verify:

Minting assigns the correct owner.

Revoking marks the token as revoked.

Run only this test:

bash
Copy code
npx hardhat test test/AntiCounterfeitNFT.test.ts
📸 Demo Screenshots
Hardhat test result

Demo script output

🌐 Next Steps
Upload NFT metadata to IPFS.

Deploy the contract to a testnet (e.g., Sepolia).

Build a simple frontend verifier (scan QR → show ownerOf, tokenURI, isRevoked).

📜 License
MIT