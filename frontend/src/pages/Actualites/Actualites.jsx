import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../../components/CardComponent.jsx";
import { useGetPostCategoriesQuery, useGetPostsQuery } from "../../features/api/apiSlice.js";
import CustomContainer from "../../utils/CustomContainer.jsx";
import { ParseSlice } from "../../utils/htmlParser.jsx";

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
    // const [isLoaded, setIsLoaded] = useState(false);

    // setInterval(() => {
    //   setIsLoaded(true)
    // }, 1000);

    let isLoaded = true;

    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = allNews.map(news => {
            return (
                <CardComponent postType="Actualités" key={news._id} title={news.title} description={ParseSlice(news.content)} imgUrl={news.image} isLoaded={isLoaded} link={"/actualites/" + news.slug} pays="Pays"/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
    <CustomContainer content={content}/>

  )
}

export default Actualites