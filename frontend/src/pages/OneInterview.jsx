import { useParams } from "react-router-dom";
import { useGetPostsQuery } from "../features/api/apiSlice.js";
import OnePostPage from "../components/OnePostPage.jsx";

function OneInterview() {

    const { slug } = useParams();
    const {
      data: posts = [],
    } = useGetPostsQuery({
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
    // const [isLoaded, setIsLoaded] = useState(false);

    // setInterval(() => {
    //   setIsLoaded(true)
    // }, 1000);
    return (
        <OnePostPage iconSx={iconSx} backUrl="/interviews" news={posts[0]}/>
    );
}

export default OneInterview;