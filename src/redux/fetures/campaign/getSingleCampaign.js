const { apiSlice } = require("@/redux/api/apiSlice");

const getSingleCampaign = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCampaign: builder.query({
      query: (campaignId) => `/campaigns/${campaignId}`, 
      providesTags: (id) => [{ type: "Campaign",}],
    }),
  }),
});

export const { useGetSingleCampaignQuery } = getSingleCampaign;
