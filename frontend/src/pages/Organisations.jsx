import {  Container, Heading, Text, VStack } from "@chakra-ui/react";
import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";
import CardComponent from '../components/CardComponent';
import { Box, Spinner, HStack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useState } from "react";

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
const [isLoaded, setIsLoaded] = useState(false);

setInterval(() => {
  setIsLoaded(true)
}, 2000);

  if (isLoading || isFetching) {

    content = organisations.map(organisation => {
      return (
        <CardComponent key={organisation._id} title={organisation.name} description={organisation.description} imgUrl={organisation.logo} isLoaded={isLoaded}/>
      )
    })  } else if(isSuccess) {

     content = organisations.map(organisation => {
      return (
        <CardComponent key={organisation._id} title={organisation.name} description={organisation.description} imgUrl={organisation.logo} isLoaded={isLoaded}/>
      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
return (
<Container maxW="container.lg" p={0} >


      <VStack w="full" h="full" py={5} px={10} spacing={5} alignItems="flex-start">
                {/* <Heading size="xl">Organisations</Heading> */}
                {content}
            </VStack>
  

</Container>

)
}

export default Organisations