import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetPostCategoriesQuery, useGetPostsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";

function Actualites() {
    const {
        data: interviewCategories = [],
    } = useGetPostCategoriesQuery({limit: 10, page: 1, fields: [], eq: [{field: "slug", value: "/actualites"}]});
    const {
        data: allNews = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetPostsQuery({limit: 10, page: 1, fields: [], eq: [{field: "categorie", value: `${interviewCategories[0]?._id}`}]});
    let content;
    if (isLoading || isFetching) {

        content = <Container maxW="container.lg" p={0} >
            <VStack w="full" h="full" py={10} px={10} spacing={10} alignItems="center">
                <HStack w="full" alignItems="flex-start">
                    {/* <Heading size="xl">Actualités</Heading> */}
                </HStack>
                <Spinner/>
            </VStack>
        </Container>;
        return content
    } else if(isSuccess) {
        content = allNews.map(news => {
            return (
                <CardComponent key={news._id} title={news.title} description={parse(news.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={news.image}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
      <Container maxW="container.lg" p={0}>


<VStack w="full" h="full" py={5} px={10} spacing={5} alignItems="flex-start">
    {/* <Heading size="xl">Actualités</Heading> */}
              {content}
          </VStack>


      </Container>
  )
}

export default Actualites