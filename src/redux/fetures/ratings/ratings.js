import { apiSlice } from "@/redux/api/apiSlice";

const ratingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRatings: builder.query({
      query: (userId) => `/ratings/user/${userId}`,
      providesTags: (result, error, userId) => [{ type: "Ratings", id: userId }],
    }),
    getFeaturedRatings: builder.query({
      query: (limit = 6) => `/ratings/featured?limit=${limit}`,
      providesTags: [{ type: "Ratings", id: "FEATURED" }],
    }),
    createRating: builder.mutation({
      query: (data) => ({
        url: `/ratings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Ratings", id: arg?.toUserId },
        { type: "Ratings", id: "FEATURED" },
      ],
    }),
  }),
});

export const {
  useGetUserRatingsQuery,
  useGetFeaturedRatingsQuery,
  useCreateRatingMutation,
} = ratingsApi;
