import {  Container, Heading, Text, VStack } from "@chakra-ui/react";
import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";
import CardComponent from '../components/CardComponent';
import { Box, Spinner, Flex } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

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

  if (isLoading || isFetching) {
    content = <Container maxW="container.lg" p={0} bg="gray.50">
      <VStack w="full" h="full" py={10} px={20} spacing={10} alignItems="center">

      <Spinner/>
      </VStack>
      </Container>;
    return content
  } else if(isSuccess) {
     content = organisations.map(organisation => {
      return (
        <CardComponent key={organisation._id} title={organisation.name} description={organisation.description} imgUrl={Image}/>

      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
return (
<Container maxW="container.lg" p={0} bg="gray.50">


      <VStack w="full" h="full" py={10} px={20} spacing={10} alignItems="flex-start">
                <Heading size="xl">Organisations</Heading>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>
                <Text>Hello</Text>

                {content}
            </VStack>
  

</Container>

)
}

export default Organisations