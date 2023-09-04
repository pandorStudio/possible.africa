import { Spinner, VStack, Box } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import { useGetOpportunitiesQuery } from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";
import NoData from "../utils/NoData.jsx";
import CenteredContainer from "../utils/CenteredContainer.jsx";

function Opportunites() {
  const {
    data: opportunities = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOpportunitiesQuery();
  let content;

  // const [isLoaded, setIsLoaded] = useState(false);

  // setInterval(() => {
  //   setIsLoaded(true)
  // }, 1000);
  let isLoaded = true;

  if (opportunities?.length === 0) {
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
    content = opportunities.map((opportunity) => {
      const createdAt = new Date(opportunity?.createdAt);
      // transform date to french format
      const date =
        createdAt.getDate() +
        "/" +
        (createdAt.getMonth() + 1) +
        "/" +
        createdAt.getFullYear();
      return (
        <CardComponent
          postType="Opportunités"
          key={opportunity._id}
          title={opportunity?.title}
          description={opportunity?.description ? ParseSlice(
            opportunity?.description
          ) : null}
          imgUrl={opportunity?.organisation?.logo}
          isLoaded={isLoaded}
          link={"/opportunites/" + opportunity?.id}
          type={opportunity?.opportunity_type?.name}
          countries={
            opportunity?.target_countries?.length > 0
              ? opportunity?.target_countries
              : []
          }
          organisations={
            opportunity?.organisations?.length > 0
              ? opportunity?.organisations
              : []
          }
          activity_areas={
            opportunity?.activity_areas?.length > 0
              ? opportunity?.activity_areas
              : []
          }
          contacts={
            opportunity?.contacts?.length > 0 ? opportunity?.contacts : []
          }
          createdAt={date}
          targets={opportunity?.targets?.length > 0 ? opportunity?.targets : []}
          source={opportunity?.registration_link || ""}
        />
      );
    });
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return <CustomContainer content={content || "Pas de contenu"} />;
}

export default Opportunites;
