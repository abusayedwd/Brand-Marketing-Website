import { apiSlice } from "@/redux/api/apiSlice";

const ratingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRatings: builder.query({
      query: (userId) => `/ratings/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "Ratings", id: userId }],
    }),
    createRating: builder.mutation({
      query: (data) => ({
        url: `/ratings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Ratings", id: arg?.toUserId },
      ],
    }),
  }),
});

export const { useGetUserRatingsQuery, useCreateRatingMutation } = ratingsApi;
