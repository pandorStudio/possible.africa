import { useParams } from "react-router-dom";
import OneOrganisationTemplate from "../components/OneOrganisationTemplate.jsx";
import { useGetOrganisationQuery } from "../features/api/apiSlice.js";

function OneOrganisation() {
    const { slug } = useParams();
    const {
      data: organisations = [],
    } = useGetOrganisationQuery(slug);

    
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneOrganisationTemplate iconSx={iconSx} backUrl="/organisations" organisations={organisations}/>
    );
}

export default OneOrganisation;