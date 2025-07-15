const { apiSlice } = require("@/redux/api/apiSlice");


const brandEarningChart = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        brandEarningChart: builder.query({
            query: (selectedYear) => `dashboard/brandEariningChart?year=${selectedYear}`,
            providesTags: [{type: "Campaign"}]
        })

    })
})

export const {useBrandEarningChartQuery} = brandEarningChart