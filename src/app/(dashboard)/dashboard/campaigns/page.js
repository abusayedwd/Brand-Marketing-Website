"use client"

import CampaignForInfluencer from '@/components/Dashbord/component/campaign/CampaignForInfluencer';
import Campaigns from '@/components/Dashbord/component/campaign/Campain';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
import React from 'react';

const Page = () => {
    const { data: user, isLoading, isError } = useLogedUserQuery();

    // Show loading or error state while fetching user data
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
