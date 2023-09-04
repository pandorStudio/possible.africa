import { Box, Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import { useGetJobsQuery } from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";
import NoData from "../utils/NoData.jsx";
import CenteredContainer from "../utils/CenteredContainer.jsx";

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

  if (jobs?.length === 0) {
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
    content = jobs.map((job) => {
      const createdAt = new Date(job?.createdAt);
      // transform date to french format
      const date =
        createdAt.getDate() +
        "/" +
        (createdAt.getMonth() + 1) +
        "/" +
        createdAt.getFullYear();
      return (
        <CardComponent
          postType="Emplois"
          key={job?._id}
          title={job?.title}
          description={job?.description ? ParseSlice(job?.description) : null}
          imgUrl={job?.organisation?.logo}
          isLoaded={isLoaded}
          link={"/emplois/" + job?.id}
          company={job?.organisation}
          type={job?.type}
          location={job?.location}
          createdAt={date}
          source={job?.source}
        />
      );
    });
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
  return <CustomContainer content={content || "Pas de contenu"} />;
}

export default Emplois;
