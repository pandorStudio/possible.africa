import { Box, Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";
import { useGetAirtableOrganisationsQuery, useGetOrganisationsQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../utils/NoData";
import CenteredContainer from "../utils/CenteredContainer";

function Organisations() {
  const [page, setPage] = useState(1);
  const [infiniteScrollIsFetching, setinfiniteScrollIsFetching] =
    useState(false);
  // const {
  //   data: organisations = [],
  //   isLoading,
  //   isFetching,
  //   isError,
  //   isSuccess,
  //   error,
  // } = useGetOrganisationsQuery({
  //   limit: 10 * page,
  //   page: page,
  //   fields: [],
  //   eq: [],
  // });
  const {
    data: organisations = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetAirtableOrganisationsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [],
  });
  let content;

  useEffect(() => {
    // console.log(organisations);
  }, [isLoading]);

  let isLoaded = true;

  if (organisations?.length === 0) {
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
  if (organisations.length) {
    content = (
      <InfiniteScroll
        dataLength={organisations.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={true}
        loader={
          // eslint-disable-next-line react/no-unknown-property
          <Box
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spinner as="div" mx="45%" mt={10} />
          </Box>
        }
        endMessage={<Text>Yay! You have seen it all</Text>}
      >
        {organisations.map((organisation, index) => {
          const createdAt = new Date(organisation?.publication_date);
          // transform date to french format
          const date =
            createdAt.getDate() +
            "/" +
            (createdAt.getMonth() + 1) +
            "/" +
            createdAt.getFullYear();
          //console.log(organisation.description)
          const instanceCard = (
            <CardComponent
              postType="Organisation"
              key={organisation?._id}
              title={organisation?.name}
              description={
                organisation.description
                  ? ParseSlice(organisation?.description)
                  : null
              }
              imgUrl={organisation?.logo}
              isLoaded={isLoaded}
              // link={"/organisations/" + organisation?.id}
              link={organisation?.website || ""}
              type={organisation?.type?.name}
              organisation_types={
                organisation?.types?.length > 0 ? organisation?.types : []
              }
              countries={
                organisation?.operationnal_countries?.length > 0
                  ? organisation?.operationnal_countries.split(", ")
                  : []
              }
              activity_areas={
                organisation?.activity_areas?.length > 0
                  ? organisation?.activity_areas
                  : []
              }
              createdAt={date}
              country={organisation?.region}
              sitWebLink={organisation?.website || ""}
            />
          );
          return <>{instanceCard}</>;
        })}
      </InfiniteScroll>
    );
  }
  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }
  return <CustomContainer content={content || "Pas de contenu"} />;
}

export default Organisations;
