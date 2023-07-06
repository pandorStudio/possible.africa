/* eslint-disable react/prop-types */
import {Badge, Box, Container, Flex, Heading, HStack, Image, Text, VStack} from "@chakra-ui/react"
import ArrowLeftSolidCustomIcon from "./icons/ArrowLeftSolidCustomIcon.jsx";
import Socialshare from "./Socialshare.jsx";
import { CalendarIcon, MapIcon } from "../assets/icons.jsx";
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Link } from "react-router-dom";
import {Parse} from "../utils/htmlParser.jsx";



function OneAgendaTemplate({iconSx, backUrl, events}) {





  const content = events?.description && Parse(events?.description)



  return (
    <Container maxW="container.lg" p={0}>
        <Flex ml={10}><ArrowLeftSolidCustomIcon sx={iconSx} backUrl={backUrl} mr="1" mt={5}/></Flex>

    <Flex py={0} direction={{ base: 'column', md: "row" }}>
        <VStack w={{ base: '100%', md: "75%" }} h="full" p={10} spacing={10} alignItems="flex-start">
       <Flex direction="column" gap={3}>
     
<Flex alignItems="center" gap={5}>

        <Box minW={90}>

<Image
    fit ='cover'
    w={{base: "80px",md:"100px"}}
    h={{base: "80px",md:"100px"}}
    src={events?.organisation?.logo}
    alt={events?.organisation?.logo}
    borderRadius={8}
    fallbackSrc='/placeholder_org.jpeg'
    borderStyle="solid" borderColor="gray.100" borderWidth={1}
/>
</Box>
<Flex direction="column" gap={2}>

        <Heading fontSize={{base: "lg", md: "4xl"}}>{events?.title}</Heading>
<Flex >
          
<Flex gap={{base:2, md: 5}} direction={{base:"column", md:"row"}}>
<Flex gap={1} alignItems="center">
<Link href={events?.location} isExternal alignItems="center" fontWeight={600} fontSize={14}>
  <Flex gap={1} alignItems="center">
  <MapIcon/>
  <Text fontSize={14}>
  {events?.location}
    </Text> 
    </Flex>
</Link>

</Flex>

<Flex>

  <Flex gap={1} alignItems="center">
  <CalendarIcon/>
  <Text fontSize={14}>
  {events?.frequence && events?.frequence  } 
    </Text> 
    </Flex>
</Flex>
<Flex>

<Link href={events?.registration_link} isExternal alignItems="center" fontWeight={600} fontSize={14}>
  <Flex gap={1} alignItems="center">
  <LaunchOutlinedIcon/>
  <Text fontSize={14}>
    En savoir plus
    </Text> 
    </Flex>
</Link>
</Flex>


</Flex>
        </Flex>
       

     </Flex>
    </Flex>
  </Flex>
            <Box as="main">
         
            {content}
            </Box>

            {/* <MapComponent location={events?.location} /> */}

            <Flex w="full" marginTop={20} borderStyle="solid" borderColor="gray.100" borderTopWidth={1} paddingTop={5}>
       
            <HStack w="full" h="full" spacing={2} justifyContent="flex-end">
                
                {/* <HStack alignItems="center" gap={2}>
              
                  <Box width="80px" overflow="hidden" borderRadius="full">
                    <Image src={events?.contributeur?.avatar} w="100%" fit="cover" borderRadius="full" alt="image" fallbackSrc='/placeholder_org.jpeg' />
                  </Box>
                <Box w="full">
                  <Flex direction="column" justify="space-around"  gap={2} alignItems="flex-start">
                    <Heading size="sm">{events?.contributeur?.firstname} {events?.contributeur?.lastname}</Heading>
                    <Badge display="inline" maxW={120} textAlign="center" fontSize={11} colorScheme="gray" p={2} borderRadius={50} >Contributeur</Badge>

                  </Flex>
                </Box>
                </HStack> */}
                <Socialshare/>
              </HStack>
              
              </Flex>
              
        </VStack>
        <VStack w={{ base: '100%', md: "25%" }} h="full" p={10} spacing={10} alignItems="flex-start" bg="white">


</VStack>
    </Flex>

</Container>
  )
}

export default OneAgendaTemplate;