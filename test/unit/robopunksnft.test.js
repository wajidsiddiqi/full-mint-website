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
          const publicNftState = await roboPunksNft.getPublicNftState();
          const wlNftState = await roboPunksNft.getWhitelistNftState();
          const publicMintFee = await roboPunksNft.getPublicMintPrice();
          const wlMintFee = await roboPunksNft.getWhitelistMintPrice();
          const totalSupply = await roboPunksNft.getTotalSupply();
          const maxSupply = await roboPunksNft.getMaxSupply();
          const walletLimit = await roboPunksNft.getWalletLimit();
          const revealState = await roboPunksNft.getRevealState();
          const baseTokenURI = await roboPunksNft.getBaseTokenURI();

          assert.equal(name, "RoboPunks");
          assert.equal(symbol, "RP");
          assert.equal(publicNftState, false);
          assert.equal(wlNftState, false);
          assert.equal(revealState, false);
          assert.equal(
            publicMintFee.toString(),
            ethers.utils.parseEther("0.08")
          );
          assert.equal(wlMintFee.toString(), ethers.utils.parseEther("0.04"));
          assert.equal(totalSupply, 0);
          assert.equal(maxSupply, 8);
          assert.equal(walletLimit, 2);
          assert.equal(
            baseTokenURI.toString(),
            "ipfs://bafybeidlnjv7bbart3azzizjh76ywpvtns67nz3c2pdu5xvytdrtwbeopu/"
          );
        });
      });

      describe("NFT State Changer", () => {
        it("changes nft state", async () => {
          const txResponse = await roboPunksNft.changeNftMintState(true, true);
          await txResponse.wait(1);
          const publicNftState = await roboPunksNft.getPublicNftState();
          const wlNftState = await roboPunksNft.getWhitelistNftState();
          assert.equal(publicNftState, true);
          assert.equal(wlNftState, true);
        });

        it("reverts when non owner changes nft state", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];
          await expect(
            roboPunksNft.connect(nonowner).changeNftMintState(true, true)
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });

      describe("NFT Reveal", () => {
        it("changes nft reveal", async () => {
          const txResponse = await roboPunksNft.isRevealed(true);
          await txResponse.wait(1);
          const revealState = await roboPunksNft.getRevealState();
          assert.equal(revealState, true);
        });

        it("reverts when non owner changes nft reveal", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];
          await expect(
            roboPunksNft.connect(nonowner).isRevealed(true)
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });

      describe("Set WL", () => {
        it("sets WL addresses", async () => {
          const txResponse = await roboPunksNft.setWhitelist([
            deployer.address,
          ]);
          await txResponse.wait(1);
          const whiteListed = await roboPunksNft.checkWhitelist(
            deployer.address
          );
          assert.equal(whiteListed, true);
        });

        it("reverts when non owner sets WL addresses", async () => {
          const accounts = await ethers.getSigners();
          const nonowner = accounts[1];
          await expect(
            roboPunksNft.connect(nonowner).setWhitelist([deployer.address])
          ).to.be.revertedWith("Ownable: caller is not the owner");
        });
      });

      describe("WL Mint", () => {
        let quantity, value;

        beforeEach(async () => {
          const price = await roboPunksNft.getWhitelistMintPrice();
          quantity = 1;
          value = price.mul(quantity);
        });

        it("reverts if WL is not open", async () => {
          await expect(
            roboPunksNft.whitelistMint(quantity, { value: value })
          ).to.be.revertedWith("WL mint not enabled");
        });

        it("reverts if not whitelisted", async () => {
          const txResponse = await roboPunksNft.changeNftMintState(false, true);
          await txResponse.wait(1);
          await expect(
            roboPunksNft.whitelistMint(quantity, { value: value })
          ).to.be.revertedWith("not whitelisted");
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
