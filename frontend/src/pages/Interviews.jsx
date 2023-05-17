import Image from '../assets/hunters-race-MYbhN8KaaEc-unsplash.jpg'
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";
import Card from '../components/Card';


function Interviews() {

    const {
        data: organisations = [],
        isLoading,
        isFetching,
        isError,
        isSuccess,
        error,
      } = useGetOrganisationsQuery();
      let content;
    
      if (isLoading || isFetching) {
        content = <div>loading...</div>;
        return content
      } else if(isSuccess) {
         content = organisations.map(organisation => {
          return (
            <Card key={organisation._id} title={organisation.name} description={organisation.description} imgUrl={Image}/>
    
          )
        })
      } else if (isError) {
        console.log({ error });
        return <div>{error.status}</div>;
      }
  return (
    <div className='main'>{content}</div>
  )
}

export default Interviews