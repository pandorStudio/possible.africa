import { useParams } from "react-router-dom";
import OneElementPage from "../../components/OnePostPage";
import { useEffect } from "react";
import { useGetPostsQuery } from "../../features/api/apiSlice";
import OnePostPage from "../../components/OnePostPage";

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
    console.log(posts);
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
