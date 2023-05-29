import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";
import CardComponent from '../components/CardComponent';
import { Box, Spinner, Flex } from '@chakra-ui/react'


function Interviews() {

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
        content = <Spinner/>;
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
    <Flex>{content}</Flex>
  )
}

export default Interviews