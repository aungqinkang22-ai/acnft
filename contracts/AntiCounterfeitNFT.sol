// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract AntiCounterfeitNFT is ERC721URIStorage, Ownable, Pausable {
    uint256 public nextTokenId;
    mapping(uint256 => bool) private _revoked;

    event Revoked(uint256 indexed tokenId, bool revoked);

    constructor() ERC721("AntiCounterfeitNFT", "ACNFT") Ownable(msg.sender) {}

    function mint(address to, string memory metadataURI)
        external
        onlyOwner
        whenNotPaused
    {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }

    function revoke(uint256 tokenId) external onlyOwner {
        _requireOwned(tokenId); // ✅ 用這個取代 _exists
        _revoked[tokenId] = true;
        emit Revoked(tokenId, true);
    }

    function isRevoked(uint256 tokenId) external view returns (bool) {
        return _revoked[tokenId];
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }
}
