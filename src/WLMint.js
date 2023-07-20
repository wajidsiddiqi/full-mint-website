import { useState } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import RoboPunksNFT from "../RoboPunksNFT.json";

const contractAddress = "0xafba542846406CE66D3d1b2773d0237fb993af43";
const mintPrice = "0.04";

const WLMint = () => {
  const { isConnected } = useAccount();
  const [mintQuantity, setMintQuantity] = useState(1);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: RoboPunksNFT.abi,
    functionName: "whitelistMint",
    args: [mintQuantity],
    value: ethers.utils.parseEther(mintPrice).mul(mintQuantity).toString(),
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
    if (mintQuantity >= 2) return;
    setMintQuantity(mintQuantity + 1);
  };

  return (
    <div>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintQuantity}></input>
            <button onClick={handleIncrement}>+</button>
          </div>
          <button disabled={!write || isLoading} onClick={write}>
            {isLoading ? "Minting..." : "Mint Now!"}
          </button>
          {isSuccess && (
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>
                  Etherscan
                </a>
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

export default WLMint;
