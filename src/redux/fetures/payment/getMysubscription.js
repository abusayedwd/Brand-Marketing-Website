


const { apiSlice } = require("@/redux/api/apiSlice");


const getMysubscription = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMysubscription: builder.query({
            query: () => `/payments/getMySubscription`,
            providesTags: [{type: "Campaign"}]
        }) 
    })
})

export const {useGetMysubscriptionQuery} = getMysubscription