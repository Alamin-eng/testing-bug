import React from "react";
import { Box, Text, Heading } from "@chakra-ui/react";
import backgroundImage from "./bitcoin.jpg";

export default function Header() {
  const outerBoxStyles = {
    width: "100%",
    height: "280px",
    padding: "10px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <header>
      <Box sx={outerBoxStyles} className="App-header">
        <Box filter="auto" brightness="95%">
          <Text
            bgGradient="linear(to-l, #1221AA, #AE10E0)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            filter="auto"
            brightness="80%"
          >
            <Heading size="2xl">TOP 100 CRYPTO</Heading>
          </Text>
          <div className="line"></div>
          <Text size="xs">Worldwide update</Text>{" "}
        </Box>
      </Box>
    </header>
  );
}
