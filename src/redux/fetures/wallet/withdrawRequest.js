

import { apiSlice } from "../../api/apiSlice";

const withdreawRequest = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        withdreawRequest : builder.mutation({
            query: (data) => ({
                url: `/withdraw//request-withdrawal`,
                method: "POST",
                body:  data
            })
        })
    })
})

export const {useWithdreawRequestMutation} = withdreawRequest;