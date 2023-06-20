/**@dev This is a simple nft smart contract which uses erc-721 token and uses ipfs
 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 internal immutable i_mintPrice;
    uint256 private s_totalSupply;
    uint256 private s_maxSupply;
    uint256 private immutable i_maxWalletLimit;
    bool private s_nftMintState;
    string[] internal s_baseTokenURI;
    mapping(address => uint256) private s_walletMints;

    constructor(
        uint256 _mintPrice,
        uint256 _totalSupply,
        uint256 _maxSupply,
        uint256 _maxWalletLimit,
        bool _nftMintState,
        string[] memory _baseTokenURI
    ) ERC721("RoboPunks", "RP") {
        i_mintPrice = _mintPrice;
        s_totalSupply = _totalSupply;
        s_maxSupply = _maxSupply;
        i_maxWalletLimit = _maxWalletLimit;
        s_nftMintState = _nftMintState;
        s_baseTokenURI = _baseTokenURI;
    }

    function changeNftMintState(bool state) private onlyOwner {
        s_nftMintState = state;
    }

    //*Getter Functions
    function getMintPrice() public view returns (uint256) {
        return i_mintPrice;
    }

    function getTotalSupply() public view returns (uint256) {
        return s_totalSupply;
    }

    function getMaxSupply() public view returns (uint256) {
        return s_maxSupply;
    }

    function getWalletLimit() public view returns (uint256) {
        return i_maxWalletLimit;
    }

    function getNftState() public view returns (bool) {
        return s_nftMintState;
    }

    function getNftState(address) public view returns (uint256) {
        return s_walletMints[address];
    }
}
