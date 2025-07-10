
const { apiSlice } = require("@/redux/api/apiSlice");


const getAcceptedCampaignsForInfluencer = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAcceptedCampaignsForInfluencer: builder.query({
            query: () => `/campaigns/getAcceptedCampaignsForInfluencer`,
            providesTags: [{type:"Campaign"}]
        })

    })
})

export const {useGetAcceptedCampaignsForInfluencerQuery} = getAcceptedCampaignsForInfluencer