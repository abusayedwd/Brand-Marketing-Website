import { apiSlice } from "@/redux/api/apiSlice";

const favoritesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => `/favorites`,
      providesTags: [{ type: "Favorites" }],
    }),
    getFavoriteStatus: builder.query({
      query: (influencerId) => `/favorites/status/${influencerId}`,
      providesTags: (result, error, influencerId) => [
        { type: "Favorites", id: influencerId },
      ],
    }),
    toggleFavorite: builder.mutation({
      query: (influencerId) => ({
        url: `/favorites/${influencerId}`,
        method: "POST",
      }),
      invalidatesTags: (result, error, influencerId) => [
        { type: "Favorites" },
        { type: "Favorites", id: influencerId },
      ],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useGetFavoriteStatusQuery,
  useToggleFavoriteMutation,
} = favoritesApi;
