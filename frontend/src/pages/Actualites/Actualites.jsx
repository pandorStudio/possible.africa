// eslint-disable-next-line no-unused-vars
import { Box, Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../../components/CardComponent.jsx";
import {
  useGetPostCategoriesQuery,
  useGetPostsQuery,
} from "../../features/api/apiSlice.js";
import CustomContainer from "../../utils/CustomContainer.jsx";
import { ParseSlice } from "../../utils/htmlParser.jsx";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../utils/NoData.jsx";
import CenteredContainer from "../../utils/CenteredContainer.jsx";

function Actualites() {
  const [page, setPage] = useState(1);
  const [infiniteScrollIsFetching] =
    useState(false);
  const { data: interviewCategories = [] } = useGetPostCategoriesQuery({
    limit: 10,
    page: page,
    fields: [],
    eq: [{ field: "slug", value: "/actualites" }],
  });

  const {
    data: allNews = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetPostsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [{ field: "categorie", value: `${interviewCategories[0]?._id}` }, { field: "status", value: "published" }],
  });
  let content;


  let isLoaded = true;

  if (allNews?.length === 0) {
    return (
    <NoData/>
    );
  }

  if (isLoading ) {
    return <CenteredContainer><Spinner/></CenteredContainer>
}

  if (allNews.length) {
    content = (
      <InfiniteScroll
        dataLength={allNews.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={true}
        loader={
          <Box
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner as="div" mx="45%" mt={10} />
          </Box>
        }
       
      >
        {allNews && allNews.map((news, index) => {
          const instanceCard = (
            <CardComponent
              postType="Actualités"
              key={news._id}
              title={news.title}
              description={ParseSlice(news.content)}
              imgUrl={news.image}
              isLoaded={isLoaded}
              link={"/actualites/" + news.slug}
              country={news.country?.translations?.fra?.common || ""}
              hideMeBellow="md"
            />
          );

          return (
            <>
              {instanceCard}
              {(index === allNews.length - 1 && infiniteScrollIsFetching) ?? (
               <CustomContainer>
                 <Spinner />
               </CustomContainer>

              )}
            </>
          );
        })}
      </InfiniteScroll>
    );
  }
  if (isError) {
    console.log({ error });
    return <Box>{error.status}</Box>;
  }

  return <CustomContainer content={content} />;
}

export default Actualites;
