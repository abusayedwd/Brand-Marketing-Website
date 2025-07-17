
const { apiSlice } = require("@/redux/api/apiSlice");


const getMyWithdraw = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyWithdraw : builder.query({
            query: () => `/withdraw/getMyWithdrawalRequests`,
            providesTags: [{type: "Wallet"}]
        })

    })
})

export const {useGetMyWithdrawQuery} = getMyWithdraw