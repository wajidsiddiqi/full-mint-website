const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../../helper-hardhat-config");
const { assert, expect } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("RoboPunks Nft Unit Tests", function () {
      let roboPunksNft, deployer;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["roboPunksNft"]);
        const roboPunks = await deployments.get("RoboPunksNFT");
        roboPunksNft = await ethers.getContractAt(
          "RoboPunksNFT",
          roboPunks.address
        );
      });

      describe("Constructor", () => {
        it("Initializes the NFT Correctly.", async () => {
          const name = await roboPunksNft.name();
          const symbol = await roboPunksNft.symbol();
          const nftState = await roboPunksNft.getNftState();
          const mintFee = await roboPunksNft.getMintPrice();
          const totalSupply = await roboPunksNft.getTotalSupply();
          const maxSupply = await roboPunksNft.getMaxSupply();
          const walletLimit = await roboPunksNft.getWalletLimit();

          assert.equal(name, "RoboPunks");
          assert.equal(symbol, "RP");
          assert.equal(nftState, false);
          assert.equal(mintFee.toString(), ethers.utils.parseEther("0.4"));
          assert.equal(totalSupply, 0);
          assert.equal(maxSupply, 8);
          assert.equal(walletLimit, 2);
        });
      });

      /*describe("Mint NFT", () => {
        beforeEach(async () => {
          const txResponse = await basicNft.mintNft();
          await txResponse.wait(1);
        });
        it("Allows users to mint an NFT, and updates appropriately", async function () {
          const tokenURI = await basicNft.tokenURI(0);
          const tokenCounter = await basicNft.getTokenCounter();

          assert.equal(tokenCounter.toString(), "1");
          assert.equal(tokenURI, await basicNft.TOKEN_URI());
        });
        it("Show the correct balance and owner of an NFT", async function () {
          const deployerAddress = deployer.address;
          const deployerBalance = await basicNft.balanceOf(deployerAddress);
          const owner = await basicNft.ownerOf("0");

          assert.equal(deployerBalance.toString(), "1");
          assert.equal(owner, deployerAddress);
        });
      });*/
    });
