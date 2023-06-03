import { useParams } from "react-router-dom";
import OneOpportunityTemplate from "../components/OneOpportunityTemplate.jsx";
import { useGetOpportunityQuery } from "../features/api/apiSlice.js";

function OneOpportunity() {

    const { slug } = useParams();
    const {
      data: opportunities = [],
    } = useGetOpportunityQuery(slug);
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };
    return (
        <OneOpportunityTemplate iconSx={iconSx} backUrl="/opportunites" opportunities={opportunities}/>
    );
}
export default OneOpportunity;