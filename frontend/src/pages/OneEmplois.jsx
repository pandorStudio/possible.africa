import { useParams } from "react-router-dom";
import OneEmploiTemplate from "../components/OneEmploiTemplate.jsx";
import { useGetJobQuery } from "../features/api/apiSlice.js";

function OneEmplois() {

    const { slug } = useParams();
    const {
      data: jobs = [],
    } = useGetJobQuery(slug);
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneEmploiTemplate iconSx={iconSx} backUrl="/emplois" jobs={jobs}/>
    );
}

export default OneEmplois;