
"use client"
import CampaignDetailsPage from '@/components/Dashbord/component/campaign/CampaignDetailsPage';
 
import React, { useEffect, useState } from 'react';

const page = () => {
    
    const [id, setId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get('id') || '');
  }, []); // Empty array ensures this runs only once on mount

   

    return (
        <div>
            <CampaignDetailsPage id = {id} />
        </div> 
    );
};

export default page;