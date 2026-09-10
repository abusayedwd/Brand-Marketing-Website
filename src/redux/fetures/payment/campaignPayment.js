 


const { apiSlice } = require("@/redux/api/apiSlice");


const campaignPayment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        campaignPayment: builder.query({
            // brand's own campaign payments only (get-transactions returns every brand's)
            query: () => `/payments/getMyTransactions`,
            providesTags: [{type: "Campaign"}]
        })

    })
})

export const {useCampaignPaymentQuery} = campaignPayment