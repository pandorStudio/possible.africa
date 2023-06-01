import {
    Box,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack, Image,
    SimpleGrid, Spacer,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react"
import {useGetPostCategoriesQuery, useGetPostsQuery} from "../../features/api/apiSlice.js";
import CardComponent from "../../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";

function OneActualite() {
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
    // const [isLoaded, setIsLoaded] = useState(false);

    // setInterval(() => {
    //   setIsLoaded(true)
    // }, 1000);

    let isLoaded = true;

    if (isLoading || isFetching) {
        content = allNews.map(news => {
            return (
                <CardComponent key={news._id} title={news.title} description={parse(news.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={news.image} isLoaded={!isLoaded}/>
            )
        })
    } else if(isSuccess) {
        content = allNews.map(news => {
            return (
                <CardComponent key={news._id} title={news.title} description={parse(news.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={news.image} isLoaded={isLoaded}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

    return (
        <Container maxW="container.lg" p={0}>
            <Grid templateColumns="repeat(6, 1fr)" gap={20}>
                <GridItem colSpan={4} p={0}>
                    <Flex>
                        <HStack w="full" h="full" py={5} px={10} spacing={5} alignItems="flex-start">
                            <Box>
                                <Image src="https://via.placeholder.com/65x65" borderRadius="100%" alt="image" />
                            </Box>
                            <Box w="full" bg="red.300">
                                <Flex direction="column" justify="space-around">
                                    <Heading size="sm">Jeremy Alexander</Heading>
                                    <Flex justify="flex-start">
                                        <Box fontSize={15} mr={4}>12 Mai</Box>
                                        <Box fontSize={15}>5 min de lecture</Box>
                                    </Flex>
                                </Flex>
                            </Box>
                        </HStack>
                    </Flex>
                </GridItem>
                <GridItem colSpan={2} p={5} borderLeft="1px solid white-gray" h="100vh">
                    <Heading size="sm">Plus sur possible</Heading>
                    <VStack spacing={5} mt={5}>
                        <Box w="full" h="100px">
                            <Flex direction="column" justify="space-around">
                                <HStack spacing={5}>
                                    <Image src="https://via.placeholder.com/30x30" borderRadius="100%" alt="image" />
                                    <Text fontSize={15} color="gray.500" fontWeight="bold">Yann Marie</Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </VStack>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default OneActualite;