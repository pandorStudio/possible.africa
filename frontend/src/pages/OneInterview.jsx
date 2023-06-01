import OneElementPage from "../components/OneElementPage.jsx";

function OneInterview() {

    const iconSx =
        {
            ':hover': {
                cursor: 'pointer'
            }
        };
    // const [isLoaded, setIsLoaded] = useState(false);

    // setInterval(() => {
    //   setIsLoaded(true)
    // }, 1000);
    return (
        <OneElementPage iconSx={iconSx} backUrl="/interviews"/>
    );
}

export default OneInterview;