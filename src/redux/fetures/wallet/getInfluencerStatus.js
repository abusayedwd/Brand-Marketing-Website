

const { apiSlice } = require("@/redux/api/apiSlice");


const getInfluencerStatus = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInfluencerStatus: builder.query({
            query: () => `/payments/influencer-status`,
            providesTags: [{type: "Profile"}]
        })

    })
})

export const {useGetInfluencerStatusQuery} = getInfluencerStatus