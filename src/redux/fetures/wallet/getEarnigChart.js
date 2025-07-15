const { apiSlice } = require("@/redux/api/apiSlice");


const influencerChart = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        influencerChart: builder.query({
            query: (selectedYear) => `/dashboard/influencerEarningsChart?year=${selectedYear}`,
            providesTags: [{type: "Profile"}]
        })

    })
})

export const {useInfluencerChartQuery} = influencerChart