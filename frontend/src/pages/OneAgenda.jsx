import OneElementPage from "../components/OneElementPage.jsx";

function OneAgenda() {
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneElementPage iconSx={iconSx} backUrl="/agenda"/>
    );
}

export default OneAgenda;