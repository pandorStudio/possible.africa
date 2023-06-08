import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent.jsx";
import { useGetJobsQuery } from "../features/api/apiSlice.js";
import CustomContainer from "../utils/CustomContainer.jsx";
import { ParseSlice } from "../utils/htmlParser.jsx";


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
    if (isLoading || isFetching) {
        return <VStack><Spinner/></VStack>
    } else if(isSuccess) {
        content = jobs.map(job => {
            return (
                <CardComponent postType="Emplois" key={job._id} title={job.title} description={ParseSlice(job.description)} imgUrl={job?.organisation?.logo} isLoaded={isLoaded} link={"/emplois/" + job.id} company={job?.organisation?.name} type={job?.type} location={job?.location}/>
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

export default Emplois