import { useState } from "react";
import { useGetOrganisationsQuery, useAddOrganisationMutation, useUpdateOrganisationMutation, useDeleteOrganisationMutation } from "../features/api/apiSlice";

export default function Organisations() {
  const {
    data: organisations = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetOrganisationsQuery();
  let content;

  const [addOrganisation] = useAddOrganisationMutation()
  const [updateOrganisation] =  useUpdateOrganisationMutation()
  const [deleteOrganisation] = useDeleteOrganisationMutation()

  const [newOrganisation, setNewOrganisation] = useState('')


  if (isLoading || isFetching) {
    return <div>loading...</div>;
  } else if(isSuccess) {
     content = organisations.map(organisation => {
      return (
      <ul>
       <li key={organisation._id}>
          {organisation._id} - {organisation.name}
          <button className="trash" onClick={() => deleteOrganisation({ id:organisation._id })}>
                       Supprimer
          </button>
        </li>
   
    </ul>
      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrganisation({title: newOrganisation })
    setNewOrganisation('')
  }


  const newItemSection =
  <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter new Post</label>
      <div className="new-todo">
          <input
              type="text"
              id="new-todo"
              value={newOrganisation}
              onChange={(e) => setNewOrganisation(e.target.value)}
              placeholder="Enter new Organisation"
          />
      </div>
      <button className="submit">
New
      </button>
  </form>



  return (
   <div>

    {newItemSection}
{ content }
   </div> 
  );
}