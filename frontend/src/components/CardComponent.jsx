import { Box, Card, CardBody, Flex, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { CalendarIcon, CategoryIcon, CountryIcon, MapIcon, MoneyIcon, OrganisationsIcon, TargetIcon, TypeIcon, WorkIcon } from '../assets/icons';


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded, link, postType, type, country, dateDebut, dateFin, company,location}) {
const card = (<Card
    direction="row"
    spacing={{ base: '5', md:'1' }}
    overflow='hidden'
    w={{base: "100%", md: "2xl"}}
    height={{ base: '100%', md: '130px' }}
    boxShadow="none"
    _hover={{ cursor: "pointer" }}
    borderRadius={0}
    alignItems={{ base: 'center', md: 'center'}}
    justifyContent={{ base: 'flex-start', md: 'flex-start'}}
    zIndex={-1}    
>
  <Skeleton isLoaded={isLoaded} >

    <Box  w={{base:70, md: 100}} h={{base: "60px", md:"100%"}} alignItems="center" justifyContent="center" alignSelf="center">

      <Image
          fit ='cover'
          w={{base: "60px",md:"80px"}}
          h={{base: "60px",md:"80px"}}
          src={imgUrl}
          alt={imgUrl}
          borderRadius={8}
          fallbackSrc='/placeholder_org.jpeg'
          borderStyle="solid" borderColor="gray.100" borderWidth={1}
          
      />
    </Box>
  </Skeleton>

  <Stack>
    
    <CardBody display='flex' flexDir="column" px={{ base: '0', md: '0' }} py="5px" alignItems="flex-start" justifyContent="flex-start" h={{base: "100%", md:"100%"}} gap={1}>

      <Text as="h2" fontSize='md' fontWeight="600" color='gray.700' _hover={{ textDecoration: "underline" }} noOfLines={[2]}>{title}</Text>

      <Text noOfLines={[2]} color='gray.500'>
        {description}
      </Text>
     {postType === "Organisation" &&  (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1} >
      {country && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon/> <Text fontSize="xs">{country}</Text></Flex>}
      {type && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CategoryIcon/> <Text fontSize="xs">{type}</Text></Flex>}
      </Flex>
      </>)} 
     {postType === "Interview" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
      {country && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="xs">{country}</Text></Flex>}
      </Flex>
     
     </>)} 
     {postType === "Actualités" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
      {country && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CountryIcon /> <Text fontSize="xs">{country}</Text></Flex>}
      </Flex>
     </>)} 
     {postType === "Agenda" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1} hideBelow="md">
      {dateDebut || dateFin && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><CalendarIcon /><Text>{dateDebut}</Text> - <Text>{dateFin}</Text></Flex>}
     {country && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MapIcon/> <Text fontSize="xs">{country}</Text></Flex>}
     {type && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><TypeIcon/> <Text fontSize="xs">{type}</Text></Flex>}

      </Flex>
  </>)} 
     {postType === "Opportunités" && (<>
      <Flex gap={5} marginTop={1.5} marginLeft={-1}>
      {country && (<><Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><TargetIcon /> <Text fontSize="xs">{country}</Text></Flex></>)}
     {type && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MoneyIcon/> <Text fontSize="xs">{type}</Text></Flex>}

      </Flex>
     </>)} 
     {postType === "Emplois" && <><Flex gap={5} marginTop={1.5} marginLeft={-1}>
      {company && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><OrganisationsIcon /> <Text fontSize="xs">{company}</Text></Flex>}
     {type && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><WorkIcon/> <Text fontSize="xs">{type}</Text></Flex>}
     {location && <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><MapIcon/> <Text fontSize="xs">{location}</Text></Flex>}
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