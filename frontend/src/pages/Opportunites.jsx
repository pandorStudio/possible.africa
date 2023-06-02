import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetPostCategoriesQuery, useGetPostsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";

function Opportunites() {

    const {
        data: interviewCategories = [],
    } = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/opportunites"}]});
    const {
        data: opportunities = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${interviewCategories[0]?._id}`}]});
    let content;

    // const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);
let isLoaded = true;


    if (isLoading || isFetching) {
        content = opportunities.map(opportunity => {
            return (
                <CardComponent postType="Opportunités" key={opportunity._id} title={opportunity.title} description={parse(opportunity.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={opportunity.image} isLoaded={!isLoaded} link={"/opportunites/:" + opportunity.slug}/>
            )
        })
    } else if(isSuccess) {
        content = opportunities.map(opportunity => {
            return (
                <CardComponent postType="Opportunités" key={opportunity._id} title={opportunity.title} description={parse(opportunity.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={opportunity.image} isLoaded={isLoaded} link={"/opportunites/:" + opportunity.slug}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
      <Container maxW="container.lg" p={0}>


<VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">              {/* <Heading size="xl">Opportunités de financement</Heading> */}
              {content}
          </VStack>


      </Container>
  )
}

export default Opportunites