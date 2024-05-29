import React from "react";
import { Box, Text, Heading, background } from "@chakra-ui/react";

export default function Header() {
  const outerBoxStyles = {
    boxSize: "full",
    height: "280px",
    p: "10",
    background:
      "url(https://www.acquisition-international.com/wp-content/uploads/2020/12/bitcoin.jpg) center/cover no-repeat",
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
