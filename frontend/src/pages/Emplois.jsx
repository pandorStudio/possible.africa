import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetJobsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import Image from "../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg";
import { useState } from "react";

function Emplois() {

    const {
        data: jobs = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetJobsQuery();
    let content;
    let isLoaded = true;

//     const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);
    if (isLoading || isFetching) {
        content = jobs.map(job => {
            return (
                <CardComponent key={job._id} title={job.title} description={job.description} imgUrl={Image} isLoaded={!isLoaded}/>
            )
        })
    } else if(isSuccess) {
        content = jobs.map(job => {
            return (
                <CardComponent key={job._id} title={job.title} description={job.description} imgUrl={Image} isLoaded={isLoaded}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }
  return (
      <Container maxW="container.lg" p={0} >


<VStack w="full" h="full" py={5} px={10} spacing={5} alignItems="flex-start">              {/* <Heading size="xl">Emplois</Heading> */}
              {content}
          </VStack>


      </Container>
  )
}

export default Emplois