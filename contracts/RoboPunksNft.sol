/**@dev This is a simple nft smart contract which uses erc-721 token and uses ipfs
 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunksNFT is ERC721, Ownable {
    uint256 private immutable i_mintPrice;
    uint256 private immutable i_totalSupply;
    uint256 private immutable i_maxSupply;
    uint256 private immutable i_maxWalletLimit;
    bool private nftMintState;
    string private s_baseTokenURI;
    mapping(address => uint) private s_walletMints;

    constructor(
        uint256 _mintPrice,
        uint256 _totalSupply,
        uint256 _maxSupply,
        uint256 _maxWalletLimit,
        bool _nftMintState,
        string _baseTokenURI
    ) ERC721("RoboPunks", "RP") {
        _mintPrice = i_mintPrice;
        _totalSupply = i_totalSupply;
        _maxSupply = i_maxSupply;
        _maxWalletLimit = i_maxWalletLimit;
        _nftMintState = nftMintState;
        _baseTokenURI = s_baseTokenURI;
    }
}
