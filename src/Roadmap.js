import { Box, Flex, Text } from "@chakra-ui/react";
import Twitter from "./assets/social-media-icons/twitter.png";

const Roadmap = () => {
  return (
    <Flex
      flexDirection="column"
      minHeight="100vh"
      maxWidth="1600px"
      margin="auto"
      name="roadmap"
    >
      <Flex
        justify="center"
        align="center"
        flexGrow="1"
        padding="90px 2% 30px 2%"
      >
        <Box width="520px">
          <div>
            <Text fontSize="40px" textShadow="0 5px #000000">
              Roadmap
            </Text>
            <Text
              fontSize="30px"
              letterSpacing="-5.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000000"
              marginTop="4rem"
              marginBottom="4rem"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <br />
              <br />
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
              <br />
              <br />A diam maecenas sed enim ut sem viverra aliquet eget.
              Aliquam nulla facilisi cras fermentum odio eu feugiat pretium.
              Pretium nibh ipsum consequat nisl vel.
            </Text>
          </div>
        </Box>
      </Flex>
      <Box as="footer" py="4" textAlign="center">
        <Flex justifyContent="center" alignItems="center">
          <Text fontSize="25px" opacity="0.8" fontFamily="VT323">
            Developed with love by Wajid © 2023 |{" "}
          </Text>
          <a href="https://twitter.com/abdulwajidsid" target="_blank">
            <img
              src={Twitter}
              alt="Twitter"
              width="25px"
              height="auto"
              cursor="pointer"
              style={{ marginLeft: "10px" }}
            />
          </a>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Roadmap;
