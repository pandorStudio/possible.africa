/* eslint-disable react/prop-types */


import { Box, Container, Flex, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { MapIcon, OrganisationsIcon, WorkIcon } from "../assets/icons.jsx";
import { Parse } from "../utils/htmlParser.jsx";
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import Socialshare from "./Socialshare.jsx";


function OneEmploiTemplate({iconSx, backUrl, jobs}) {

  const content = jobs?.description && Parse(jobs?.description)


  return (
    <Container maxW="container.lg" p={0} h="full">
                  <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} h="100%" direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
        {/* <Flex><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl}/></Flex> */}
       <Flex direction="column" gap={3}>
     
<Flex alignItems="center" gap={5}>

        <Box  minW={90}>

<Image
    fit ='cover'
    w={{base: "80px",md:"100px"}}
    h={{base: "80px",md:"100px"}}
    src={jobs?.organisation?.logo}
    alt={jobs?.organisation?.logo}
    borderRadius={8}
    fallbackSrc='/placeholder_org.jpeg'
    borderStyle="solid" borderColor="gray.100" borderWidth={1}
/>
</Box>
<Flex direction="column" gap={2}>
        <Heading fontSize={{base: "lg", md: "4xl"}}>{jobs?.title}</Heading>
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

        <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><OrganisationsIcon />        
        <Link href={`/organisations/${jobs?.organisation?._id}`} isExternal alignItems="center" fontSize={14}>
<Text fontSize="sm">{jobs?.organisation?.name}</Text>
</Link>
</Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><WorkIcon/> <Text fontSize="sm">{jobs?.type}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MapIcon/> <Text fontSize="sm">{jobs?.location}</Text></Flex>

</VStack>
    </Flex>

</Container>
  )
}

export default OneEmploiTemplate;