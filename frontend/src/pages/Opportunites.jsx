import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import { useGetOpportunitiesQuery } from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";

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


    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = opportunities.map(opportunity => {
            return (
                <CardComponent postType="Opportunités" key={opportunity._id} title={opportunity.title} description={ParseSlice(opportunity.description)} imgUrl={opportunity?.organisation?.logo} isLoaded={isLoaded} link={"/opportunites/" + opportunity.id} type={opportunity?.opportunity_type?.name} pays={opportunity?.target_country}/>
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