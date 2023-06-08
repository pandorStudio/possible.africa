import { Spinner, VStack } from "@chakra-ui/react";
import CardComponent from '../components/CardComponent';
import { useGetOrganisationsQuery } from "../features/api/apiSlice";
import CustomContainer from "../utils/CustomContainer";
import { ParseSlice } from "../utils/htmlParser";


function Organisations() {
  const {
    data: organisations = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOrganisationsQuery();
  let content;
let isLoaded = true;


  if (isLoading || isFetching) {

   return <VStack><Spinner/></VStack>
   } else if(isSuccess) {

     content = organisations.map(organisation => {
      return (
        <CardComponent postType="Organisation" key={organisation._id} title={organisation.name} description={ParseSlice(organisation.description)} imgUrl={organisation.logo} isLoaded={isLoaded} link={"/organisations/" + organisation.id} type={organisation?.type?.name} pays="Pays"/>
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

export default Organisations