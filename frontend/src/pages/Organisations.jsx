import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";
import { useGetOrganisationsQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Organisations() {
  const [page, setPage] = useState(1);
  const [infiniteScrollIsFetching, setinfiniteScrollIsFetching] =
    useState(false);
  const {
    data: organisations = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOrganisationsQuery({
    limit: 10 * page,
    page: page,
    fields: [],
    eq: [],
  });
  let content;

  // useEffect(() => {
  //   function handleScroll() {
  //     if (
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //       !infiniteScrollIsFetching
  //     ) {
  //       setPage((prevPage) => prevPage + 1);
  //       setinfiniteScrollIsFetching(true);
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [infiniteScrollIsFetching, page]);

  let isLoaded = true;

  if (isLoading) {
    return (
      <VStack>
        <Spinner />
      </VStack>
    );
  }
  if (isSuccess) {
    content = (
      <InfiniteScroll
        dataLength={organisations.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        hasMore={true}
        loader={
          <VStack>
            <Spinner />
          </VStack>
        }
      >
        {organisations.map((organisation, index) => {
          const instanceCard = (
            <CardComponent
              postType="Organisation"
              key={organisation._id}
              title={organisation.name}
              description={ParseSlice(organisation.description)}
              imgUrl={organisation.logo}
              isLoaded={isLoaded}
              link={"/organisations/" + organisation.id}
              type={organisation?.type?.name}
              pays={organisation.country || "Pays"}
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
  return <CustomContainer content={content} />;
}

export default Organisations;
