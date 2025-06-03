

const { apiSlice } = require("@/redux/api/apiSlice");


const sigleInfluencer = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sigleInfluencer: builder.query({
            query: (id) => `/users/${id}`, 
        })

    })
})

export const {useSigleInfluencerQuery} = sigleInfluencer