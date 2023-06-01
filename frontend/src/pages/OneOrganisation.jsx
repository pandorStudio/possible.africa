import OneElementPage from "../components/OneElementPage.jsx";

function OneOrganisation() {
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };

    return (
        <OneElementPage iconSx={iconSx} backUrl="/organisations"/>
    );
}

export default OneOrganisation;