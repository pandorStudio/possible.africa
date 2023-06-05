import {Badge, Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text, Tooltip, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";

import parse from "html-react-parser";
import { useState } from "react";
import Socialshare from "./Socialshare.jsx";


function OnePostPage({iconSx, backUrl, news}) {

  const date = new Date(news?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });
  const content = news?.content && parse(news?.content.replace(/\\n/g, "<br />"))

  function estimateReadingTime() {
    const wordsPerMinute = 200; // Change this value according to your preference
  
    const wordCount = news?.content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    return readingTimeMinutes;
  }
 

  return (
    <Container maxW="container.lg" p={0} >
         <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Box>
        <Flex>
        <Badge colorScheme="green" p={2} borderRadius={50} marginBottom={3}>{news?.categorie?.name}</Badge>

        </Flex>
        <Heading fontSize="4xl">{news?.title}</Heading>
       </Box>

        <Flex w="full">
              <HStack w="full" h="full" spacing={2} alignItems="flex-start" justifyContent="space-between">
                <HStack alignItems="center">
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={news?.user?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" fallbackSrc='/placeholder.png'/>
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={1}>
                  <Heading size="sm">{news?.user?.firstname} {news?.user?.lastname}</Heading>
                    <Flex justify="flex-start" color="gray.500">
                      <Box fontSize="sm" mr={4}>{jour} {mois}</Box>
                      <Box fontSize="sm">{estimateReadingTime()} mins de lecture</Box>
                    </Flex>
                  </Flex>
                  
                </Box>
                </HStack>
                <Socialshare/>
              </HStack>

            </Flex>

            <Box as="main">
         
            {content}
            </Box>
        </VStack>
        <VStack w={{ base: '100%', md: "25%" }} h="full" p={10} spacing={10} alignItems="flex-start">

</VStack>
    </Flex>

</Container>
  )
}

export default OnePostPage;