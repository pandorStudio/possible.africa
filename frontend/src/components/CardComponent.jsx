import { Box, Card, CardBody, Flex, Heading, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { CalendarIcon, CountryIcon, MapIcon, OrganisationsIcon, TypeIcon, WorkIcon } from '../assets/icons';


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded, link, postType, type, pays, dateDebut, dateFin, company,location}) {
const card = (<Card
    direction={{ base: 'column', md: 'row' }}
    overflow='hidden'
    minW={{base: "sm", md: "2xl"}}
    w={{base: "sm", md: "2xl"}}
    maxW={{ base: 'sm', md: '2xl' }}
    height={{ base: '', md: '130px' }}
    boxShadow="none"
    _hover={{ cursor: "pointer" }}
    borderRadius={0}
    alignItems={{ base: 'flex-start', md: 'center'}}
    justifyContent={{ base: 'flex-start', md: 'flex-start'}}
    zIndex={-1}
>
  <Skeleton isLoaded={isLoaded} >

    <Box  w={100} h="100px" hideBelow="md" >

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
    
    <CardBody p={{ base: '0', md: '15px' }}>

      <Heading paddingBottom={2} fontSize='lg' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>

      <Text noOfLines={[1,2]}>
        {description}
      </Text>
     {postType === "Organisation" &&  (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="sm">{pays}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><TypeIcon/> <Text fontSize="sm">{type}</Text></Flex>
      </Flex>
      </>)} 
     {postType === "Interview" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="sm">{pays}</Text></Flex>
      </Flex>
     
     </>)} 
     {postType === "Actualités" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="sm">{pays}</Text></Flex>
      </Flex>
     </>)} 
     {postType === "Agenda" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CalendarIcon /><Text>{dateDebut}</Text> - <Text>{dateFin}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon/> <Text fontSize="sm">{pays}</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><TypeIcon/> <Text fontSize="sm">{type}</Text></Flex>

      </Flex>
  </>)} 
     {postType === "Opportunités" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="sm">{pays}</Text></Flex>
     <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><TypeIcon/> <Text fontSize="sm">{type}</Text></Flex>

      </Flex>
     </>)} 
     {postType === "Emplois" && <><Flex gap={5} marginTop={1.5} marginLeft={-1}>
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