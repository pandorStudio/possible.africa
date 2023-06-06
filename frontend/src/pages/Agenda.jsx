import {Container, Heading, HStack, Spinner, Text, VStack} from "@chakra-ui/react"
import {useGetEventsQuery} from "../features/api/apiSlice.js";
import CardComponent from "../components/CardComponent.jsx";
import parse from "html-react-parser";
import { useState } from "react";
import CustomContainer from "../utils/CustomContainer.jsx";

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

// const date = new Date(news?.createdAt);
// const jour = date.getDate();
// const mois = date.toLocaleString('default', { month: 'long' });

let isLoaded = true;

    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = events.map(event => {
            return (
                <CardComponent postType="Agenda" key={event._id} title={event.title} description={parse(event.description.replace(/\\n/g, "<br />").slice(0, 50)+"...")} imgUrl={event?.organisation?.logo} isLoaded={isLoaded} link={"/agenda/" + event.id} pays={event.target_country || "Togo"} type={event?.event_type?.name}/>
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

export default Agenda