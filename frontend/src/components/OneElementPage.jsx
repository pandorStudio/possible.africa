import {Badge, Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text, Tooltip, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import TwitterCustomIcon from "./icons/TwitterCustomIcon.jsx";
import FacebookCustomIcon from "./icons/FacebookCustomIcon.jsx";
import LinkedinCustomIcon from "./icons/LinkedinCustomIcon.jsx";
import LinkSolidCustomIcon from "./icons/LinkSolidCustomIcon.jsx";
import BookmarkRegularCustomIcon from "./icons/BookmarkRegularCustomIcon.jsx";
import parse from "html-react-parser";
import { useState } from "react";


function OneElementPage({iconSx, backUrl, news}) {

  const date = new Date(news?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });


  function estimateReadingTime(text) {
    const wordsPerMinute = 200; // Change this value according to your preference
  
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    return readingTimeMinutes;
  }
  const content = news?.content && parse(news?.content.replace(/\\n/g, "<br />"))
  const [showTooltip, setShowTooltip] = useState(false);


  const handleCopyLink = () => {
    const postUrl = window.location.href;
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        console.log('Link copied to clipboard!');
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 2000);

      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard:', error);
      });
  };


  return (
    <Container maxW="container.lg" p={0}>
    <Flex h="100vh" py={0}>
        <VStack w="75%" h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Box>
       <Badge colorScheme="green" p={2} borderRadius={50} marginBottom={3}>{news?.categorie?.name}</Badge>
        <Heading fontSize="4xl">{news?.title}</Heading>
       </Box>

        <Flex w="full">
              <HStack w="full" h="full" spacing={2} alignItems="flex-start" justifyContent="space-between">
                <HStack alignItems="center">
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={news?.user?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" />
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={1}>
                  <Heading size="sm">{news?.user?.firstname} {news?.user?.lastname}</Heading>
                    <Flex justify="flex-start" color="gray.500">
                      <Box fontSize="sm" mr={4}>{jour} {mois}</Box>
                      <Box fontSize="sm">{5} mins de lecture</Box>
                    </Flex>
                  </Flex>
                </Box>
                </HStack>
                <HStack alignItems="center" h="100%">
                  <TwitterCustomIcon sx={iconSx}/>
                  <FacebookCustomIcon sx={iconSx}/>
                  <LinkedinCustomIcon sx={iconSx}/>
                    <LinkSolidCustomIcon sx={iconSx} onClick={handleCopyLink}/>
                    {showTooltip && <Box placement='top' bg="gray.800" borderRadius={4} color="white" px={2} fontSize="sm" zIndices="tooltip" hasArrow>Copié</Box>}
                  {/*<BookmarkSolidCustomIcon sx={iconSx}/>*/}
                  {/* <BookmarkRegularCustomIcon sx={iconSx}/> */}
                  {/*<PlusSolidCustomIcon sx={iconSx}/>*/}
                </HStack>
              </HStack>

            </Flex>

            <Box as="main">
         
            {content}
            </Box>
        </VStack>
        <VStack w="25%" h="full" p={10} spacing={10} alignItems="flex-start" bg="white">

</VStack>
    </Flex>

</Container>
  )
}

export default OneElementPage;