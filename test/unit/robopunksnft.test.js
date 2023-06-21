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

      describe("NFT state function only owner can change to true", () => {
        it("changes nft state to true", async () => {
          const [owner, nonOwner] = await ethers.getSigners();

          //? Ensure initial state is false
          let nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, false);

          //? Attempt to change nft state by non-owner
          await expect(
            roboPunksNft.connect(nonOwner).changeNftMintState(true)
          ).to.be.revertedWith("Ownable: caller is not the owner");

          //? Confirm state remains false
          nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, false);

          //? Change nft state by owner
          const txResponse = await roboPunksNft
            .connect(owner)
            .changeNftMintState(true);
          await txResponse.wait(1);

          //? Confirm state is now true
          nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, true);
        });
      });

      describe("NFT state function only owner can change to false", () => {
        beforeEach(async () => {
          const txResponse = await roboPunksNft.changeNftMintState(true);
          await txResponse.wait(1);
        });

        it("changes nft state to false", async () => {
          const [owner, nonOwner] = await ethers.getSigners();

          //? Ensure initial state is true
          let nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, true);

          //? Attempt to change nft state by non-owner
          await expect(
            roboPunksNft.connect(nonOwner).changeNftMintState(false)
          ).to.be.revertedWith("Ownable: caller is not the owner");

          //? Confirm state remains true
          nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, true);

          //? Change nft state by owner
          const txResponse = await roboPunksNft
            .connect(owner)
            .changeNftMintState(false);
          await txResponse.wait(1);

          //? Confirm state is now false
          nftState = await roboPunksNft.getNftState();
          assert.equal(nftState, false);
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
