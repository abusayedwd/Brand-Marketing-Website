import { apiSlice } from "@/redux/api/apiSlice";

 

const getInterestedCampaign = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInterestedCampaign: builder.query({
      query: (id) => `campaigns/getInterestedCampaignsForInfluencer`,
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetInterestedCampaignQuery } = getInterestedCampaign;