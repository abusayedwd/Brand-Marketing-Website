
const { apiSlice } = require("@/redux/api/apiSlice");

const getMyCompletedCampaigns = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyCompletedCampaigns: builder.query({
            query: () => `/campaigns/getMyCompletedCampaigns`,
            providesTags: [{ type: "CompletedCampaign" }],
        }),
    }),
});

export const { useGetMyCompletedCampaignsQuery } = getMyCompletedCampaigns;
