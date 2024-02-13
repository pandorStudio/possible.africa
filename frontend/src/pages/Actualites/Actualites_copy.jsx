// eslint-disable-next-line no-unused-vars
import {
  Box,
  Spinner,
  Text,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
} from "@chakra-ui/react";
import CardComponent from "../../components/CardComponent.jsx";
import {
  useGetAirtableAllPostsQuery,
  useGetAirtableEngPostsQuery,
  useGetAirtableFrPostsQuery,
  useGetPostCategoriesQuery,
  useGetPostsQuery,
} from "../../features/api/apiSlice.js";
import CustomContainer from "../../utils/CustomContainer.jsx";
import { ParseSlice } from "../../utils/htmlParser.jsx";
import { forwardRef, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../utils/NoData.jsx";
import CenteredContainer from "../../utils/CenteredContainer.jsx";
import { NoMoreDataToLoad } from "../../components/noMoreDataToLoad.jsx";

function ActualitesCopy() {
  const [page, setPage] = useState(1);
  const [engPage, setEngPage] = useState(1);
  const [frPage, setFrPage] = useState(1);
  // const [language, setLanguage] = useState([
  //   {
  //     label: "Français",
  //     content: "Perhaps the greatest dish ever invented.",
  //     status: true,
  //     index: 0,
  //   },
  //   {
  //     label: "English",
  //     content:
  //       "Perhaps the surest dish ever invented but fills the stomach more than rice.",
  //     status: false,
  //     index: 1,
  //   },
  // ]);
  const [languageChanging, setLanguageChanging] = useState(false);
  const [language, setLanguage] = useState("fr");
  const [infiniteScrollIsFetching] = useState(false);
  const { data: interviewCategories = [] } = useGetPostCategoriesQuery({
    limit: 10,
    page: page,
    fields: [],
    eq: [{ field: "slug", value: "/actualites" }],
  });

  // Chargement de tous les données qui viennent de la ase de données MongoDb
  const {
    data: allNews = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [
      { field: "categorie", value: `${interviewCategories[0]?._id}` },
      { field: "status", value: "published" },
    ],
  });
  const {
    data: allNewsLength,
    isLoading: allNewsLengthIsLoading,
    isFetching: allNewsLengthIsFetching,
    refetch: refechAllNewsLength,
  } = useGetPostsQuery({
    fields: [],
    eq: [
      { field: "categorie", value: `${interviewCategories[0]?._id}` },
      { field: "status", value: "published" },
    ],
  });

  // Chargement des données eng qui viennent de la base de données AirTable
  const {
    data: allAirtableAllNews = [],
    isLoading: allAirtableAllNewsIsLoading,
    isFetching: allAirtableAllNewsIsFetching,
    isError: allAirtableAllNewsIsError,
    isSuccess: allAirtableAllNewsIsSuccess,
    error: allAirtableAllNewsError,
    refetch: allAirtableAllNewsRefetch,
  } = useGetAirtableEngPostsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [],
  });
  const {
    data: allAirtableAllNewsLength,
    isLoading: allAirtableAllNewsLengthIsLoading,
    isFetching: allAirtableAllNewsLengthIsFetching,
    refetch: allAirtableAllNewsLengthRefetch,
  } = useGetAirtableEngPostsQuery({
    fields: [],
    eq: [],
  });

  // Chargement de tous les données qui viennent de la ase de données MongoDb
  const {
    data: FrAirtableFrNews = [],
    isLoading: FrAirtableFrNewsIsLoading,
    isFetching: FrAirtableFrNewsIsFetching,
    isError: FrAirtableFrNewsIsError,
    isSuccess: FrAirtableFrNewsIsSuccess,
    error: FrAirtableFrNewsError,
    refetch: FrAirtableFrNewsRefetch,
  } = useGetAirtableFrPostsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [],
  });
  const {
    data: FrAirtableFrNewsLength,
    isLoading: FrAirtableFrNewsLengthIsLoading,
    isFetching: FrAirtableFrNewsLengthIsFetching,
    refetch: FrAirtableFrNewsLengthRefetch,
  } = useGetAirtableFrPostsQuery({
    fields: [],
    eq: [],
  });

  useEffect(() => {
    // const allNewsLengthInterval = setInterval(() => {
    //   refechAllNewsLength();
    //   refetch();
    // }, 30000);
    // if (allNewsLengthIsFetching) {
    //   console.log("Loading...");
    // }
    // if (allAirtableAllNews.length) {
    //   console.log(allAirtableAllNews);
    // }
    // console.log(allNewsLength);
    // return () => {
    //   // return clearInterval(allNewsLengthInterval);
    // };
  }, [
    // allNewsLengthIsFetching,
    // isFetching,
    // allAirtableAllNewsLengthIsFetching,
    // allAirtableAllNewsIsFetching,
    language,
  ]);

  function handleLanguageTabClick() {
    setLanguage((s) => {
      return [[...s[0]], [...s[1]]];
    });
  }

  // Changement de langues
  function DataTabs({ data }) {
    return (
      <Tabs>
        <TabList>
          {data.map((el, index) => {
            return (
              <Tab key={index} onClick={handleLanguageTabClick}>
                {el.label}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          {data.index === 0 && data.status ? (
            <CustomContainer content={airtableFrContent} />
          ) : (
            <CustomContainer content={airtableEngContent} />
          )}
        </TabPanels>
      </Tabs>
    );
  }

  let content;
  let airtableEngContent;
  let airtableFrContent;

  let isLoaded = true;

  if (allAirtableAllNews?.length === 0) {
    if (
      FrAirtableFrNewsIsLoading ||
      FrAirtableFrNewsIsFetching ||
      languageChanging
    ) {
      return (
        <Box
          as="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={15}
        >
          <Spinner />
        </Box>
      );
    }
    return <NoData />;
  }

  if (allNews.length) {
    content = (
      <InfiniteScroll
        dataLength={allNews.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={allNews.length === allNewsLength?.length ? false : true}
        loader={
          <Box
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner as="div" mx="45%" mt={10} />
            {/* <p>{JSON.stringify(allNewsLength?)}</p> */}
          </Box>
        }
        endMessage={<NoMoreDataToLoad />}
      >
        {allNews &&
          allNews.map((news, index) => {
            const createdAt = new Date(news?.createdAt);
            // transform date to french format
            const date =
              createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              "/" +
              createdAt.getFullYear();
            const instanceCard = (
              <CardComponent
                postType="Actualités"
                key={news?._id}
                title={news?.title}
                description={news?.content ? ParseSlice(news?.content) : null}
                imgUrl={news?.image}
                isLoaded={isLoaded}
                link={"/actualites/" + news?.slug}
                countries={news?.countries?.length > 0 ? news?.countries : []}
                authors={news?.authors?.length > 0 ? news?.authors : []}
                editors={news?.editors?.length > 0 ? news?.editors : []}
                hideMeBellow="md"
                organisations={
                  news?.organisations?.length > 0 ? news?.organisations : []
                }
                labels={news?.labels?.length > 0 ? news?.labels : []}
                createdAt={date}
                source={news?.source}
                language={news?.publication_language || "Français"}
              />
            );

            // if (index === allNews.length - 1) {
            //   setContinueDataLoading(false);
            // }

            return (
              <>
                {instanceCard}
                {/* {(index === allNews.length - 1 && infiniteScrollIsFetching) ?? (
                  <Box
                    as="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={15}
                  >
                    <Spinner />
                  </Box>
                )} */}
              </>
            );
          })}
      </InfiniteScroll>
    );
  }

  if (allAirtableAllNews.length) {
    airtableEngContent = (
      <InfiniteScroll
        dataLength={allAirtableAllNews.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={
          allAirtableAllNews.length === allAirtableAllNewsLength?.length
            ? false
            : true
        }
        loader={
          <Box
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner as="div" mx="45%" mt={10} />
            {/* <p>{JSON.stringify(allNewsLength?)}</p> */}
          </Box>
        }
        endMessage={<NoMoreDataToLoad />}
      >
        {allAirtableAllNews &&
          allAirtableAllNews.map((news, index) => {
            const createdAt = new Date(news?.publication_date);
            // transform date to french format
            const date =
              createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              "/" +
              createdAt.getFullYear();
            const instanceCard = (
              <CardComponent
                postType="Actualités"
                key={news?.title}
                title={news?.title}
                imgUrl={news?.logo?.url}
                isLoaded={isLoaded}
                link={news?.link}
                // countries={news?.countries?.length > 0 ? news?.countries : []}
                // authors={news?.authors?.length > 0 ? news?.authors : []}
                editors={news?.media}
                hideMeBellow="md"
                // organisations={
                //   news?.organisations?.length > 0 ? news?.organisations : []
                // }
                // labels={news?.labels?.length > 0 ? news?.labels : []}
                createdAt={date}
                source={news?.link}
                language={news?.language == "ENG" ? "English" : "French"}
              />
            );

            // if (index === allNews.length - 1) {
            //   setContinueDataLoading(false);
            // }

            return (
              <>
                {instanceCard}
                {/* {(index === allNews.length - 1 && infiniteScrollIsFetching) ?? (
                  <Box
                    as="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={15}
                  >
                    <Spinner />
                  </Box>
                )} */}
              </>
            );
          })}
      </InfiniteScroll>
    );
  }

  if (FrAirtableFrNews.length) {
    airtableFrContent = (
      <InfiniteScroll
        dataLength={FrAirtableFrNews.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={
          FrAirtableFrNews.length === FrAirtableFrNewsLength?.length
            ? false
            : true
        }
        loader={
          <Box
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner as="div" mx="45%" mt={10} />
            {/* <p>{JSON.stringify(allNewsLength?)}</p> */}
          </Box>
        }
        endMessage={<NoMoreDataToLoad />}
      >
        {FrAirtableFrNews &&
          FrAirtableFrNews.map((news, index) => {
            const createdAt = new Date(news?.publication_date);
            // transform date to french format
            const date =
              createdAt.getDate() +
              "/" +
              (createdAt.getMonth() + 1) +
              "/" +
              createdAt.getFullYear();
            const instanceCard = (
              <CardComponent
                postType="Actualités"
                key={news?.title}
                title={news?.title}
                imgUrl={news?.logo?.url}
                isLoaded={isLoaded}
                link={news?.link}
                // countries={news?.countries?.length > 0 ? news?.countries : []}
                // authors={news?.authors?.length > 0 ? news?.authors : []}
                editors={news?.media}
                hideMeBellow="md"
                // organisations={
                //   news?.organisations?.length > 0 ? news?.organisations : []
                // }
                // labels={news?.labels?.length > 0 ? news?.labels : []}
                createdAt={date}
                source={news?.link}
                language={news?.language == "ENG" ? "English" : "French"}
              />
            );

            // if (index === allNews.length - 1) {
            //   setContinueDataLoading(false);
            // }

            return (
              <>
                {instanceCard}
                {/* {(index === allNews.length - 1 && infiniteScrollIsFetching) ?? (
                  <Box
                    as="div"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p={15}
                  >
                    <Spinner />
                  </Box>
                )} */}
              </>
            );
          })}
      </InfiniteScroll>
    );
  }

  if (allAirtableAllNewsIsError) {
    console.log({ allAirtableAllNewsError });
    return <Box>{allAirtableAllNewsError.status}</Box>;
  }

  return (
    <>
      <Container maxW="container.lg" pt={8}>
        {/* <DataTabs data={language} /> */}
        <Box className="w-[200px] h-10 flex justify-center text-center rounded-lg border border-gray-500 overflow-hidden">
          <Box
            className={
              language === "fr"
                ? "w-[100px] h-10 flex justify-center flex-col cursor-pointer bg-green-400"
                : "w-[100px] h-10 flex justify-center flex-col cursor-pointer"
            }
            onClick={() => {
              setLanguageChanging(true);
              setLanguage("fr");
              setTimeout(() => {
                setLanguageChanging(false);
              }, 3000);
            }}
          >
            <span>Français</span>
          </Box>
          <Box
            className={
              language === "en"
                ? "w-[100px] h-10 flex justify-center flex-col cursor-pointer bg-green-400"
                : "w-[100px] h-10 flex justify-center flex-col cursor-pointer"
            }
            onClick={() => {
              setLanguageChanging(true);
              setLanguage("en");
              setTimeout(() => {
                setLanguageChanging(false);
              }, 3000);
            }}
          >
            <span>Anglais</span>
          </Box>
        </Box>
        <CustomContainer
          content={language === "fr" ? airtableFrContent : airtableEngContent}
        />
      </Container>
    </>
  );
}

export default ActualitesCopy;
