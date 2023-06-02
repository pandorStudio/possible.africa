import {  Container, Heading, Text, VStack } from "@chakra-ui/react";
import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";
import CardComponent from '../components/CardComponent';
import { Box, Spinner, HStack } from '@chakra-ui/react'


function Organisations() {
  const {
    data: organisations = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOrganisationsQuery();
  let content;
let isLoaded = true;


  if (isLoading || isFetching) {

   return <VStack><Spinner/></VStack>
   } else if(isSuccess) {

     content = organisations.map(organisation => {
      return (
        <CardComponent postType="Organisation" key={organisation._id} title={organisation.name} description={organisation.description} imgUrl={organisation.logo} isLoaded={isLoaded} link={"/organisations/" + organisation.id} type={organisation?.type?.name}/>
      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
return (
<Container maxW="container.lg" p={0} >


      <VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">
                {content}
            </VStack>
  

</Container>

)
}

export default Organisations