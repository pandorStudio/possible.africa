/* eslint-disable no-unused-vars */

import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchCardComponent from "../components/SearchCardComponent";
import { useSearchAllQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";
import NoData from "../utils/NoData";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const searchTerm = searchParams.get("q") || "";
  const searchTerm = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: results = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    isLoadingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchAllQuery({
    q: searchTerm,
    page: page,
    limit: limit,
  });

  // const {
  //   data: { results },
  //   isLoading,
  //   isFetching,
  //   isError,
  //   isSuccess,
  //   error,
  //   isLoadingNextPage,
  //   hasNextPage,
  //   fetchNextPage
  // } = usePaginated(todosApi.endpoints.getTodos, {
  //   getNextPageParam: (lastPage, allPages) => lastPage.length,
  //   merge: (prevData, newData) => ({
  //     todos: [...prevData.todos, ...newData.todos]
  //   })
  // });

  let content;
  let resultLength;
  let duration;

  let isLoaded = true;



  if (isLoading || isFetching) {
    return (
      <VStack minH="50vh" alignItems="center" justifyContent="center">
        <Spinner />
      </VStack>
    );
  } else if (isSuccess) {
    resultLength = results[0].resultLength;

    duration = results[0].duration;

    if (results?.length === 0) {
      return (
      <NoData/>
      );
    }
   

    // resultLength = results.pages.Map(page => page.result).length;
    // duration = results.pages[0].duration;

    content = results.map((result) => {
      return (
        <>
          {result.searchType === "organisation" && (
            <SearchCardComponent
              postType="Organisation"
              key={result?._id}
              title={result?.name}
              description={ParseSlice(result?.description || "Pas de contenu")}
              imgUrl={result?.logo}
              isLoaded={isLoaded}
              link={"/organisations/" + result?._id}
              type={result?.type?.name}
              pays="Pays"
            />
          )}

          {result.searchType === "event" && (
            <SearchCardComponent
              postType="Agenda"
              key={result?._id}
              title={result?.title}
              description={ParseSlice(result?.description || "Pas de contenu")}
              imgUrl={result?.organisation?.logo}
              isLoaded={isLoaded}
              link={"/agenda/" + result?._id}
              pays={result?.target_country || "Togo"}
              type={result?.event_type?.name}
            />
          )}

          {result.searchType === "post" && (
            <SearchCardComponent
              postType="Actualités"
              key={result?._id}
              title={result?.title}
              description={ParseSlice(result?.content || "Pas de contenu")}
              imgUrl={result?.image}
              isLoaded={isLoaded}
              link={"/actualites/" + result?.slug}
              pays="Pays"
            />
          )}

          {result.searchType === "ooportunity" && (
            <SearchCardComponent
              postType="Opportunités"
              key={result?._id}
              title={result?.title}
              description={ParseSlice(result?.description || "Pas de contenu")}
              imgUrl={result?.organisation?.logo}
              isLoaded={isLoaded}
              link={"/opportunites/" + result?._id}
              type={result?.result_type?.name}
              pays={result?.target_country}
            />
          )}

          {result.searchType === "job" && (
            <SearchCardComponent
              postType="Emplois"
              key={result?._id}
              title={result?.title}
              description={ParseSlice(result?.description || "Pas de contenu")}
              imgUrl={result?.organisation?.logo}
              isLoaded={isLoaded}
              link={"/emplois/" + result?._id}
              company={result?.organisation?.name}
              type={result?.type}
              location={result?.location}
            />
          )}
        </>
      );
    });
  } else if (isError) {
    console.log({ error });
    return <Box>{error.status}</Box>;
  }
  return (
    <>
      <CustomContainer
        content={content || "Pas de contenu"}
        title={`Environ ${resultLength || 0} resultats trouvés (${duration || 0} secondes)`}
      />
      {/* Render the "Load More" button */}
      {/* {isLoading ? <div>Loading...</div> : <Button>{"Load More"}</Button>} */}
    </>
  );
}

export default Search;
