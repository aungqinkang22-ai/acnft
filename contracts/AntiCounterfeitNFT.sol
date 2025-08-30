// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// OpenZeppelin v5.x
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AntiCounterfeitNFT is ERC721URIStorage, Ownable {
    // ===== State =====
    uint256 private _nextTokenId;
    mapping(uint256 => bool) public revoked;     // 是否被撤銷
    mapping(uint256 => bool) public uriFrozen;   // 是否凍結 URI

    // ===== Events =====
    event Minted(address indexed to, uint256 indexed tokenId, string uri);
    event Revoked(uint256 indexed tokenId, address indexed by);
    event UriFrozen(uint256 indexed tokenId);
    event TokenUriUpdated(uint256 indexed tokenId, string newUri);

    // OZ v5: Ownable 需要初始 owner
    constructor() ERC721("AntiCounterfeitNFT", "ACNFT") Ownable(msg.sender) {}

    // ===== Mint =====
    function mint(address to, string memory metadataURI) external onlyOwner {
        require(bytes(metadataURI).length != 0, "Empty URI");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit Minted(to, tokenId, metadataURI);
    }

    // ===== Admin: revoke =====
    function revoke(uint256 tokenId) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "No token");
        require(!revoked[tokenId], "Already revoked");
        revoked[tokenId] = true;
        emit Revoked(tokenId, msg.sender);
    }

    // ===== Admin: freeze tokenURI (之後不可再改) =====
    function freezeTokenURI(uint256 tokenId) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "No token");
        require(!uriFrozen[tokenId], "Already frozen");
        uriFrozen[tokenId] = true;
        emit UriFrozen(tokenId);
    }

    // ===== Admin: 可控更新 URI（若尚未凍結）=====
    function ownerSetTokenURI(uint256 tokenId, string calldata newURI) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "No token");
        _setTokenURI(tokenId, newURI); // 會觸發凍結檢查
        emit TokenUriUpdated(tokenId, newURI);
    }

    // ===== Hook: 只有沒凍結時才允許改 URI =====
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal override {
        require(!uriFrozen[tokenId], "URI frozen");
        super._setTokenURI(tokenId, _tokenURI);
    }
}
