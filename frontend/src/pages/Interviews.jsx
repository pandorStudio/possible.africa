import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import {
  useGetPostCategoriesQuery,
  useGetPostsQuery,
} from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";
import NoData from "../utils/NoData.jsx";
import CenteredContainer from "../utils/CenteredContainer.jsx";

function Interviews() {
  const { data: interviewCategories = [] } = useGetPostCategoriesQuery({
    limit: 10,
    page: 1,
    fields: [],
    eq: [{ field: "slug", value: "/podcast" }],
  });
  const {
    data: interviews = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetPostsQuery({
    limit: 10,
    page: 1,
    fields: [],
    eq: [
      { field: "categorie", value: `${interviewCategories[0]?._id}` },
      { field: "status", value: "published" },
    ],
  });
  let content;

  let isLoaded = true;

  //     const [isLoaded, setIsLoaded] = useState(false);

  // setInterval(() => {
  //   setIsLoaded(true)
  // }, 1000);

  if (interviews?.length === 0) {
    return <NoData />;
  }

  if (isLoading) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  } else if (isSuccess) {
    content = interviews.map((interview) => {
      return (
        <CardComponent
          postType="Interview"
          key={interview?._id}
          title={interview?.title}
          description={ParseSlice(interview?.content ?? "Pas de contenu")}
          imgUrl={interview?.image}
          isLoaded={isLoaded}
          link={"/interviews/" + interview?.slug}
          country={interview?.country?.translations?.fra?.common || ""}
          hideMeBellow="md"
        />
      );
    });
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return <CustomContainer content={content ?? "Pas de contenu"} />;
}

export default Interviews;
