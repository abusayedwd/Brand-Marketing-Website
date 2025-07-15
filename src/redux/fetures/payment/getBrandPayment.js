const { apiSlice } = require("@/redux/api/apiSlice");


const getBrandPayment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrandPayment: builder.query({
            query: () => `/dashboard/brandPayment`,
            providesTags: [{type: "Campaign"}]
        })

    })
})

export const {useGetBrandPaymentQuery} = getBrandPayment