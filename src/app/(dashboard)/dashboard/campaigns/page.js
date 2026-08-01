"use client"

import CampaignForInfluencer from '@/components/Dashbord/component/campaign/CampaignForInfluencer';
import Campaigns from '@/components/Dashbord/component/campaign/Campain';
import { useVerifyCampaignPaymentMutation } from '@/redux/fetures/campaign/verifyCampaignPayment';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
import {
  clearPendingCampaignSession,
  getPendingCampaignSession,
} from '@/utils/campaignPayment';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

const Page = () => {
    const { data: user, isLoading, isError } = useLogedUserQuery();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [verifyCampaignPayment] = useVerifyCampaignPaymentMutation();
    const verifyStarted = useRef(false);

    useEffect(() => {
        if (isLoading || isError || verifyStarted.current) {
            return;
        }

        const paymentStatus = searchParams.get('payment');
        const urlSessionId = searchParams.get('session_id');
        const storedSessionId = getPendingCampaignSession();
        const sessionId = urlSessionId || storedSessionId;

        if (paymentStatus === 'cancelled') {
            clearPendingCampaignSession();
            router.replace('/dashboard/campaigns');
            return;
        }

        if (!sessionId) {
            return;
        }

        verifyStarted.current = true;
        let cancelled = false;
        let attempts = 0;

        const runVerify = async () => {
            try {
                const result = await verifyCampaignPayment(sessionId).unwrap();
                const payload = result?.data?.attributes;

                if (payload?.ignored && payload?.reason === 'payment not completed') {
                    return false;
                }

                if (!cancelled) {
                    clearPendingCampaignSession();
                    toast.success('Campaign payment confirmed. Campaign is now active.');
                    router.replace('/dashboard/campaigns');
                }

                return true;
            } catch (error) {
                console.error('Campaign payment verification failed:', error);
                if (attempts >= 4 && !cancelled) {
                    toast.error('Payment received, but campaign activation failed. Refresh the page or try again.');
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
    }, [isLoading, isError, searchParams, verifyCampaignPayment, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading user data.</div>;
    }

    return (
        <div>
            {
                user?.data?.attributes?.role === "brand" ? (
                    <Campaigns />
                ) : (
                    <CampaignForInfluencer />
                )
            }
        </div>
    );
};

export default Page;
