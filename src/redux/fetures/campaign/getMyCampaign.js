
const { apiSlice } = require("@/redux/api/apiSlice");


const getMyCamaigns = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyCamaigns: builder.query({
            query: () => `campaigns/getMy-Campaigns`,
            providesTags: [{type: "Campaign"}]
        })

    })
})

export const {useGetMyCamaignsQuery} = getMyCamaigns