import { useState } from "react";
import { ethers } from "ethers";
import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import RoboPunksNFT from "./RoboPunksNFT.json";

const contractAddress = "0xafba542846406CE66D3d1b2773d0237fb993af43";
const mintPrice = "0.08";

const PublicMint = () => {
  const { isConnected } = useAccount();
  const [mintQuantity, setMintQuantity] = useState(1);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: RoboPunksNFT.abi,
    functionName: "publicMint",
    args: [mintQuantity],
    value: ethers.utils.parseEther(mintPrice).mul(mintQuantity).toString(),
  });

  const { data, error, isError, write } = useContractWrite(config, {
    shouldReturnTransactionError: false,
  });
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const parsedErrorMessage = prepareError.replace(/Docs:.*\nVersion:.*$/gm, "");

  const handleDecrement = () => {
    if (mintQuantity <= 1) return;
    setMintQuantity(mintQuantity - 1);
  };

  const handleIncrement = () => {
    if (mintQuantity >= 2) return;
    setMintQuantity(mintQuantity + 1);
  };

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="40px" textShadow="0 5px #000000">
            RoboPunks
          </Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            This is my full-stack NFT portfolio development project, created
            using Solidity, Hardhat, React, WAGMI, and various other
            technologies. The project implements the ERC-721 token standard.
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                type="number"
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                value={mintQuantity}
              ></Input>
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              disabled={!write || isLoading}
              onClick={write}
            >
              {isLoading ? "MINTING..." : "MINT NOW!"}
            </Button>
            {isSuccess && (
              <Flex align="center" justify="center">
                <Text
                  fontSize="30px"
                  letterSpacing="-5.5%"
                  fontFamily="VT323"
                  textShadow="0 3px #000000"
                  marginTop="70px"
                  color="green"
                >
                  Successfully minted your NFT!
                  <a
                    href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
                    style={{
                      color: "#D6517D",
                      textDecoration: "none",
                      fontWeight: "bold",
                      marginLeft: "10px",
                    }}
                  >
                    Etherscan
                  </a>
                </Text>
              </Flex>
            )}
            {(isPrepareError || isError) && (
              <Flex align="center" justify="center">
                <Text
                  fontSize="30px"
                  letterSpacing="-5.5%"
                  fontFamily="VT323"
                  textShadow="0 3px #000000"
                  marginTop="70px"
                  color="red"
                >
                  Error: {(parsedErrorMessage || error)?.message}
                </Text>
              </Flex>
            )}
          </div>
        ) : (
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            marginTop="70px"
            color="#D6517D"
          >
            You must be connected to Mint!
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default PublicMint;
