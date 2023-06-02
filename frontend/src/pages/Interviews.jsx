import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetPostCategoriesQuery, useGetPostsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import Image from "../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg";
import { useState } from "react";


function Interviews() {
    const {
        data: interviewCategories = [],
    } = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/podcast"}]});
    const {
        data: interviews = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${interviewCategories[0]?._id}`}]});
    let content;

    let isLoaded = true;

//     const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);

    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = interviews.map(interview => {
            return (
                <CardComponent postType="Interview" key={interview._id} title={interview.title} description={parse(interview.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={interview.image} isLoaded={isLoaded} link={"/interviews/" + interview.slug} pays="Pays"/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

        return (
    <Container maxW="container.lg" p={0}>


<VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">              {/* <Heading size="xl">Interviews</Heading> */}
        {content}
          </VStack>


</Container>
    
  )
}

export default Interviews