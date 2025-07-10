 


const { apiSlice } = require("@/redux/api/apiSlice");


const campaignPayment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        campaignPayment: builder.query({
            query: () => `/payments/get-transactions`,
            providesTags: [{type: "Campaign"}]
        })

    })
})

export const {useCampaignPaymentQuery} = campaignPayment