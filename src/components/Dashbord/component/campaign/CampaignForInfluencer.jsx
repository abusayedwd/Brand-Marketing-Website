
'use client';

import React, { useState } from 'react';
import { Button, Card, Tabs } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
 
import getMediaUrl from '@/utils/getMediaUrl';
import { useGetMyCampaignQuery } from '@/redux/fetures/campaign/getMyCampaign';
import { useRouter } from 'next/navigation';
import { useUpcommingCampaignQuery } from '@/redux/fetures/campaign/upcommingCampaign';
import { useGetAcceptedCampaignsForInfluencerQuery } from '@/redux/fetures/campaign/getMyAcceptedCampaign';
import { useGetInterestedCampaignQuery } from '@/redux/fetures/campaign/getInterestedCampaign';
import { useGetMyCompletedCampaignsQuery } from '@/redux/fetures/campaign/getMyCompletedCampaigns';
import { LoginModal } from '@/components/customComponent/LoginModal';
import { CustomButton } from '@/components/customComponent/Button';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
 
 
 
const { TabPane } = Tabs;

const Campaigns = () => {


     const { data: loggedUser} = useLogedUserQuery()
  const isSubscribed = loggedUser?.data?.attributes?.isSubscribe;
  // console.log(loggedUser)

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const handleLogin = () => {
    // Implement your login logic here
    // This could redirect to login page or handle login in modal
    console.log('Redirect to login or handle login');
    setIsLoginModalVisible(false);
  };
  const { data: myCampaign, isLoading, error } = useUpcommingCampaignQuery();
  console.log(myCampaign);
  
  // Get campaigns from API data
  const campaigns = myCampaign?.data?.attributes?.results || [];

  const image = '/images/banner1.png';

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = `20${parts[2]}`;
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  const getStatusDisplay = (status, isPersonalComplete = false) => {
    if (isPersonalComplete) return 'Completed (by you)';
    switch (status) {
      case 'pending':
        return 'Payment Pending';
      case 'upComming':
        return 'Upcoming / Recruiting';
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

  const renderCampaignCard = (campaign, isPersonalComplete = false) => (
    <Card
      key={campaign.id}
      className="bg-white shadow-lg rounded-lg mb-4"
      hoverable
    >
      <div className="flex items-center mb-4">
        <img 
          alt={campaign.campaignName} 
          src={getMediaUrl(campaign?.image, image)} 
          className="w-32 h-32 object-cover rounded-lg mr-4" 
        />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{campaign.campaignName}</h3>
            <span className="text-sm text-gray-500">{getStatusDisplay(campaign.status, isPersonalComplete)}</span>
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


                  {loggedUser && isSubscribed === true ? ( 
                    <div>

   <Link className='' href={`/dashboard/campaigns/details?id=${campaign.id}`}>
      <CustomButton variant="primary" size="large">
        View Details
      </CustomButton>
    </Link>
                    </div>
  ) : (
    <>
    <div>

      <CustomButton
        variant="primary" 
        size="large"
        onClick={() => setIsLoginModalVisible(true)} // This will open the modal
      >
        View Details  
      </CustomButton>
    </div>

      {/* Modal for login or subscription when not logged in or not subscribed */}
      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
        onLogin={handleLogin}
        isSubscribed={isSubscribed}
        isLoggedIn={loggedUser}
      />
    </>
  )} 

            {/* <Link href={`/dashboard/campaigns/details?id=${campaign.id}`}>
            <Button
              type="primary"
              className="mr-2"
              icon={<FileTextOutlined />}
            >
              View Details
            </Button>
             </Link>  */}

            {isPersonalComplete && (
              <Button type="default" icon={<CheckCircleOutlined />}>
                Completed
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

 const {data: interesteCampaings} = useGetInterestedCampaignQuery()

  const {data:acceptedCampaigns} = useGetAcceptedCampaignsForInfluencerQuery()
  const { data: completedCampaignsData } = useGetMyCompletedCampaignsQuery()
  // console.log(acceptedCampaigns)
const acceptedCampaignn = acceptedCampaigns?.data?.attributes?.results || [];
const interesteCampaing = interesteCampaings?.data?.attributes?.results || [];
const completedCampaigns = completedCampaignsData?.data?.attributes?.results || [];
  // The backend (getUpcomingCampaignsForInfluecer) already returns only
  // still-recruiting campaigns (upComming or active with open slots), so don't
  // re-filter 'active' ones out here.
  const upcomingCampaigns = campaigns.filter(
    (campaign) => campaign.status === 'upComming' || campaign.status === 'active'
  );
  const activeCampaigns = acceptedCampaignn.filter(campaign => campaign.status === 'active');
  const acceptedCampaign = acceptedCampaignn.filter(
    (campaign) => campaign.status !== 'completed' && campaign.status !== 'pending'
  );

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


          <TabPane tab={`Interested Campaigns (${interesteCampaing.length})`} key="2">
            {interesteCampaing.length > 0 ? (
              interesteCampaing.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No Interested campaigns found
              </div>
            )}
          </TabPane>
          <TabPane tab={`AcceptedCampaign Campaigns (${acceptedCampaign.length})`} key="3">
            {acceptedCampaign.length > 0 ? (
              acceptedCampaign.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No active campaigns found
              </div>
            )}
          </TabPane>
          <TabPane tab={`Active Campaigns (${activeCampaigns.length})`} key="4">
            {activeCampaigns.length > 0 ? (
              activeCampaigns.map((campaign) => renderCampaignCard(campaign))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No active campaigns found
              </div>
            )}
          </TabPane>



          <TabPane tab={`Completed Campaigns (${completedCampaigns.length})`} key="5">
            {completedCampaigns.length > 0 ? (
              completedCampaigns.map((campaign) => renderCampaignCard(campaign, true))
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