import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OnePostPage from "../../components/OnePostPage";
import { useGetPostsQuery } from "../../features/api/apiSlice";

function OneActualite() {
  const { slug } = useParams();
  const {
    data: posts = [],
  } = useGetPostsQuery({
    limit: 10,
    page: 1,
    fields: [],
    eq: [{ field: "slug", value: slug }],
  });
  

  useEffect(() => { 
  }, [posts]);

  const iconSx = {
    ":hover": {
      cursor: "pointer",
    },
  };
  return (
    
    <OnePostPage
      iconSx={iconSx}
      backUrl="/actualites"
      news={posts[0]}
    />
  );
}

export default OneActualite;
