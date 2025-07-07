
import { apiSlice } from "../../api/apiSlice";

const acceptedInfluener = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        acceptedInfluener: builder.mutation({
            query: ({id,influenerId}) => ({
                url: `/campaigns/acceptInfluencer/${id}`,
                method: "POST",
                body: influenerId
            })
        })
    })
})

export const {useAcceptedInfluenerMutation} = acceptedInfluener;