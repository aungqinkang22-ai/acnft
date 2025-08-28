```markdown
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
```

acnft/
├── contracts/              # Solidity smart contracts
│   └── AntiCounterfeitNFT.sol
├── scripts/                # Demo scripts
│   └── demo.ts
├── test/                   # Unit tests
│   └── AntiCounterfeitNFT.test.ts
├── hardhat.config.ts       # Hardhat config
└── README.md               # Project documentation

````

---

## ⚡ Getting Started

### 1. Install dependencies
```bash
npm install
````

### 2. Compile contracts

```bash
npx hardhat compile
```

### 3. Run tests

```bash
npx hardhat test
```

### 4. Run demo script

```bash
npx hardhat run scripts/demo.ts
```

✅ Expected output:

```
Owner: 0x...
Alice: 0x...
Deployed AntiCounterfeitNFT at: 0x...
Minted tokenId 0 to: 0xAlice...
ownerOf(0): 0xAlice...
isRevoked(0): false
Revoked tokenId 0
isRevoked(0): true
```

---

## 🧪 Example Test

The project includes a unit test to verify:

* Minting assigns the correct owner.
* Revoking marks the token as revoked.

Run only this test:

```bash
npx hardhat test test/AntiCounterfeitNFT.test.ts
```

---

## 🌐 Next Steps

* Upload NFT metadata to **IPFS**.
* Deploy the contract to a testnet (e.g., Sepolia).
* Build a simple **frontend verifier** (scan QR → show `ownerOf`, `tokenURI`, `isRevoked`).

---

## 📜 License

MIT

```

---

📌 建議：你可以再加幾張 **截圖**（例如你跑 `npx hardhat test` 或 `npx hardhat run scripts/demo.ts` 的輸出），在 README 裡加一個「Demo Screenshots」區塊，會讓作品更有說服力。  

要不要我幫你在這份 README 裡預留「Screenshots 區塊」，你只要把圖片放到 repo 裡就能顯示？
```
