import {  Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import CardComponent from '../components/CardComponent';
import { Box, Spinner, HStack } from '@chakra-ui/react'
import CustomContainer from "../utils/CustomContainer";
import { useSearchParams } from "react-router-dom";
import { useSearchAllQuery } from "../features/api/apiSlice";
import parse from "html-react-parser";



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
        <CardComponent postType="Organisation" key={result._id} title={result.name} description={result.description} imgUrl={result.logo} isLoaded={isLoaded} link={"/organisations/" + result._id} type={result?.type?.name} pays="Pays"/>
        }

      {result.searchType === "event" &&
              <CardComponent postType="Agenda" key={result._id} title={result.title} description={parse(result.description.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/agenda/" + result._id} pays={result.target_country || "Togo"} type={result?.event_type?.name}/>
              }

{result.searchType === "post" &&
                
                <CardComponent postType="Actualités" key={result._id} title={result.title} description={parse(result.content.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={result.image} isLoaded={isLoaded} link={"/actualites/" + result.slug} pays="Pays"/>

              }

{result.searchType === "ooportunity" &&
                <CardComponent postType="Opportunités" key={result._id} title={result.title} description={parse(result.description.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + result._id} type={result?.result_type?.name} pays={result?.target_country}/>
              }

{result.searchType === "job" &&
                <CardComponent postType="Emplois" key={result._id} title={result.title} description={result.description} imgUrl={result?.organisation?.logo} isLoaded={isLoaded} link={"/emplois/" + result._id} company={result?.organisation?.name} type={result?.type} location={result?.location}/>
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