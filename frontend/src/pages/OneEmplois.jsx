import OneElementPage from "../components/OneElementPage.jsx";

function OneEmplois() {
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneElementPage iconSx={iconSx} backUrl="/emplois"/>
    );
}

export default OneEmplois;