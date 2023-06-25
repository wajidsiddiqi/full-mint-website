/**@dev This is a simple nft smart contract which uses erc-721 token and uses ipfs
 */

// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error RoboPunksNFT__Withdraw_Failed();
error RoboPunksNFT__Wrong_Mint_Value();
error RoboPunksNFT__We_Sold_Out();
error RoboPunksNFT__Public_Mint_Not_Enabled();
error RoboPunksNFT__Exceeded_Max_Wallet_Limit();

contract RoboPunksNFT is ERC721, Ownable {
    //* State Variables
    using Counters for Counters.Counter;
    Counters.Counter private s_tokenIdCounter;
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

    function publicMint(uint256 quantity) public payable {
        if (!s_publicMintState) {
            revert RoboPunksNFT__Public_Mint_Not_Enabled();
        }

        if (msg.value < PUBLIC_MINT_PRICE * quantity) {
            revert RoboPunksNFT__Wrong_Mint_Value();
        }

        if (s_totalSupply + quantity <= MAX_SUPPLY) {
            revert RoboPunksNFT__We_Sold_Out();
        }

        if (s_walletMints[msg.sender] + quantity <= MAX_WALLET_LIMIT) {
            revert RoboPunksNFT__Exceeded_Max_Wallet_Limit();
        }

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = s_tokenIdCounter.current() + 1;
            s_tokenIdCounter.increment();
            _safeMint(msg.sender, tokenId);
        }
    }

    /**@dev setting whitelists addresses*/
    function setWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_whitelists[addresses[i]] = true;
        }
    }

    function withdraw() public onlyOwner {
        uint256 ammount = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: ammount}("");
        if (!success) {
            revert RoboPunksNFT__Withdraw_Failed();
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
