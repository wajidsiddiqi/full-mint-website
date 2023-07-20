import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Box, Flex, Image, Button, Link, Spacer } from "@chakra-ui/react";
import Twitter from "./assets/social-media-icons/twitter.png";
import Discord from "./assets/social-media-icons/discord.png";
import Opensea from "./assets/social-media-icons/opensea.png";
import styled from "styled-components";
import Hamburger from "hamburger-react";
import "./App.css";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 945);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 945);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button - Fixed position */}
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        position="absolute"
        top="0"
        left="0"
        right="0"
        maxWidth="1600px"
        margin="20px auto"
        className="navbarMobilePadding DekstopPadding"
      >
        {isMobile && (
          <Flex
            justify="space-around"
            width={{ base: "100%", md: "40%" }}
            marginBottom={{ base: "10px", md: "0" }}
            zIndex="997"
            cursor="pointer"
            color="white"
            backgroundColor="#d6517d"
            boxShadow="0px 2px 2px 1px #0f0f0f"
            borderRadius="5px"
            margin="0 1rem"
          >
            <Hamburger toggled={isOpen} toggle={handleMenuToggle} size={24} />
          </Flex>
        )}

        {/* Hamburger Menu */}
        {isMobile && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            mt={{ base: 4, md: 0 }}
            background="#d6517d"
            position="fixed"
            top="0"
            left={isOpen ? "0" : "-300px"}
            height="100vh"
            width="300px"
            zIndex="998"
            transition="left 0.3s ease-in-out"
          >
            {/* Your menu content here */}
            {isOpen && (
              <Flex
                justify="center"
                width={{ base: "100%", md: "40%" }}
                zIndex="999"
                cursor="pointer"
                color="#d6517d"
                backgroundColor="white"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                borderRadius="5px"
                margin="0 1rem"
                position="fixed"
                top="20px"
                left="215px"
              >
                <Hamburger
                  toggled={isOpen}
                  toggle={handleMenuToggle}
                  size={24}
                />
              </Flex>
            )}

            <Box mt="3rem">
              <ScrollLink
                activeClass="active"
                to="mint"
                spy={true}
                smooth={true}
                offset={0}
                duration={200}
                onClick={handleMenuClose}
              >
                <Box margin="10px" cursor="pointer">
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
                onClick={handleMenuClose}
              >
                <Box margin="10px" cursor="pointer">
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
                onClick={handleMenuClose}
              >
                <Box margin="10px" cursor="pointer">
                  Roadmap
                </Box>
              </ScrollLink>
            </Box>

            <Flex justify="center" width="100%" p="2rem">
              {/* Footer container */}
              <Link href="https://www.discord.com">
                <Image src={Discord} boxSize="24px" margin="0 8px"></Image>
              </Link>
              <Link href="https://www.twitter.com">
                <Image src={Twitter} boxSize="24px" margin="0 8px"></Image>
              </Link>
              <Link href="https://testnets.opensea.io/collection/robopunks-40">
                <Image src={Opensea} boxSize="24px" margin="0 8px"></Image>
              </Link>
            </Flex>
          </Flex>
        )}

        {/* Left side - Social media icons */}
        {!isMobile && (
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
        )}

        {/* Right side - sections and connect button */}
        <Flex
          justify={isMobile ? "center" : "space-between"}
          align="center"
          width={{ base: "100%", md: "60%" }}
        >
          {!isMobile && (
            <Flex justify="space-between" width={{ md: "auto" }}>
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
          )}

          <Spacer />

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
    </>
  );
}

export default NavBar;
