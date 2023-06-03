import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetOpportunitiesQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";

function Opportunites() {

    const {
        data: opportunities = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetOpportunitiesQuery();
    let content;

    // const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);
let isLoaded = true;


    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = opportunities.map(opportunity => {
            return (
                <CardComponent postType="Opportunités" key={opportunity._id} title={opportunity.title} description={parse(opportunity.description.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={opportunity?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + opportunity.id} type={opportunity?.opportunity_type?.name}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
      <Container maxW="container.lg" p={0}>


<VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">
              {content}
          </VStack>


      </Container>
  )
}

export default Opportunites