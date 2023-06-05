import {Badge, Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text, Tooltip, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";

import parse from "html-react-parser";
import { useState } from "react";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Socialshare from "./Socialshare.jsx";


function OneOrganisationTemplate({iconSx, backUrl, organisations}) {

  const date = new Date(organisations?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });



  const content = organisations?.description && parse(organisations?.description.replace(/\\n/g, "<br />"))



  return (
    <Container maxW="container.lg" p={0}>
   <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Flex direction="column" gap={3}>
     
<Flex alignItems="center" gap={5}>

        <Box  minW={150} h="150px">

<Image
    fit ='cover'
    w="100%"
    h="150px"
    src={organisations?.logo}
    alt={organisations?.logo}
    borderRadius={8}
    fallbackSrc='/placeholder_org.jpeg'
    borderStyle="solid" borderColor="gray.100" borderWidth={1}
/>
</Box>
<Flex direction="column" gap={2}>
        <Heading fontSize="4xl">{organisations?.name}</Heading>
        <Flex>
        <Badge display="inline" textAlign="center" colorScheme="green" p={2} borderRadius={50} marginBottom={3}>{organisations?.type?.name}</Badge>      

        </Flex>
        <Link href={organisations?.site_web} isExternal alignItems="center" fontWeight={600} fontSize={14}>
  <Flex gap={1} alignItems="center">
  <LaunchOutlinedIcon/>
  Site internet 
    </Flex>
</Link>

     </Flex>
    </Flex>
  </Flex>
            <Box as="main">
         
            {content}
            </Box>

            <Flex w="full" marginTop={20} borderStyle="solid" borderColor="gray.100" borderTopWidth={1} paddingTop={5}>
       
            <HStack w="full" h="full" spacing={2} alignItems="flex-start" justifyContent="space-between">
                
                <HStack alignItems="center" gap={2}>
              
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={organisations?.contributeur?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" fallbackSrc='/placeholder_org.jpeg' />
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={2} alignItems="flex-start">
                    <Heading size="sm">{organisations?.contributeur?.firstname} {organisations?.contributeur?.lastname}</Heading>
                    <Badge display="inline" maxW={120} textAlign="center" fontSize={11} colorScheme="gray" p={2} borderRadius={50} >Contributeur</Badge>

                  </Flex>
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