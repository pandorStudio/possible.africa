import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import { useGetEventsQuery } from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";
import NoData from "../utils/NoData.jsx";
import CenteredContainer from "../utils/CenteredContainer.jsx";

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
if (events?.length === 0) {
    return (
    <NoData/>
    );
  }

    if (isLoading) {
        return <CenteredContainer><Spinner/></CenteredContainer>
    } else if(isSuccess) {
        content = events.map(event => {
            return (
                <CardComponent postType="Agenda" key={event._id} title={event.title} description={ParseSlice(event.description)} imgUrl={event?.cover} isLoaded={isLoaded} link={"/agenda/" + event.id} country={event.target_country || ""} type={event?.event_type?.name}/>
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