


import { apiSlice } from "../../api/apiSlice";

const interestedCampaignInflu = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        interestedCampaignInflu : builder.mutation({
            query: (id) => ({
                url: `/campaigns/interested/${id}`,
                method: "POST",
            }),
            invalidatesTags:[{type:"Campaign"}]
        })
    })
})

export const {useInterestedCampaignInfluMutation} = interestedCampaignInflu;