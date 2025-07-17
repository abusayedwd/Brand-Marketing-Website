import { apiSlice } from "@/redux/api/apiSlice";

 

const payment = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        payment : builder.mutation({
            query: (data) => ({
                url: `/payments/pay`,
                method: "POST",
                body:  data
            }),
            invalidatesTags:[{type:"Campaign"}]
        })
    })
})

export const {usePaymentMutation} = payment;