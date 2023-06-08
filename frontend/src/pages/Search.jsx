/* eslint-disable no-unused-vars */

import { Spinner, VStack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import SearchCardComponent from '../components/SearchCardComponent';
import { useSearchAllQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";



function Search() {

  const [searchParams,setSearchParams ] = useSearchParams()
  const searchTerm = searchParams.get('q') || '';

  const {
    data: results,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useSearchAllQuery(searchTerm);
  let content;
  let resultLength;
  let duration;

let isLoaded = true;


  if (isLoading || isFetching) {

   return <VStack><Spinner/></VStack>
   } else if(isSuccess) {
  
    resultLength = results[0].resultLength

    duration = results[0].duration


  content = results.map(result => {
      return (
        <>
       {result.searchType === "organisation" &&
        <SearchCardComponent postType="Organisation" key={result._id} title={result.name} description={ParseSlice(result.description)} imgUrl={result.logo} isLoaded={isLoaded} link={"/organisations/" + result._id} type={result?.type?.name} pays="Pays"/>
        }

      {result.searchType === "event" &&
              <SearchCardComponent postType="Agenda" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/agenda/" + result._id} pays={result.target_country || "Togo"} type={result?.event_type?.name}/>
              }

{result.searchType === "post" &&
                
                <SearchCardComponent postType="Actualités" key={result._id} title={result.title} description={ParseSlice(result.content)} imgUrl={result.image} isLoaded={isLoaded} link={"/actualites/" + result.slug} pays="Pays"/>

              }

{result.searchType === "ooportunity" &&
                <SearchCardComponent postType="Opportunités" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + result._id} type={result?.result_type?.name} pays={result?.target_country}/>
              }

{result.searchType === "job" &&
                <SearchCardComponent postType="Emplois" key={result._id} title={result.title} description={ParseSlice(result.description)} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/emplois/" + result._id} company={result?.organisation?.name} type={result?.type} location={result?.location}/>
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
</>

)
}

export default Search