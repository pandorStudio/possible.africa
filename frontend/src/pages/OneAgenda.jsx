import { useParams } from "react-router-dom";
import { useGetEventQuery } from "../features/api/apiSlice.js";
import OneAgendaTemplate from "../components/OneAgendaTemplate.jsx";

function OneAgenda() {

    const { slug } = useParams();
    const {
      data: events = [],
    } = useGetEventQuery(slug);
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneAgendaTemplate iconSx={iconSx} backUrl="/agenda" events={events}/>
    );
}

export default OneAgenda;