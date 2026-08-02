// "use client";

// import { Card, Button } from 'antd';
// import { motion } from 'framer-motion';

// const PricingSection = () => {
//   const plans = [
//     {
//       name: 'Basic',
//       description: 'Build for individual user/need With strong to build for leaders.',
//       price: 'Free',
//       features: [
//         'Up time Company: August 2020 and Week',
//         '50 Results Per Search',
//         '1 Member Certificate: Week',
//         '5 Most Actions Exam Back',
//         'Free Shipping Discount',
//         'Unlimited Projects',
//         'Forget Access to our design system',
//         'Create Internet-of-Thome on displays'
//       ],
//       highlight: false
//     },
//     {
//       name: 'Professional',
//       description: 'Build for individual who need more advanced features and...',
//       price: '$29',
//       features: [
//         'Under Thea',
//         'Expand & Collection Exclusive',
//         'Get Card Discount',
//         'Headache Widgets',
//         'Find him All',
//         'Insert Access to our design system',
//         'Create Internet-of-Thome on displays'
//       ],
//       highlight: true
//     },
//     {
//       name: 'Enterprise',
//       description: 'Build for business with needed permissions over more steps...',
//       price: '$99',
//       features: [
//         'Remove Brewing',
//         'Access to XOon Hero Gate Images',
//         'Upload custom icons and fonts',
//         'Unlimited Spring',
//         'View graphics & video in up to 4k',
//         'Unlimited Projects',
//         'Insert Access to our design system',
//         'Create Internet-of-Thome on displays'
//       ],
//       highlight: false
//     }
//   ];

//   return (
//     <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Powerful features for powerful creators</h1>
//           <p className="text-xl text-gray-600">Choose a plan that's right for you.</p>
//           <div className="mt-8 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent w-1/2 mx-auto" />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ y: -10 }}
//               transition={{ type: 'spring', stiffness: 300 }}
//             >
//               <Card
//                 className={`h-full border-2 ${plan.highlight ? 'border-blue-500' : 'border-gray-200'} rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
//                 bodyStyle={{ padding: 0 }}
//               >
//                 <div className={`p-6 ${plan.highlight ? 'bg-blue-50' : 'bg-white'}`}>
//                   <div className="text-center mb-6">
//                     <h2 className="text-2xl font-semibold text-gray-800">{plan.name}</h2>
//                     <p className="text-gray-600 mt-2">{plan.description}</p>
//                   </div>

//                   <div className="text-center mb-8">
//                     <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
//                     {plan.price !== 'Free' && <span className="text-gray-500">/mo</span>}
//                   </div>

//                   <div className="mb-8">
//                     <ul className="space-y-3">
//                       {plan.features.map((feature, i) => (
//                         <li key={i} className="flex items-start">
//                           <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                           <span className="text-gray-700">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <div className="text-center">
//                     <Button
//                       type={plan.highlight ? 'primary' : 'default'}
//                       size="large"
//                       className={`w-full ${plan.highlight ? 'bg-blue-600' : ''}`}
//                     >
//                       Get Started Now
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingSection;


"use client";

import { Card, Button } from 'antd';
import { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePaymentMutation } from '@/redux/fetures/payment/payment';
import { useVerifySubscriptionPaymentMutation } from '@/redux/fetures/payment/verifySubscriptionPayment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
import {
  clearPendingSubscriptionSession,
  getPendingSubscriptionSession,
  savePendingSubscriptionSession,
} from '@/utils/subscriptionPayment';
import { toast } from 'react-hot-toast';
import { useGetPlansQuery } from '@/redux/fetures/plans/plans';

const PricingSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verifyStarted = useRef(false);
  const { data: plansData } = useGetPlansQuery();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  const { data: loggedUser, isLoading: isUserLoading } = useLogedUserQuery();
  const [payment, { isLoading }] = usePaymentMutation();
  const [verifySubscriptionPayment] = useVerifySubscriptionPaymentMutation();

  useEffect(() => {
    if (isUserLoading || verifyStarted.current) {
      return;
    }

    const paymentStatus = searchParams.get('payment');
    const urlSessionId = searchParams.get('session_id');
    const storedSessionId = getPendingSubscriptionSession();
    const sessionId = urlSessionId || storedSessionId;

    if (paymentStatus === 'cancelled') {
      clearPendingSubscriptionSession();
      router.replace('/pricing');
      return;
    }

    if (!sessionId || paymentStatus !== 'success') {
      return;
    }

    verifyStarted.current = true;
    let cancelled = false;
    let attempts = 0;

    const runVerify = async () => {
      try {
        const result = await verifySubscriptionPayment(sessionId).unwrap();
        const payload = result?.data?.attributes;

        if (payload?.ignored && payload?.reason === 'payment not completed') {
          return false;
        }

        if (!cancelled) {
          clearPendingSubscriptionSession();
          toast.success('Subscription activated successfully.');
          router.replace('/dashboard');
        }

        return true;
      } catch (error) {
        console.error('Subscription verification failed:', error);
        if (attempts >= 4 && !cancelled) {
          toast.error('Payment received, but subscription activation failed.');
        }
        return false;
      }
    };

    const pollVerification = async () => {
      let completed = await runVerify();

      while (!completed && !cancelled && attempts < 15) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        attempts += 1;
        completed = await runVerify();
      }
    };

    pollVerification();

    return () => {
      cancelled = true;
    };
  }, [isUserLoading, searchParams, verifySubscriptionPayment, router]);

  const apiPlans = plansData?.data?.attributes || [];
  const plans =
    apiPlans.length > 0
      ? apiPlans.map((p) => ({
          name: p.name,
          description: p.description,
          price: `${p.price}`,
          priceLabel: `€${p.price}`,
          features: p.features || [],
          highlight: !!p.isPopular,
          durationDays: p.durationDays || 30,
        }))
      : [
          {
            name: 'Starter',
            description: 'Essential access for creators and brands getting started.',
            price: '19',
            priceLabel: '€19',
            features: ['Campaign access', 'Messaging', 'Basic analytics'],
            highlight: false,
            durationDays: 30,
          },
          {
            name: 'Pro',
            description: 'For growing teams that need more visibility and campaigns.',
            price: '49',
            priceLabel: '€49',
            features: ['Everything in Starter', 'Priority listing', 'Advanced analytics'],
            highlight: true,
            durationDays: 30,
          },
          {
            name: 'Business',
            description: 'Full marketplace power for serious brands and agencies.',
            price: '99',
            priceLabel: '€99',
            features: ['Everything in Pro', 'Dedicated support', 'Unlimited campaigns'],
            highlight: false,
            durationDays: 30,
          },
        ];

  const handleButtonClick = async (plan) => {
    const data = {
      planName: plan.name,
      price: Number(plan.price),
      duration: `${plan.durationDays || 30} days`,
    };

    try {
      const response = await payment(data).unwrap();
      if (response.statusCode === 201) {
        savePendingSubscriptionSession(response.sessionId);
        toast.success('Redirecting to Stripe for payment...');
        window.location.href = response.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Could not start subscription payment.');
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Plans built for brands & creators</h1>
          <p className="text-xl text-gray-600">Choose a plan that's right for you.</p>
          <div className="mt-8 h-1 bg-gradient-to-r from-transparent via-emerald-200 to-transparent w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name || index}
              data-aos="zoom-out-up"
              data-aos-delay={index * 100}
            >
              <Card
                className={`h-full border-2 ${plan.highlight ? 'border-emerald-500' : 'border-gray-200'} rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300`}
                bodyStyle={{ padding: 0 }}
              >
                <div className={`p-6 ${plan.highlight ? 'bg-emerald-50' : 'bg-white'}`}>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{plan.name}</h2>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <div className="text-center mb-8">
                    <span className="text-4xl font-bold text-gray-900">{plan.priceLabel || `€${plan.price}`}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>

                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-center">
                    <Button
                      type={plan.highlight ? 'primary' : 'default'}
                      size="large"
                      className={`w-full ${plan.highlight ? '!bg-emerald-700' : ''}`}
                      loading={isLoading}
                      onClick={() => handleButtonClick(plan)}
                    >
                      Get Started Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
