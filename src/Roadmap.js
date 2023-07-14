import { Box, Flex, Text } from "@chakra-ui/react";

const Roadmap = () => {
  return (
    <Flex
      justify="center"
      align="center"
      height="100vh"
      maxWidth="1600px"
      margin="auto"
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
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.{"\n"}
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.{"\n"}A diam maecenas sed enim ut sem viverra
            aliquet eget. Aliquam nulla facilisi cras fermentum odio eu feugiat
            pretium. Pretium nibh ipsum consequat nisl vel.
          </Text>
        </div>
      </Box>
    </Flex>
  );
};

export default Roadmap;
