import { Spinner, VStack } from "@chakra-ui/react";
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
    return (
    <NoData/>
    );
  }

    if (isLoading) {
        return <CenteredContainer><Spinner/></CenteredContainer>
    } else if(isSuccess) {
        content = opportunities.map(opportunity => {
            return (
                <CardComponent postType="Opportunités" key={opportunity._id} title={opportunity.title} description={ParseSlice(opportunity.description)} imgUrl={opportunity?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + opportunity?.id} type={opportunity?.opportunity_type?.name} country={opportunity?.target_country}/>
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

export default Opportunites