import { useState } from "react";
import { useGetPostsQuery, useAddPostMutation,useDeletePostMutation, useUpdatePostMutation } from "../features/api/apiSlice";

export default function Albums() {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
  } = useGetPostsQuery();
  let content;

  const [addPost] = useAddPostMutation()
  const [updatePost] =  useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const [newPost, setNewPost] = useState('')


  if (isLoading || isFetching) {
    return <div>loading...</div>;
  } else if(isSuccess) {
     content = posts.map(post => {
      return (<ul>
    
        <li key={post.id}>
          {post.id} - {post.title}
          <button className="trash" onClick={() => deletePost({ id:post.id })}>
                       Supprimer
          </button>
        </li>
   
    </ul>
      )
    })
  } else if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({title: newPost })
    setNewPost('')
  }


  const newItemSection =
  <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter new Post</label>
      <div className="new-todo">
          <input
              type="text"
              id="new-todo"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Enter new Post"
          />
      </div>
      <button className="submit">
New
      </button>
  </form>



  return (
   <div>
     <h1>Posts</h1>
    {newItemSection}
{ content }
   </div> 
  );
}