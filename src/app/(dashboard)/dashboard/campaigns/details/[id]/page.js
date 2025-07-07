"use client"

import CampaignDetailsPage from '@/components/Dashbord/component/campaign/CampaignDetailsPage';
import React from 'react';

const Page = ({ params }) => {
  const { id } = params;  // Access the id parameter from the URL params
  console.log(id);
  
//   console.log(id);  // This will log the 'id' from the URL

  return (
    <div>
        <CampaignDetailsPage id={id} />
    </div>
  );
};

export default Page;