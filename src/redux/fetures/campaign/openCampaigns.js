import { apiSlice } from "@/redux/api/apiSlice";

const openCampaigns = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOpenCampaigns: builder.query({
      query: (limit = 6) => `/campaigns/open?limit=${limit}`,
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetOpenCampaignsQuery } = openCampaigns;
