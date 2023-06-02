import { Card, CardBody, Heading, Stack, Image, Text, Skeleton, SkeletonText, Box, Flex } from '@chakra-ui/react'
import {Link} from "react-router-dom";
import { CalendarIcon, LawIcon, NewspaperIcon, OrganisationsIcon, PodcastIcon, WorkIcon } from '../assets/icons';


// eslint-disable-next-line react/prop-types
function CardComponent({title, description, imgUrl, isLoaded, link, postType}) {
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

    <Box  w={100} h="100px">

      <Image
          fit ='cover'
          w="100%"
          h="100px"
          src={imgUrl}
          alt={imgUrl}
          borderRadius={8}
      />
    </Box>
  </Skeleton>

  <Stack>
    
    <CardBody>

      <Heading paddingBottom={2} size='md' color='teal.500' _hover={{ textDecoration: "underline" }}>{title}</Heading>

      <Text noOfLines={[1,2]}>
        {description}
      </Text>
     {postType === "Organisation" && <OrganisationsIcon/>} 
     {postType === "Interview" && <PodcastIcon/>} 
     {postType === "Actualités" && <NewspaperIcon/>} 
     {postType === "Agenda" && <CalendarIcon/>} 
     {postType === "Opportunités" && <LawIcon/>} 
     {postType === "Emplois" && <><Flex gap={5} marginTop={1.5}>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><OrganisationsIcon /> <Text fontSize="sm">Pandore & Co</Text></Flex>
      <Flex alignItems="center" justifyContent="center" gap={1} color="gray.600"><WorkIcon/> <Text fontSize="sm">CDI</Text></Flex>
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