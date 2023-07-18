import React, { useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Box, Flex, Image, Button, Link, Spacer } from "@chakra-ui/react";
import Twitter from "./assets/social-media-icons/twitter.png";
import Discord from "./assets/social-media-icons/discord.png";
import Opensea from "./assets/social-media-icons/opensea.png";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  padding: 1rem;
  color: white;
  background-color: #d6517d;
  box-shadow: 0px 2px 2px 1px #0f0f0f;
  border-radius: 5px;
  font-family: inherit;
  margin: 0 1rem;
`;

function NavBar() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <Flex
      justify="space-between"
      align="center"
      wrap="wrap"
      position="absolute"
      top="0"
      left="0"
      right="0"
      maxWidth="1600px"
      padding="10px 100px"
      margin="20px auto"
    >
      {/* Left side - Social media icons */}
      <Flex
        justify="space-around"
        width={{ base: "100%", md: "40%" }}
        marginBottom={{ base: "10px", md: "0" }}
      >
        <Link href="https://www.discord.com">
          <Image src={Discord} boxSize="32px" margin="0 15px"></Image>
        </Link>
        <Link href="https://www.twitter.com">
          <Image src={Twitter} boxSize="32px" margin="0 15px"></Image>
        </Link>
        <Link href="https://testnets.opensea.io/collection/robopunks-40">
          <Image src={Opensea} boxSize="32px" margin="0 15px"></Image>
        </Link>
      </Flex>

      {/* Right side - sections and connect button */}
      <Flex
        justify="space-between"
        align="center"
        width={{ base: "100%", md: "60%" }}
      >
        <Flex justify="space-between" width={{ base: "60%", md: "auto" }}>
          <ScrollLink
            activeClass="active"
            to="mint"
            spy={true}
            smooth={true}
            offset={0}
            duration={200}
          >
            <Box margin="0 15px" cursor="pointer">
              Mint
            </Box>
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            to="team"
            spy={true}
            smooth={true}
            offset={0}
            duration={200}
          >
            <Box margin="0 15px" cursor="pointer">
              Team
            </Box>
          </ScrollLink>
          <ScrollLink
            activeClass="active"
            to="roadmap"
            spy={true}
            smooth={true}
            offset={0}
            duration={200}
          >
            <Box margin="0 15px" cursor="pointer">
              Roadmap
            </Box>
          </ScrollLink>
        </Flex>

        <Spacer />

        {/* Connect */}
        {isConnected ? (
          <Button
            margin="0 15px"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            background="none"
            border="none"
            fontSize="16px"
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
