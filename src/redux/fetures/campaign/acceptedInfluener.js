import { apiSlice } from "../../api/apiSlice";

const acceptedInfluener = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        acceptedInfluener: builder.mutation({
            query: ({ campaignId, influencerId }) => {  // Corrected spelling here
                console.log("Campaign ID:", campaignId);  // Log campaignId
                console.log("Influencer ID:", influencerId);  // Log influencerId
                
                return {
                    url: `/campaigns/acceptInfluencer/${campaignId}`,
                    method: "POST",
                    body: { influencerId: influencerId }  // Corrected spelling here
                };
                
            },
            invalidatesTags:[{type:"Campaign"}]
        })
    })
});

export const { useAcceptedInfluenerMutation } = acceptedInfluener;

