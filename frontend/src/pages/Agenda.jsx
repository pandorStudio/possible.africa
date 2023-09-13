import { Box, Spinner, VStack } from "@chakra-ui/react";
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
    if (isLoading || isFetching) {
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

  if (isLoading || isFetching) {
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
  } else if (isSuccess) {
    content = events.map((event) => {
      const createdAt = new Date(event?.createdAt);
      // transform date to french format
      const date =
        createdAt.getDate() +
        "/" +
        (createdAt.getMonth() + 1) +
        "/" +
        createdAt.getFullYear();
      return (
        <CardComponent
          postType="Agenda"
          key={event?._id}
          title={event?.title}
          description={
            events?.description ? ParseSlice(events?.description) : null
          }
          imgUrl={event?.cover}
          isLoaded={isLoaded}
          link={"/agenda/" + event?.id}
          countries={
            event?.target_countries?.length > 0 ? event?.target_countries : []
          }
          organisations={
            event?.organisations?.length > 0 ? event?.organisations : []
          }
          contacts={event?.contacts?.length > 0 ? event?.contacts : []}
          activity_areas={
            event?.activity_areas?.length > 0 ? event?.activity_areas : []
          }
          type={event?.event_type?.name}
          createdAt={date}
          source={event?.source}
        />
      );
    });
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return <CustomContainer content={content || "Pas de contenu"} />;
}

export default Agenda;
