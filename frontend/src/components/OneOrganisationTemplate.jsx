/* eslint-disable react/prop-types */

import {  Box, Container, Flex, Heading, HStack, Image, Link, VStack } from "@chakra-ui/react";
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";

import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { ParseIframe } from "../utils/htmlParser.jsx";
import Socialshare from "./Socialshare.jsx";


function OneOrganisationTemplate({iconSx, backUrl, organisations}) {




  const content = organisations?.description && ParseIframe(organisations?.description)



  return (
    <Container maxW="container.lg" p={0}>
   <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Flex direction="column" gap={3}>
     
<Flex alignItems="center" gap={5}>

        <Box  minW={90}>

<Image
    fit ='cover'
    w={{base: "80px",md:"100px"}}
    h={{base: "80px",md:"100px"}}
    src={organisations?.logo}
    alt={organisations?.logo}
    borderRadius={8}
    fallbackSrc='/placeholder_org.jpeg'
    borderStyle="solid" borderColor="gray.100" borderWidth={1}
/>
</Box>
<Flex direction="column" gap={2}>
        <Heading fontSize={{base: "lg", md: "4xl"}}>{organisations?.name}</Heading>
        <Flex gap={{base:2, md: 5}} direction={{base:"row", md:"row"} } alignItems="center">
        <Link href={`/organisations/${organisations?.slug}`} isExternal alignItems="center" fontSize={14}>

      {organisations?.type?.name &&  organisations?.type?.name }     
      </Link>
        <Link href={organisations?.site_web} isExternal alignItems="center" fontSize={14}>
  <Flex gap={1} alignItems="center">
  <LaunchOutlinedIcon/>
  Site internet 
    </Flex>
</Link>
        </Flex>

     </Flex>
    </Flex>
  </Flex>
            <Box as="main">
         
            {content}
            </Box>

            <Flex w="full" marginTop={20} borderStyle="solid" borderColor="gray.100" borderTopWidth={1} paddingTop={5}>
       
            <HStack w="full" h="full" spacing={2} alignItems="flex-start" justifyContent="space-between">
                
                <HStack alignItems="center" gap={2}>
              
                  
                <Box w="full">
               
                </Box>
                </HStack>
                <Socialshare titre={organisations?.name}/>
              </HStack>
              </Flex>
        </VStack>
        <VStack w={{ base: '100%', md: "25%" }} h="full" p={10} spacing={10} alignItems="flex-start" bg="white">

          

</VStack>
    </Flex>

</Container>
  )
}

export default OneOrganisationTemplate;