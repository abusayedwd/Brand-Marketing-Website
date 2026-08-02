import { apiSlice } from "@/redux/api/apiSlice";

const favoritesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => `/favorites`,
      providesTags: [{ type: "Favorites" }],
    }),
    toggleFavorite: builder.mutation({
      query: (influencerId) => ({
        url: `/favorites/${influencerId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Favorites" }],
    }),
  }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } = favoritesApi;
