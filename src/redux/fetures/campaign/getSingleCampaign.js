import { apiSlice } from "@/redux/api/apiSlice";

 

const getSingleCampaign = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleCampaign: builder.query({
      query: (id) => `/campaigns/${id}`,
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetSingleCampaignQuery } = getSingleCampaign;

