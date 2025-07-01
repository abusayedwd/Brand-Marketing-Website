

import { apiSlice } from "../../api/apiSlice";

const createCampaign = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCampaign : builder.mutation({
            query: (data) => ({
                url: `/campaigns/createCampaign`,
                method: "POST",
                body:  data
            })
        })
    })
})

export const {useCreateCampaignMutation} = createCampaign;