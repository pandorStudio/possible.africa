import {Badge, Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text, Tooltip, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import TwitterCustomIcon from "./icons/TwitterCustomIcon.jsx";
import FacebookCustomIcon from "./icons/FacebookCustomIcon.jsx";
import LinkedinCustomIcon from "./icons/LinkedinCustomIcon.jsx";
import LinkSolidCustomIcon from "./icons/LinkSolidCustomIcon.jsx";
import parse from "html-react-parser";
import { useState } from "react";


function OneOrganisationTemplate({iconSx, backUrl, organisations}) {

  const date = new Date(organisations?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });



  const content = organisations?.description && parse(organisations?.description.replace(/\\n/g, "<br />"))
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
    <Flex py={0}>
        <VStack w="75%" h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Flex direction="column" gap={3}>
       <Badge display="inline" maxW={20} textAlign="center" colorScheme="red" p={2} borderRadius={50} marginBottom={3}>{organisations?.type?.name}</Badge>
       <Box minW="100%" overflow="hidden">
            <Image src={organisations?.couverture} minW="100%" fit="cover" alt="image" fallbackSrc='/placeholder_org_couverture.jpeg' borderStyle="solid" borderWidth="1px" borderColor="gray.100" />
        </Box>
        <Heading fontSize="4xl">{organisations?.name}</Heading>
        
       </Flex>

        <Flex w="full">
              <HStack w="full" h="full" spacing={2} alignItems="flex-start" justifyContent="space-between">
                
                <HStack alignItems="center">
              
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={organisations?.contributeur?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" fallbackSrc='/placeholder_org.jpeg' />
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={1}>
                  <Heading size="sm">{organisations?.contributeur?.firstname} {organisations?.contributeur?.lastname}</Heading>
                    <Flex justify="flex-start" color="gray.500">
                      <Box fontSize="sm" mr={4}>{jour} {mois}</Box>
                     
                    </Flex>
                  </Flex>
                </Box>
                </HStack>
                <HStack alignItems="center" h="100%">
                  <TwitterCustomIcon sx={iconSx}/>
                  <FacebookCustomIcon sx={iconSx}/>
                  <LinkedinCustomIcon sx={iconSx}/>
                    <LinkSolidCustomIcon sx={iconSx} onClick={handleCopyLink}/>
                    {showTooltip && <Box placement='top' bg="gray.800" borderRadius={4} color="white" px={2} fontSize="sm" zIndices="tooltip">Copié</Box>}
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

export default OneOrganisationTemplate;