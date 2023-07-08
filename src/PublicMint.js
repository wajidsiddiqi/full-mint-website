import { useState } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import RoboPunksNFT from "./RoboPunksNFT.json";

const { isConnected } = useAccount();

const contractAddress = "0xafba542846406CE66D3d1b2773d0237fb993af43";
const mintPrice = "0.08";

const PublicMint = () => {
  const [mintQuantity, setMintQuantity] = useState(1);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: RoboPunksNFT.abi,
    functionName: "publicMint",
    args: [
      mintQuantity,
      { value: ethers.utils.parseEther(mintPrice).mul(mintQuantity) },
    ],
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleDecrement = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  const handleIncrement = () => {
    if (mintQuantity >= 3) return;
    setMintQuantity(mintQuantity + 1);
  };

  return (
    <div>
      <h1>RoboPunks</h1>
      <p>
        This is my full-stack NFT portfolio development project, created using
        Solidity, Hardhat, React, WAGMI, and various other technologies. The
        project implements the ERC-721 token standard.
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintQuantity}></input>
            <button onClick={handleIncrement}>+</button>
          </div>
          <button disabled={!write || isLoading}>
            {isLoading ? "Minting..." : "Mint Now!"}
          </button>
          {isSuccess && (
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </div>
            </div>
          )}
          {(isPrepareError || isError) && (
            <div>Error: {(prepareError || error)?.message}</div>
          )}
        </div>
      ) : (
        <p>You must be connected to Mint!</p>
      )}
    </div>
  );
};

export default PublicMint;
