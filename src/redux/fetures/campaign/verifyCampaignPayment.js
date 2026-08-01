import { apiSlice } from '@/redux/api/apiSlice';

const verifyCampaignPayment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyCampaignPayment: builder.mutation({
      query: (payload) => ({
        url: '/campaigns/verifyCampaignPayment',
        method: 'POST',
        body: typeof payload === 'string' ? { sessionId: payload } : payload,
      }),
      invalidatesTags: [{ type: 'Campaign' }],
    }),
  }),
});

export const { useVerifyCampaignPaymentMutation } = verifyCampaignPayment;
