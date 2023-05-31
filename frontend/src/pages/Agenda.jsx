import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetPostCategoriesQuery, useGetPostsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";

function Agenda() {

    const {
        data: interviewCategories = [],
    } = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/agenda"}]});
    const {
        data: diaries = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${interviewCategories[0]?._id}`}]});
    let content;

//     const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);

let isLoaded = true;

    if (isLoading || isFetching) {
        content = diaries.map(diary => {
            return (
                <CardComponent key={diary._id} title={diary.title} description={parse(diary.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={diary.image} isLoaded={!isLoaded}/>
            )
        })
    } else if(isSuccess) {
        content = diaries.map(diary => {
            return (
                <CardComponent key={diary._id} title={diary.title} description={parse(diary.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={diary.image} isLoaded={isLoaded}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
      <Container maxW="container.lg" p={0}>


<VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">              {/* <Heading size="xl">Agendas</Heading> */}
              {content}
          </VStack>


      </Container>
  )
}

export default Agenda