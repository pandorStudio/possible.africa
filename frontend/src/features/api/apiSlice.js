import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = import.meta.env.VITE_BACKEND_TOKEN;
const baseUrl = import.meta.env.VITE_API_URL_BASE;

const baseQueryArgs = {limit: 10, page: 1, fields: []};
function queryTransformer(query, resource) {
  let baseQueryString = "/" + resource;
    const { limit, page, fields= ['alo', 'ala'], eq, } = query;
    console.log(eq);
    baseQueryString += `?page=${page}&limit=${limit}`;
    if (fields.length) {
      baseQueryString += `&select=${fields.forEach((item) => item + ",")}`;
    }
    if (eq.length) {
        eq.forEach((item) => {
            baseQueryString += `&${item.field}=${item.value}`;
        });
    }
  return baseQueryString;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${token}`);
    headers.set("content-type", "application/json");
    headers.set("access-control-allow-origin", "*");
    return headers;
  },
  tagTypes: ["Organisations"],
  endpoints: (builder) => ({
    getPostCategories: builder.query({
        query: (queryArgs= baseQueryArgs) => queryTransformer(queryArgs,"post_categories"),
    }),

    getPosts: builder.query({
      query: (queryArgs= baseQueryArgs) => {
      return queryTransformer(queryArgs, "posts");
    },
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

    getOrganisation: builder.query({
      query: organisationId => `/organisations/${organisationId}`
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

    getJobs: builder.query({
        query: () => "/jobs",
        transformResponse: (res) => res.sort((a, b) => b.id - a.id),
        providesTags: ["Jobs"],
    }),
    addJob: builder.mutation({
        query: (post) => ({
            url: "/jobs",
            method: "POST",
            body: post,
        }),
        invalidatesTags: ["Jobs"],
    }),
    updateJob: builder.mutation({
        query: (post) => ({
            url: `/jobs/${post.id}`,
            method: "PATCH",
            body: post,
        }),
        invalidatesTags: ["Jobs"],
    }),
    deleteJob: builder.mutation({
        query: ({ id }) => ({
            url: `/jobs/${id}`,
            method: "DELETE",
            body: id,
        }),
        invalidatesTags: ["Jobs"],
    }),

    getEvents: builder.query({
      query: () => "/events",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Agenda"],
    }),
    addEvent: builder.mutation({
      query: (post) => ({
        url: "/events",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Agenda"],
    }),
    updateEvent: builder.mutation({
      query: (post) => ({
        url: `/events/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Agenda"],
    }),
    deleteEvent: builder.mutation({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Agenda"],
    }),

    getOpportunities: builder.query({
      query: () => "/opportunities",
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Opportunités"],
    }),
    addOpportunity: builder.mutation({
      query: (post) => ({
        url: "/opportunities",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Opportunités"],
    }),
    updateOpportunity: builder.mutation({
      query: (post) => ({
        url: `/opportunities/${post.id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Opportunités"],
    }),
    deleteOpportunity: builder.mutation({
      query: ({ id }) => ({
        url: `/opportunities/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Opportunités"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetOrganisationQuery,
  useGetOrganisationsQuery,
  useAddOrganisationMutation,
  useDeleteOrganisationMutation,
  useUpdateOrganisationMutation,
  useGetPostCategoriesQuery,
  useGetJobsQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetEventsQuery,
  useAddEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetOpportunitiesQuery,
  useAddOpportunityMutation,
  useDeleteOpportunityMutation,
  useUpdateOpportunityMutation
} = apiSlice;
