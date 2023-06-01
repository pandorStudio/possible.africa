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
import FacebookCustomIcon from "../../components/icons/FacebookCustomIcon.jsx";
import BookmarkSolidCustomIcon from "../../components/icons/BookmarkSolidCustomIcon.jsx";
import BookmarkRegularCustomIcon from "../../components/icons/BookmarkRegularCustomIcon.jsx";
import LinkedinCustomIcon from "../../components/icons/LinkedinCustomIcon.jsx";
import LinkSolidCustomIcon from "../../components/icons/LinkSolidCustomIcon.jsx";
import PlusSolidCustomIcon from "../../components/icons/PlusSolidCustomIcon.jsx";
import TwitterCustomIcon from "../../components/icons/TwitterCustomIcon.jsx";
import ArrowLeftSolidCustomIcon from "../../components/icons/ArrowLeftSolidCustomIcon.jsx";
import OneElementPage from "../../components/OneElementPage.jsx";

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
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

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
        <OneElementPage iconSx={iconSx}/>
    );
}

export default OneActualite;