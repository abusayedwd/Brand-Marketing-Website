


// 'use client';

// import React, { useState } from 'react';
// import { Button, Card, Tabs } from 'antd';
// import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
// import Link from 'next/link';
// import { useGetMyCamaignsQuery } from '@/redux/fetures/campaign/getMyCampaign';
 

// const { TabPane } = Tabs;

// const Campaigns = () => {

//  const {data: myCampaign} = useGetMyCamaignsQuery()
//  console.log(myCampaign)

//   const [campaigns, setCampaigns] = useState([
//     {
//       id: 1,
//       title: 'Holiday Music Campaign',
//       details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       influencerAssigned: 1000,
//       budget: '$1200',
//       timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
//       status: 'Waiting for approval',
//     },
//     {
//       id: 2,
//       title: 'Holiday Music Campaign',
//       details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       influencerAssigned: 1000,
//       budget: '$1200',
//       timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
//       status: 'Waiting for approval',
//     },
//     {
//       id: 3,
//       title: 'Holiday Music Campaign',
//       details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//       influencerAssigned: 1000,
//       budget: '$1200',
//       timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
//       status: 'Approved',
//     },
//   ]);

//   const image = '/images/campaign.png'; // Replace with actual image path

//   const renderCampaignCard = (campaign) => (
//     <Card
//       key={campaign.id}
//       className="bg-white shadow-lg rounded-lg mb-4"
//       hoverable
//     >
//       <div className="flex items-center mb-4">
//         <img alt={campaign.title} src={image} className="w-32 h-32 object-cover rounded-lg mr-4" />
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold">{campaign.title}</h3>
//             <span className="text-sm text-gray-500">{campaign.status}</span>
//           </div>
//           <p className="text-sm text-gray-700">{campaign.details}</p>
//           <p className="text-sm text-gray-500">{campaign.timeline}</p>
//           <div className="flex justify-between items-center mt-3">
//             <span className="text-gray-500">Influencer Assigned: {campaign.influencerAssigned}</span>
//             <span className="text-gray-500">Budget: {campaign.budget}</span>
//           </div>
//           <div className="mt-4 flex justify-end">
//             <Button
//               type="primary"
//               className="mr-2"
//               icon={<FileTextOutlined />}
//             >
//               View Details
//             </Button>
//             <Link href={`/dashboard/campaigns/edit-campaign`}>
//               <Button type="default" icon={<ClockCircleOutlined />}>
//               Edit
//               </Button>
//             </Link>
//             {campaign.status === 'Approved' && (
//               <Button type="default" icon={<CheckCircleOutlined />}>
//                 Completed
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Card>
//   );

//   return (
//     <div className="container mx-auto p-4">
//         <div>
//         <h2 className="text-xl text-sky-500 font-semibold mb-4">Campaigns</h2>
//         <div className="flex justify-end mb-4">
//             <Link className="text-blue-500 hover:text-blue-700 flex items-center p-0 group" href="/dashboard/campaigns/create-campaign">
              
//           <Button type="primary" className="ml-2">
//             Create Campaign
//           </Button>
//             </Link>
//         </div>
//         </div>
//       <div className="flex justify-between items-center mb-4">
//         <div></div>
//         <Tabs defaultActiveKey="1" size="large" className="w-full">
//           <TabPane tab="Upcoming Campaigns" key="1">
//             {campaigns
//               .filter((campaign) => campaign.status === 'Waiting for approval')
//               .map((campaign) => renderCampaignCard(campaign))}
//           </TabPane>
//           <TabPane tab="Active Campaigns" key="2">
//             {/* Render Active Campaigns */}
//           </TabPane>
//           <TabPane tab="Completed Campaigns" key="3">
//             {campaigns
//               .filter((campaign) => campaign.status === 'Approved')
//               .map((campaign) => renderCampaignCard(campaign))}
//           </TabPane>
//         </Tabs>
   
//       </div>
//     </div>
//   );
// };

// export default Campaigns;



'use client';

import React, { useState } from 'react';
import { Button, Card, Tabs } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useGetMyCamaignsQuery } from '@/redux/fetures/campaign/getMyCampaign';
import url from '@/redux/api/baseUrl';
import { useGetSingleCampaignQuery } from '@/redux/fetures/campaign/getSingleCampaign';

const { TabPane } = Tabs;

const Campaigns = () => {
  const { data: myCampaign, isLoading, error } = useGetMyCamaignsQuery();
  const campaignId = "68660a8c510ec5e125b312f6"; // Assuming you have a campaign ID to fetch details
  const {data: campaignData} = useGetSingleCampaignQuery(campaignId);
  console.log(campaignData)
  // Get campaigns from API data
  const campaigns = myCampaign?.data?.attributes?.results || [];

  const image =  url + '/uploads/users/camp-1751092725956.jpg'; // Replace with actual image path

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Handle the date format from API (DD-MM-YY)
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = `20${parts[2]}`; // Convert YY to YYYY
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  // Helper function to get status display text
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'upComming':
        return 'Waiting for approval';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  // Helper function to get campaign image
  const getCampaignImage = (campaign) => {
    if (campaign.image) {
      // Assuming your API serves images from a specific base URL
      return `/api/images/${campaign.image}` || image;
    }
    return image;
  };

  const renderCampaignCard = (campaign) => (
    <Card
      key={campaign.id}
      className="bg-white shadow-lg rounded-lg mb-4"
      hoverable
    >
      <div className="flex items-center mb-4">
        <img 
          alt={campaign.campaignName} 
          src={url + campaign?.image ? url + campaign?.image : image } 
          className="w-32 h-32 object-cover rounded-lg mr-4" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{campaign.campaignName}</h3>
            <span className="text-sm text-gray-500">{getStatusDisplay(campaign.status)}</span>
          </div>
          <p className="text-sm text-gray-700">{campaign.description}</p>
          <p className="text-sm text-gray-500">
            Timeline: {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
          </p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-500">
              Influencer Count: {campaign.influencerCount || 0}
            </span>
            <span className="text-gray-500">Budget: ${campaign.budget}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-500">
              Platforms: {campaign.selectedPlatforms?.join(', ') || 'N/A'}
            </span>
            <span className="text-gray-500">
              Total Amount: ${campaign.totalAmount || 0}
            </span>
          </div>
          <div className="mt-4 flex justify-end">
            <Link href={`/dashboard/campaigns/details/${campaign.id}`}>
            <Button
              type="primary"
              className="mr-2"
              icon={<FileTextOutlined />}
            >
              View Details
            </Button>
             </Link>
            <Link href={`/dashboard/campaigns/edit-campaign?id=${campaign.id}`}>
              <Button type="default" icon={<ClockCircleOutlined />} className="mr-2">
                Edit
              </Button>
            </Link>
            {campaign.status === 'completed' && (
              <Button type="default" icon={<CheckCircleOutlined />}>
                Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  // Filter campaigns by status
  const upcomingCampaigns = campaigns.filter(campaign => campaign.status === 'upComming');
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div>Loading campaigns...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading campaigns</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <h2 className="text-xl text-sky-500 font-semibold mb-4">Campaigns</h2>
        <div className="flex justify-end mb-4">
          <Link className="text-blue-500 hover:text-blue-700 flex items-center p-0 group" href="/dashboard/campaigns/create-campaign">
            <Button type="primary" className="ml-2">
              Create Campaign
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <Tabs defaultActiveKey="1" size="large" className="w-full">
          <TabPane tab={`Upcoming Campaigns (${upcomingCampaigns.length})`} key="1">
            {upcomingCampaigns.length > 0 ? (
              upcomingCampaigns.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No upcoming campaigns found
              </div>
            )}
          </TabPane>
          <TabPane tab={`Active Campaigns (${activeCampaigns.length})`} key="2">
            {activeCampaigns.length > 0 ? (
              activeCampaigns.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No active campaigns found
              </div>
            )}
          </TabPane>
          <TabPane tab={`Completed Campaigns (${completedCampaigns.length})`} key="3">
            {completedCampaigns.length > 0 ? (
              completedCampaigns.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No completed campaigns found
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Campaigns;