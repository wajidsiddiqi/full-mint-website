/**@dev This is a simple nft smart contract which uses erc-721 token and uses ipfs
 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error RoboPunksNFT__WithdrawFailed();

contract RoboPunksNFT is ERC721, Ownable {
    uint256 private constant PUBLIC_MINT_PRICE = 0.08 ether;
    uint256 private constant WHITELIST_MINT_PRICE = 0.04 ether;
    uint256 private s_totalSupply = 0;
    uint256 private constant MAX_SUPPLY = 8;
    uint256 private constant MAX_WALLET_LIMIT = 2;
    bool private s_publicMintState = false;
    bool private s_whitelistMintState = false;
    string[] private s_baseTokenURI;
    mapping(address => uint256) private s_walletMints;

    /**@dev Saving mapping of whitelists addresses*/
    mapping(address => bool) private s_whitelists;

    constructor() ERC721("RoboPunks", "RP") {}

    function changeNftMintState(
        bool publicState,
        bool whitelistState
    ) external onlyOwner {
        s_publicMintState = publicState;
        s_whitelistMintState = whitelistState;
    }

    /**@dev setting whitelists addresses*/
    function setWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint i = 0; i < addresses.length; i++) {
            s_whitelists[addresses[i]] = true;
        }
    }

    function withdraw() public onlyOwner {
        uint256 ammount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: ammount}("");
        if (!success) {
            revert RoboPunksNFT__WithdrawFailed();
        }
    }

    //*Getter Functions
    function getPublicMintPrice() public pure returns (uint256) {
        return PUBLIC_MINT_PRICE;
    }

    function getWhitelistMintPrice() public pure returns (uint256) {
        return WHITELIST_MINT_PRICE;
    }

    function getTotalSupply() public view returns (uint256) {
        return s_totalSupply;
    }

    function getMaxSupply() public pure returns (uint256) {
        return MAX_SUPPLY;
    }

    function getWalletLimit() public pure returns (uint256) {
        return MAX_WALLET_LIMIT;
    }

    function getPublicNftState() public view returns (bool) {
        return s_publicMintState;
    }

    function getWhitelistNftState() public view returns (bool) {
        return s_whitelistMintState;
    }

    function getWalletMintsLimit(
        address walletAddress
    ) public view returns (uint256) {
        return s_walletMints[walletAddress];
    }

    function getWhitelists(
        address whitelistAddress
    ) public view returns (bool) {
        return s_whitelists[whitelistAddress];
    }
}
