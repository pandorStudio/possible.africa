import { useParams } from "react-router-dom";
import OneOrganisationTemplate from "../components/OneOrganisationTemplate.jsx";
import { useGetOrganisationsQuery } from "../features/api/apiSlice.js";

function OneOrganisation() {


    const { slug } = useParams();
    const {
      data: organisations = [],
    } = useGetOrganisationsQuery({
      limit: 10,
      page: 1,
      fields: [],
      eq: [{ field: "slug", value: slug }],
    });
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneOrganisationTemplate iconSx={iconSx} backUrl="/organisations" organisations={organisations[0]}/>
    );
}

export default OneOrganisation;