

const { apiSlice } = require("@/redux/api/apiSlice");


const getMyWallet = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyWallet: builder.query({
            query: () => `withdraw/my-wallet`,
            providesTags: [{type: "Wallet"}]
        })

    })
})

export const {useGetMyWalletQuery} = getMyWallet