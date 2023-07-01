// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/**@author Wajid*/
/**@title Simple nft smart contract which uses erc-721 token and uses ipfs*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract RoboPunksNFT is ERC721, Ownable {
    using Strings for uint256;
    //* State Variables
    uint256 private constant PUBLIC_MINT_PRICE = 0.08 ether;
    uint256 private constant WHITELIST_MINT_PRICE = 0.04 ether;
    uint256 private s_totalSupply = 0;
    uint256 private constant MAX_SUPPLY = 8;
    uint256 private constant MAX_WALLET_LIMIT = 2;
    bool private s_publicMintState = false;
    bool private s_whitelistMintState = false;
    bool private s_reveal = false;
    string private constant BASE_TOKEN_URI =
        "ipfs://bafybeidlnjv7bbart3azzizjh76ywpvtns67nz3c2pdu5xvytdrtwbeopu/";

    //*Mappings
    /**@dev Saving mapping of how much each wallet has minted*/
    mapping(address => uint256) private s_walletMints;
    /**@dev Saving mapping of whitelists addresses*/
    mapping(address => bool) private s_whitelists;

    //*Functions
    constructor() ERC721("RoboPunks", "RP") {}

    /**@dev This function changes the state of nft*/
    function changeNftMintState(
        bool publicState,
        bool whitelistState
    ) external onlyOwner {
        s_publicMintState = publicState;
        s_whitelistMintState = whitelistState;
    }

    /**@dev This function sets the reveal state of nft*/
    function isRevealed(bool reveal) external onlyOwner {
        s_reveal = reveal;
    }

    /**@dev This is a public mint function that checks public requirements*/
    function publicMint(uint256 quantity) public payable {
        require(s_publicMintState, "mint not enabled");
        require(msg.value == PUBLIC_MINT_PRICE * quantity, "wrong mint value");
        internalMint(quantity);
    }

    /**@dev This is a whitelist mint function that checks WL requirements*/
    function whitelistMint(uint256 quantity) public payable {
        require(s_whitelistMintState, "mint not enabled");
        require(s_whitelists[msg.sender], "not whitelisted");
        require(
            msg.value == WHITELIST_MINT_PRICE * quantity,
            "wrong mint value"
        );
        internalMint(quantity);
    }

    /**@dev This is a mint function and module that mint functions uses*/
    function internalMint(uint256 quantity) internal {
        require(s_totalSupply <= MAX_SUPPLY, "we sold out");
        require(s_totalSupply + quantity <= MAX_SUPPLY, "exceeding max supply");
        require(
            s_walletMints[msg.sender] + quantity <= MAX_WALLET_LIMIT,
            "exceeded max wallet limit"
        );

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = s_totalSupply + 1;
            s_totalSupply++;
            s_walletMints[msg.sender]++;
            _safeMint(msg.sender, tokenId);
        }
    }

    /**@dev This is a tokenURI generator function*/
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = BASE_TOKEN_URI;

        /**@dev This if checks whether reveal is on or off*/
        if (!s_reveal) {
            return
                bytes(baseURI).length > 0
                    ? string(abi.encodePacked(baseURI))
                    : "";
        } else {
            return
                bytes(baseURI).length > 0
                    ? string(
                        abi.encodePacked(baseURI, tokenId.toString(), ".json")
                    )
                    : "";
        }
    }

    /**@dev setting whitelists addresses*/
    function setWhitelist(address[] calldata addresses) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_whitelists[addresses[i]] = true;
        }
    }

    /**@dev This is a withdraw function*/
    function withdraw() external onlyOwner {
        uint256 ammount = address(this).balance;
        payable(msg.sender).transfer(ammount);
    }

    //*Getter Functions
    function getPublicMintPrice() public pure returns (uint256) {
        return PUBLIC_MINT_PRICE;
    }

    function getBaseTokenURI() public pure returns (string memory) {
        return BASE_TOKEN_URI;
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

    function getRevealState() public view returns (bool) {
        return s_reveal;
    }

    function getWhitelistNftState() public view returns (bool) {
        return s_whitelistMintState;
    }

    function getYourWalletMints(
        address walletAddress
    ) public view returns (uint256) {
        return s_walletMints[walletAddress];
    }

    function checkWhitelist(
        address whitelistAddress
    ) public view returns (bool) {
        return s_whitelists[whitelistAddress];
    }
}
