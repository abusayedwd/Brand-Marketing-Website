import { apiSlice } from "@/redux/api/apiSlice";

const ratingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRatings: builder.query({
      query: (userId) => `/ratings/user/${userId}`,
    }),
    createRating: builder.mutation({
      query: (data) => ({
        url: `/ratings`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserRatingsQuery, useCreateRatingMutation } = ratingsApi;
