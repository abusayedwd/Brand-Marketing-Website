const { apiSlice } = require("@/redux/api/apiSlice");


const getMyCampaign = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyCampaign: builder.query({
            query: () => `/campaigns/getMy-Campaigns`,
            providesTags: [{type:"Campaign"}]
        })

    })
})

export const {useGetMyCampaignQuery} = getMyCampaign