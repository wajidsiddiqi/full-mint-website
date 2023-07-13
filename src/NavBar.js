import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Box, Flex, Image, Button, Link, Spacer } from "@chakra-ui/react";
import Twitter from "./assets/social-media-icons/twitter.png";
import Discord from "./assets/social-media-icons/discord.png";
import Opensea from "./assets/social-media-icons/opensea.png";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 15px;
  color: white;
  background-color: #d6517d;
  border-radius: 5px;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  border-radius: 5px;
  font-family: inherit;
  margin: 0 15px;
`;

function NavBar() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex
      justify="space-between"
      padding="30px"
      align="center"
      maxWidth="1600px"
      margin="auto"
    >
      {/*Left side - Social media icons */}
      <Flex justify="space-around" padding="0 75px" width="40%">
        <Link href="https://www.discord.com">
          <Image src={Discord} boxSize="40px" margin="0 15px"></Image>
        </Link>
        <Link href="https://www.twitter.com">
          <Image src={Twitter} boxSize="40px" margin="0 15px"></Image>
        </Link>
        <Link href="https://testnets.opensea.io/collection/robopunks-40">
          <Image src={Opensea} boxSize="40px" margin="0 15px"></Image>
        </Link>
      </Flex>

      {/*Right side - sections and connect button */}
      <Flex justify="space-around" align="center" padding="0 130px" width="50%">
        <Box margin="0 15px" cursor="pointer">
          Mint
        </Box>
        <Spacer />
        <Box margin="0 15px" cursor="pointer">
          Team
        </Box>
        <Spacer />
        <Box margin="0 15px" cursor="pointer">
          About
        </Box>
        <Spacer />

        {/*Connect*/}
        {isConnected ? (
          <Button
            margin="0 15px"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            background="none"
            border="none"
            font-size="16px"
            onClick={() => disconnect()}
          >
            Disconnect
          </Button>
        ) : (
          <ConnectKitButton.Custom>
            {({ show }) => {
              return <StyledButton onClick={show}>Connect</StyledButton>;
            }}
          </ConnectKitButton.Custom>
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
