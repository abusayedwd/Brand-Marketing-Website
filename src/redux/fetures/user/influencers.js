const { apiSlice } = require("@/redux/api/apiSlice");


const getInfluencers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInfluencers: builder.query({
            query: () => `/users?role=influencer`,
            // query: ({  socialMedia, fullName, interests }) => `/users?role=influencer&interests=${interests}&socialMedia=${socialMedia}&fullName=${fullName}`,
            providesTags: [{type: "Profile"}]
        })

    })
})

export const {useGetInfluencersQuery} = getInfluencers