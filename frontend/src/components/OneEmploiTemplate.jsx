import {Badge, Box, Container, Flex, Grid, GridItem, Heading, HStack, Image, Link, Text, Tooltip, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import TwitterCustomIcon from "./icons/TwitterCustomIcon.jsx";
import FacebookCustomIcon from "./icons/FacebookCustomIcon.jsx";
import LinkedinCustomIcon from "./icons/LinkedinCustomIcon.jsx";
import LinkSolidCustomIcon from "./icons/LinkSolidCustomIcon.jsx";
import parse from "html-react-parser";
import { useState } from "react";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import Socialshare from "./Socialshare.jsx";
import { MapIcon, OrganisationsIcon, WorkIcon } from "../assets/icons.jsx";


function OneEmploiTemplate({iconSx, backUrl, jobs}) {

  const date = new Date(jobs?.createdAt);
  const jour = date.getDate();
  const mois = date.toLocaleString('default', { month: 'long' });



  const content = jobs?.description && parse(jobs?.description.replace(/\\n/g, "<br />"))



  return (
    <Container maxW="container.lg" p={0} h="full">
                  <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} h="100%" direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Flex direction="column" gap={3}>
     
<Flex alignItems="center" gap={5}>

        <Box  minW={150} h="150px">

<Image
    fit ='cover'
    w="100%"
    h="150px"
    src={jobs?.organisation?.logo}
    alt={jobs?.organisation?.logo}
    borderRadius={8}
    fallbackSrc='/placeholder_org.jpeg'
    borderStyle="solid" borderColor="gray.100" borderWidth={1}
/>
</Box>
<Flex direction="column" gap={2}>
        <Heading fontSize="4xl">{jobs?.title}</Heading>
<Flex>
    5 mai - 7 dec 2023
</Flex>
     </Flex>
    </Flex>
  </Flex>
            <Box as="main">
         
            {content}
            </Box>

       
           
            <HStack w="full" h="full" spacing={2} justifyContent="flex-end" >
                
                {/* <HStack alignItems="center" gap={2}>
              
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={jobs?.contributeur?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" fallbackSrc='/placeholder_org.jpeg' />
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={2} alignItems="flex-start">
                    <Heading size="sm">{jobs?.contributeur?.firstname} {jobs?.contributeur?.lastname}</Heading>
                    <Badge display="inline" maxW={120} textAlign="center" fontSize={11} colorScheme="gray" p={2} borderRadius={50} >Contributeur</Badge>

                  </Flex>
                </Box>
                </HStack> */}
                <Socialshare titre={jobs?.name}/>
              </HStack>

        </VStack>
        <VStack w={{ base: '100%', md: "25%" }} maxHeight="full" p={10} spacing={2} alignItems="flex-start" bg="white" borderStyle="solid" borderColor="gray.100" borderLeftWidth={1}>

        <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><OrganisationsIcon /> <Text fontSize="sm">{jobs?.organisation?.name}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><WorkIcon/> <Text fontSize="sm">{jobs?.type}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MapIcon/> <Text fontSize="sm">{jobs?.location}</Text></Flex>

</VStack>
    </Flex>

</Container>
  )
}

export default OneEmploiTemplate;