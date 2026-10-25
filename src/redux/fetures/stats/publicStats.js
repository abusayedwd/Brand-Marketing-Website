import { apiSlice } from "@/redux/api/apiSlice";

const publicStatsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStats: builder.query({
      query: () => `/dashboard/public-stats`,
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetPublicStatsQuery } = publicStatsApi;
