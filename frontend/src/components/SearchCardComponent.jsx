/* eslint-disable react/prop-types */

import { Box, Card, CardBody, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { Link } from "react-router-dom";


function SearchCardComponent({title, description, imgUrl, isLoaded, link, postType}) {
const card = (<Card
  direction="row"
  spacing={{ base: '5', md:'1' }}
  overflow='hidden'
  w={{base: "100%", md: "2xl"}}
  height={{ base: '130px', md: '130px' }}
  boxShadow="none"
  _hover={{ cursor: "pointer" }}
  borderRadius={0}
  alignItems={{ base: 'center', md: 'center'}}
  justifyContent={{ base: 'flex-start', md: 'flex-start'}}
  zIndex={-1}    
>
  <Skeleton isLoaded={isLoaded} >

    <Box  w={{base:70, md: 100}} h={{base: "60px", md:"100%"}} alignItems="center" justifyContent="center" alignSelf="center" >

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
    
    <CardBody display='flex' flexDir="column" px={{ base: '0', md: '0' }} alignItems="flex-start" justifyContent="flex-start" h={{base: "100%", md:"100%"}} gap={1}>

    <Text as="h2" fontSize='md' fontWeight="600" color='gray.700' _hover={{ textDecoration: "underline" }} noOfLines={[2]}>{title}</Text>

<Text noOfLines={[2]} color='gray.500'>
  {description}
</Text>
      
     {postType === "Organisation" &&  (<>
      <Text fontSize="xs">Organisation</Text>

      
      </>)} 
     {postType === "Interview" && (<>
      
      <Text fontSize="xs">Interview</Text>

     
     </>)} 
     {postType === "Actualités" && (<>
      <Text fontSize="xs">Actualités</Text>

     </>)} 
     {postType === "Agenda" && (<>
      <Text fontSize="xs">Agenda</Text>

      

  </>)} 
     {postType === "Opportunités" && (<>
      <Text fontSize="xs">Opportunités</Text>

      

     </>)} 
     {postType === "Emplois" && <>
     <Text fontSize="xs">Emplois</Text>

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