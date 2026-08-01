import { apiSlice } from '@/redux/api/apiSlice';
import { savePendingCampaignSession } from '@/utils/campaignPayment';

const resumeCampaignPayment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resumeCampaignPayment: builder.mutation({
      query: (campaignId) => ({
        url: `/campaigns/resumePayment/${campaignId}`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Campaign' }],
    }),
  }),
});

export const { useResumeCampaignPaymentMutation } = resumeCampaignPayment;

export const redirectToCampaignPayment = (sessionId, url) => {
  savePendingCampaignSession(sessionId);
  window.location.href = url;
};
