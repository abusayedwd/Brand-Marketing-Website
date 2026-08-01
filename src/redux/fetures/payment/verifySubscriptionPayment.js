import { apiSlice } from '@/redux/api/apiSlice';

const verifySubscriptionPayment = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifySubscriptionPayment: builder.mutation({
      query: (sessionId) => ({
        url: '/payments/verifySubscription',
        method: 'POST',
        body: { sessionId },
      }),
      invalidatesTags: [{ type: 'Profile' }],
    }),
  }),
});

export const { useVerifySubscriptionPaymentMutation } = verifySubscriptionPayment;
