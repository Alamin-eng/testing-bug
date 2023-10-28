import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Grid,
  GridItem,
  AbsoluteCenter,
  Stat,
  Stack,
  Avatar,
  Badge,
  Divider,
  StatLabel,
  StatNumber,
  StatArrow,
  StatGroup,
  Card,
  CardBody,
  SkeletonCircle,
  CardFooter,
  Tag,
  TagLabel,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";

import { motion } from "framer-motion";

const cryptoURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

// const cryptoURL = "http://localhost:3001/";
// "start": "node ./server/server.js & react-scripts start",

const exchangeRateURL = "https://open.er-api.com/v6/latest/USD";

export default function Main() {
  const [data, setData] = useState([]);
  const [pound, setPound] = useState([]);

  // framer motion scroll
  const variants = {
    offscreen: {
      opacity: 0.5,
      y: 40,
    },
    onscreen: {
      opacity: 1,
      y: 10,
      transition: {
        type: "spring",
        bounce: 0.2,

        duration: 0.8,
      },
    },
  };

  // Chakra responsive state
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ctyptoData = await fetch(cryptoURL);
        const res = await ctyptoData.json();
        setData(res);
        console.log(res);

        const gbpRateData = await fetch(exchangeRateURL);
        const res2 = await gbpRateData.json();
        console.log(res2.rates);
        setPound(res2.rates.GBP);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack spacing={1} bgGradient="linear(gray.100, teal.300, blue.200)">
      <main>
        <Box position="relative" padding="10">
          <Divider />

          <AbsoluteCenter
            color="green.700"
            fontWeight="bold"
            px="7"
            fontSize="lg"
          >
            Today's crypto currency update in GBP
          </AbsoluteCenter>
        </Box>

        {data.map((el, index) => {
          return (
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              variants={variants}
            >
              <Card
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
                mt={2}
                p={1}
                bgGradient="linear(to-t,gray.50, teal.50, orange.50)"
                key={index}
              >
                <HStack ml={1} p={1}>
                  <Tag
                    size="xs"
                    borderRadius="full"
                    m={2}
                    width={isSmallScreen ? "45vw" : "15vw"}
                  >
                    <Avatar
                      src={`${el.image}`}
                      size="md"
                      name="crypto"
                      m={2}
                      p={1}
                    />
                    <TagLabel ml={1} p={2}>
                      {el.symbol} GBP
                    </TagLabel>
                  </Tag>
                </HStack>

                <Stack direction="row">
                  <CardBody>
                    <Grid
                      templateColumns="repeat(3, 1fr)"
                      templateRows="1fr 60px"
                      gap={5}
                      justifyItems="flex-start"
                    >
                      <GridItem colSpan={1} p={1}>
                        <Box ml="1">
                          <Text fontWeight="bold" gap={1}>
                            {el.name}
                          </Text>
                          <SkeletonCircle
                            size=""
                            startColor="purple.600"
                            endColor="orange.500"
                            height="6px"
                            m={1.5}
                            ml={-1}
                          />
                          <Text
                            fontSize="lg"
                            color="darkred"
                            mr={1}
                            mt={1}
                            pr={1}
                            pt={1}
                            pb={1}
                          >
                            £{Number(el.current_price * pound).toFixed(7)}
                          </Text>
                        </Box>
                      </GridItem>

                      <GridItem
                        colStart={3}
                        colEnd={4}
                        p={2}
                        border="1px"
                        borderColor="gray.300"
                        width="35vw"
                        ml={4}
                      >
                        <Badge colorScheme="green" ml={-1}>
                          RANK {el.market_cap_rank}
                        </Badge>

                        <hr
                          style={{
                            backgroundColor: "orange",
                            height: "1.75px",
                            marginLeft: "-5px",
                          }}
                        ></hr>
                        <StatGroup
                          gap={isSmallScreen ? "3" : "7"}
                          mt={2}
                          mb={1}
                        >
                          <Stat
                            mt={-1}
                            mb={-1}
                            p={1}
                            bg="purple.200"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">Total_vol</StatLabel>

                            <StatNumber fontSize="xs">
                              {el.total_volume}
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="blue.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              Changes <br></br>
                            </StatLabel>

                            <StatNumber fontSize="xs">
                              {el.price_change_percentage_24h}%
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="red.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              High 24hrs <br></br>
                            </StatLabel>
                            <StatNumber fontSize="xs">
                              £{el.high_24h} <StatArrow type="increase" />
                            </StatNumber>
                          </Stat>
                          <Stat
                            mt={-1}
                            mb={-1}
                            bg="yellow.100"
                            textAlign="center"
                            className="rounded"
                          >
                            <StatLabel borderRadius="sm">
                              Low 24hrs<br></br>
                            </StatLabel>
                            <StatNumber fontSize="xs">
                              £{el.low_24h} <StatArrow type="decrease" />
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </GridItem>

                      <GridItem
                        rowStart={2}
                        colStart={isSmallScreen ? 1 : 2}
                        colEnd={4}
                        p={1}
                        m={1}
                        mt={isSmallScreen ? 1 : -3}
                        fontSize={isSmallScreen ? ".75rem" : ".85rem"}
                        borderTop="1px"
                        borderTopColor="blue.300"
                      >
                        <div
                          className="text-container"
                          style={{ gap: isSmallScreen ? "10%" : "25%" }}
                        >
                          <div>
                            Change 24hrs <Divider />£
                            {Number(el.price_change_24h).toFixed(2)}
                          </div>
                          <div>
                            Change% 24hrs <Divider />
                            {Number(el.price_change_percentage_24h).toFixed(
                              2
                            )}%{" "}
                          </div>
                          <div>
                            All time high
                            <Divider /> £{Number(el.ath * pound).toFixed(5)}
                          </div>
                          <div>
                            All time change <Divider />
                            {Number(el.ath_change_percentage).toFixed(2)}%
                          </div>
                        </div>
                      </GridItem>
                    </Grid>
                  </CardBody>

                  <CardFooter> </CardFooter>
                </Stack>
              </Card>
            </motion.div>
          );
        })}
      </main>
    </Stack>
  );
}

//put the the rowed grid for each card items in a seperate component then put back in here using props, use stat from chakra,don't use card footer, Try to find a slide animation for the row grid.
// Add footer
// make it nicer with animated navbar from react-framer motion
