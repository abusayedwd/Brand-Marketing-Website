// 'use client';

// import React, { useState } from 'react';
// import { Button, Card, Tabs } from 'antd';
// import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

// const { TabPane } = Tabs;

// const Campaigns = () => {
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
//       cover={<img alt={campaign.title} src={image} />}
//     >
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-lg font-semibold">{campaign.title}</h3>
//         <span className="text-sm text-gray-500">{campaign.status}</span>
//       </div>
//       <p className="text-sm text-gray-700">{campaign.details}</p>
//       <p className="text-sm text-gray-500">{campaign.timeline}</p>
//       <div className="flex justify-between items-center mt-3">
//         <span className="text-gray-500">Influencer Assigned: {campaign.influencerAssigned}</span>
//         <span className="text-gray-500">Budget: {campaign.budget}</span>
//       </div>
//       <div className="mt-4 flex justify-end">
//         <Button
//           type="primary"
//           className="mr-2"
//           icon={<FileTextOutlined />}
//         >
//           View Details
//         </Button>
//         {campaign.status === 'Waiting for approval' && (
//           <Button type="default" icon={<ClockCircleOutlined />}>
//             Approve
//           </Button>
//         )}
//         {campaign.status === 'Approved' && (
//           <Button type="default" icon={<CheckCircleOutlined />}>
//             Completed
//           </Button>
//         )}
//       </div>
//     </Card>
//   );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
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
//         <div className="flex justify-end mt-4">
//           <Button type="primary" className="ml-2">
//             Create Campaign
//           </Button>
//         </div>
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
 

const { TabPane } = Tabs;

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'Holiday Music Campaign',
      details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      influencerAssigned: 1000,
      budget: '$1200',
      timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
      status: 'Waiting for approval',
    },
    {
      id: 2,
      title: 'Holiday Music Campaign',
      details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      influencerAssigned: 1000,
      budget: '$1200',
      timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
      status: 'Waiting for approval',
    },
    {
      id: 3,
      title: 'Holiday Music Campaign',
      details: 'Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      influencerAssigned: 1000,
      budget: '$1200',
      timeline: 'Targeted Timeline: 24 January, 2025 - 30 January, 2025',
      status: 'Approved',
    },
  ]);

  const image = '/images/campaign.png'; // Replace with actual image path

  const renderCampaignCard = (campaign) => (
    <Card
      key={campaign.id}
      className="bg-white shadow-lg rounded-lg mb-4"
      hoverable
    >
      <div className="flex items-center mb-4">
        <img alt={campaign.title} src={image} className="w-32 h-32 object-cover rounded-lg mr-4" />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{campaign.title}</h3>
            <span className="text-sm text-gray-500">{campaign.status}</span>
          </div>
          <p className="text-sm text-gray-700">{campaign.details}</p>
          <p className="text-sm text-gray-500">{campaign.timeline}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="text-gray-500">Influencer Assigned: {campaign.influencerAssigned}</span>
            <span className="text-gray-500">Budget: {campaign.budget}</span>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="primary"
              className="mr-2"
              icon={<FileTextOutlined />}
            >
              View Details
            </Button>
            <Link href={`/dashboard/campaigns/edit-campaign`}>
              <Button type="default" icon={<ClockCircleOutlined />}>
              Edit
              </Button>
            </Link>
            {campaign.status === 'Approved' && (
              <Button type="default" icon={<CheckCircleOutlined />}>
                Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

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
          <TabPane tab="Upcoming Campaigns" key="1">
            {campaigns
              .filter((campaign) => campaign.status === 'Waiting for approval')
              .map((campaign) => renderCampaignCard(campaign))}
          </TabPane>
          <TabPane tab="Active Campaigns" key="2">
            {/* Render Active Campaigns */}
          </TabPane>
          <TabPane tab="Completed Campaigns" key="3">
            {campaigns
              .filter((campaign) => campaign.status === 'Approved')
              .map((campaign) => renderCampaignCard(campaign))}
          </TabPane>
        </Tabs>
   
      </div>
    </div>
  );
};

export default Campaigns;
