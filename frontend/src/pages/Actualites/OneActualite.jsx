import { useParams } from "react-router-dom";
import OneElementPage from "./../../components/OneElementPage";
import { useEffect } from "react";
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
    console.log(posts);
  }, [posts]);

  const iconSx = {
    ":hover": {
      cursor: "pointer",
    },
  };
  return (
    <OneElementPage
      iconSx={iconSx}
      backUrl="/actualites"
      news={posts[0]}
    />
  );
}

export default OneActualite;
