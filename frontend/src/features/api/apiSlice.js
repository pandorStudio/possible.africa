import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = import.meta.env.VITE_BACKEND_DEV;
const base_url = import.meta.env.VITE_API_URL_BASE;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
  }),
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");
    headers.set("access-control-allow-origin", "*");
    return headers;
  },
  tagTypes: ["Organisations"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Posts"],
    }),

    getOrganisations: builder.query({
      query: () => "/organisations",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Organisations"],
    }),
    addOrganisation: builder.mutation({
      query: (post) => ({
        url: "/organisations",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Organisations"],
    }),
    updateOrganisation: builder.mutation({
      query: (post) => ({
        url: `/organisations/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Organisations"],
    }),
    deleteOrganisation: builder.mutation({
      query: ({ id }) => ({
        url: `/organisations/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Organisations"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetOrganisationsQuery,
  useAddOrganisationMutation,
  useDeleteOrganisationMutation,
  useUpdateOrganisationMutation,
} = apiSlice;
