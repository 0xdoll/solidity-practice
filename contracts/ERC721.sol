// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CopyBoredMilady is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    string public baseURI;
    uint256 public mintPrice;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Copy$BoredMilady", "C$BMIL") {
        baseURI = "ipfs://QmZ7K6hG5uiTvLVvmxZgm72Nv3kmvTq4CVAEG6JoMFvpkW/";
        mintPrice = 0.001 ether;
    }

    function takeMoney() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function _mint_once(address to) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenId.toString()); // string(abi.encodePacked(tokenId.toString(), ".json"))
    }

    function mint() public payable {
        require(msg.value >= mintPrice, "It require more money to mint, please.");
        _mint_once(msg.sender);
    }

    function multiMint(uint256 mintNum) public payable {
        require(msg.value >= mintNum * mintPrice, "It require more money to mint, please.");

        for(uint256 i=0; i < mintNum; i += 1) {
            _mint_once(msg.sender);
        }
    }

    function changeBaseURI(string memory _baseURI_) public onlyOwner {
        baseURI = _baseURI_;
    }

    function changeMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

