import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Twitter from "./assets/social-media-icons/twitter.png";
import Discord from "./assets/social-media-icons/discord.png";
import Opensea from "./assets/social-media-icons/opensea.png";

function NavBar() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex justify="space-between" padding="30px" align="center">
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
        <Box margin="0 15px">Mint</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />
        <Box margin="0 15px">About</Box>
        <Spacer />

        {/*Connect*/}
        {isConnected ? (
          <button onClick={() => disconnect()}>Disconnect</button>
        ) : (
          <ConnectKitButton />
        )}
      </Flex>
    </Flex>
  );
}

export default NavBar;
