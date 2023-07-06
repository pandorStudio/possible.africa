/* eslint-disable no-unused-vars */

import { Button, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchCardComponent from '../components/SearchCardComponent';
import { useSearchAllQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";




function Search() {

  const [searchParams,setSearchParams ] = useSearchParams()
  const searchTerm = searchParams.get('q') || '';
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
    fetchNextPage
  } = useSearchAllQuery({
    query:searchTerm,
    pageNumber:page,
    limit:limit,});

  let content;
  let resultLength;
  let duration;

let isLoaded = true;


  if (isLoading || isFetching) {

   return <VStack minH="50vh" alignItems="center" justifyContent="center"><Spinner/></VStack>
   } else if(isSuccess) {
  
    resultLength = results[0].resultLength

    duration = results[0].duration

    // resultLength = results.pages.Map(page => page.result).length;
    // duration = results.pages[0].duration;

  content = results.map(result => {
      return (
        <>
       {result.searchType === "organisation" &&
        <SearchCardComponent postType="Organisation" key={result._id} title={result.name} description={ParseSlice(result.description)} imgUrl={result.logo} isLoaded={isLoaded} link={"/organisations/" + result.slug} type={result?.type?.name} pays="Pays"/>
        }

      {result.searchType === "event" &&
              <SearchCardComponent postType="Agenda" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/agenda/" + result.slug} pays={result.target_country || "Togo"} type={result?.event_type?.name}/>
              }

{result.searchType === "post" &&
                
                <SearchCardComponent postType="Actualités" key={result._id} title={result.title} description={ParseSlice(result.content)} imgUrl={result.image} isLoaded={isLoaded} link={"/actualites/" + result.slug} pays="Pays"/>

              }

{result.searchType === "ooportunity" &&
                <SearchCardComponent postType="Opportunités" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + result.slug} type={result?.result_type?.name} pays={result?.target_country}/>
              }

{result.searchType === "job" &&
                <SearchCardComponent postType="Emplois" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/emplois/" + result.slug} company={result?.organisation?.name} type={result?.type} location={result?.location}/>
              }
        </>
      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
return (
<>
<CustomContainer content={content} title={`Environ ${resultLength} resultats trouvés (${duration} secondes)`}/>
 {/* Render the "Load More" button */}
 {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Button>
          {'Load More'}
        </Button>
      )}
</>

)
}

export default Search