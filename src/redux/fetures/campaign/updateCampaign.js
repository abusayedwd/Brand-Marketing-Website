import { apiSlice } from "../../api/apiSlice";

const updateCampaign = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateCampaign : builder.mutation({
            query: ({data, id}) => ({
                url: `/campaigns/updateCampaign/${id}`,
                method: "PUT",
                body:  data
            }),
            invalidatesTags:[{type:"Campaign"}]
        })
    })
})

export const {useUpdateCampaignMutation} = updateCampaign;