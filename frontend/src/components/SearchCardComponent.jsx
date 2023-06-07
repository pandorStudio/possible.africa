import { Card, CardBody, Heading, Stack, Image, Text, Skeleton, SkeletonText, Box, Flex, Badge, Tag } from '@chakra-ui/react'
import {Link} from "react-router-dom";
import { CalendarIcon, CountryIcon, LawIcon, MapIcon, NewspaperIcon, OrganisationsIcon, PodcastIcon, TypeIcon, WorkIcon } from '../assets/icons';


// eslint-disable-next-line react/prop-types
function SearchCardComponent({title, description, imgUrl, isLoaded, link, postType, type, pays, dateDebut, dateFin, company,location}) {
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

<Text noOfLines={[1,2]} pb={2}>
  {description}
</Text>
      
     {postType === "Organisation" &&  (<>
      <Tag fontWeight={600} fontSize={12}>Organisation</Tag>
      </>)} 
     {postType === "Interview" && (<>
      <Tag fontWeight={600} fontSize={12}>Interview</Tag>

     
     </>)} 
     {postType === "Actualités" && (<>
      <Tag fontWeight={600} fontSize={12}>Actualités</Tag>

     </>)} 
     {postType === "Agenda" && (<>
      <Tag fontWeight={600} fontSize={12}>Agenda</Tag>

  </>)} 
     {postType === "Opportunités" && (<>
      <Tag fontWeight={600} fontSize={12}>Opportunités</Tag>

     </>)} 
     {postType === "Emplois" && <>
     <Tag fontWeight={600} fontSize={12}>Emplois</Tag>

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

export default SearchCardComponent;