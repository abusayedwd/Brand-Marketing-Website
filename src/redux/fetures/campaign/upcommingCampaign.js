

const { apiSlice } = require("@/redux/api/apiSlice");


const upcommingCampaign = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        upcommingCampaign: builder.query({
            query: () => `/campaigns/getUpcomingCampaignsForInfluecer`,
            providesTags: [{type:"Campaign"}]
        })

    })
})

export const {useUpcommingCampaignQuery} = upcommingCampaign