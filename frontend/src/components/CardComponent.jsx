import { Card, CardBody, Heading, Stack, Image, Text, Skeleton, SkeletonText, Box, Flex, Badge } from '@chakra-ui/react'
import {Link} from "react-router-dom";
import { CalendarIcon, LawIcon, MapIcon, NewspaperIcon, OrganisationsIcon, PodcastIcon, WorkIcon } from '../assets/icons';


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded, link, postType, type, pays, dateDebut, dateFin, company,location}) {
const card = (<Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    w={{base: "100%", sm: "2xl"}}
    maxW={{ base: '100%', sm: '2xl' }}
    height={{ base: '130px', sm: '130px' }}
    boxShadow="none"
    _hover={{ cursor: "pointer" }}
    borderRadius={0}

    alignItems="center"
>
  <Skeleton isLoaded={isLoaded} >

    <Box  w={100} h="100px" >

      <Image
          fit ='cover'
          w="100%"
          h="100px"
          src={imgUrl}
          alt={imgUrl}
          borderRadius={8}
          fallbackSrc='/placeholder_org.jpeg'
          borderStyle="solid" borderColor="gray.100" borderWidth={1}
      />
    </Box>
  </Skeleton>

  <Stack>
    
    <CardBody>

      <Heading paddingBottom={2} fontSize='lg' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>

      <Text noOfLines={[1,2]}>
        {description}
      </Text>
     {postType === "Organisation" &&  (<><Badge display="inline" textAlign="center" colorScheme="red" px={2} py={1} borderRadius={50}>{type}</Badge></>)} 
     {postType === "Interview" && (<><Badge display="inline" textAlign="center" colorScheme="green" px={2} py={1} borderRadius={50}>{pays}</Badge></>)} 
     {postType === "Actualités" && (<><Badge display="inline" textAlign="center" colorScheme="green" px={2} py={1} borderRadius={50}>{pays}</Badge></>)} 
     {postType === "Agenda" && (<><Flex gap={2} fontWeight={600} fontSize={14}>
      <Text>{dateDebut}</Text> - <Text>{dateFin}</Text> | <Text>{pays}</Text>
      </Flex></>)} 
     {postType === "Opportunités" && (<><Flex gap={2} fontWeight={600} fontSize={14}>
      {/* <Text>{dateDebut}</Text> - <Text>{dateFin}</Text>  */}
      <Badge display="inline" textAlign="center" colorScheme="green" px={2} py={1} borderRadius={50} marginTop={2}>{type}</Badge>
      </Flex></>)} 
     {postType === "Emplois" && <><Flex gap={5} marginTop={1.5}>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><OrganisationsIcon /> <Text fontSize="sm">{company}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><WorkIcon/> <Text fontSize="sm">{type}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MapIcon/> <Text fontSize="sm">{location}</Text></Flex>
      </Flex> 
     </>} 





    </CardBody>

  </Stack>
</Card>);
  if(link) {
    return (
        <Link to={link}>
          {card}
        </Link>
    );
  }
  return card;
}

export default CardComponent;