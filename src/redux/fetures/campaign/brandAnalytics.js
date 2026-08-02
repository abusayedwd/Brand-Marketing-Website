import { apiSlice } from "@/redux/api/apiSlice";

const brandAnalyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandAnalytics: builder.query({
      query: () => `/campaigns/brandAnalytics`,
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetBrandAnalyticsQuery } = brandAnalyticsApi;
