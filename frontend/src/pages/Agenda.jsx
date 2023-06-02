import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetEventsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";

function Agenda() {
    const {
        data: events = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
    } = useGetEventsQuery();
    let content;

//     const [isLoaded, setIsLoaded] = useState(false);

// setInterval(() => {
//   setIsLoaded(true)
// }, 1000);

let isLoaded = true;

    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = events.map(event => {
            return (
                <CardComponent postType="Agenda" key={event._id} title={event.title} description={parse(event.description.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={event?.organisation?.logo} isLoaded={isLoaded} link={"/agenda/" + event.title.toLowerCase().replaceAll(" ","-")}/>
            )
        })
    } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
    }

  return (
      <Container maxW="container.lg" p={0}>
            <VStack w="full" h="full" py={5} px={10} spacing={0} alignItems="flex-start">              {/* <Heading size="xl">Agendas</Heading> */}
              {content}
            </VStack>
      </Container>
  )
}

export default Agenda