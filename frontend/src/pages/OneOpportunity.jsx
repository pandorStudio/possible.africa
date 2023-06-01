import OneElementPage from "../components/OneElementPage.jsx";

function OneOpportunity() {
    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };
    return (
        <OneElementPage iconSx={iconSx} backUrl="/opportunites"/>
    );
}
export default OneOpportunity;