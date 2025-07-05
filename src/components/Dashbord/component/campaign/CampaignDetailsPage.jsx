"use client";


import React, { useState } from 'react';
import { Card, Tabs, Button, Avatar, Badge, Tag, Divider, Row, Col, Typography, Space } from 'antd';
import { 
  UserOutlined, 
  FacebookOutlined, 
  InstagramOutlined, 
  YoutubeOutlined, 
  TikTokOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useGetSingleCampaignQuery } from '@/redux/fetures/campaign/getSingleCampaign';
 

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const CampaignDetailsPage = ({campaignId}) => {
 
    // Assuming id is passed as a prop
  
const {data: campaignData} = useGetSingleCampaignQuery(campaignId);

console.log('dataaaaa',campaignData)

//   const campaignData = {
//     "code": 200,
//     "data": {
//       "attributes": {
//         "budget": 1,
//         "brandId": {
//           "fullName": "Testing Brand",
//           "userName": "",
//           "email": "brand@gmail.com",
//           "phoneNumber": "01735566789",
//           "image": {
//             "url": "/uploads/users/users-1748606204040.jpg",
//             "path": "null"
//           },
//           "role": "brand",
//           "walletBalance": 0,
//           "rand": 0,
//           "dateOfBirth": "22-04-25",
//           "interests": [],
//           "bio": "",
//           "address": "",
//           "companyName": "",
//           "industry": "",
//           "website": "",
//           "companyDescription": "",
//           "previousExperience": "none",
//           "oneTimeCode": null,
//           "planName": "Abonnement Marques",
//           "isEmailVerified": true,
//           "acceptTerms": false,
//           "isResetPassword": false,
//           "isInterest": false,
//           "isSubscribe": true,
//           "isProfileCompleted": false,
//           "isDeleted": false,
//           "subscriptionId": "68666148a011eed613a34a5b",
//           "socialMedia": [],
//           "createdAt": "2025-06-30T12:09:35.138Z",
//           "updatedAt": "2025-07-03T10:54:21.012Z",
//           "id": "68627e7f93d9614796dd2215"
//         },
//         "campaignName": "new cammddd",
//         "status": "upComming",
//         "description": "A campaign for the summer season promoting our new products.",
//         "endDate": "05-07-25",
//         "influencerCount": 2,
//         "selectedPlatforms": [
//           "[\"Instagram\", \"YouTube\", \"TikTok\"]"
//         ],
//         "startDate": "03-07-25",
//         "totalAmount": 2,
//         "image": "/uploads/users/home2-1751444423119.jpg",
//         "interestedInfluencers": [
//           {
//             "fullName": "abContent",
//             "userName": "abuser",
//             "email": "abu@gmail.com",
//             "phoneNumber": "065465334435",
//             "image": {
//               "url": "/uploads/users/users-1748606204040.jpg",
//               "path": "null"
//             },
//             "role": "influencer",
//             "walletBalance": 0,
//             "rand": 0,
//             "dateOfBirth": "Thu Jun 16 2022 06:00:00 GMT+0600 (Bangladesh Standard Time)",
//             "socialMedia": [
//               {
//                 "platform": "Facebook",
//                 "url": "afdfdf",
//                 "followers": "34k",
//                 "_id": "68689d742525f04c0130cfd1"
//               },
//               {
//                 "platform": "Instagram",
//                 "url": "dfdsf dfdfdsf",
//                 "followers": "77k",
//                 "_id": "68689d742525f04c0130cfd2"
//               },
//               {
//                 "platform": "YouTube",
//                 "url": "df dsaffdsf",
//                 "followers": "22k",
//                 "_id": "68689d742525f04c0130cfd3"
//               }
//             ],
//             "interests": [
//               "Fashion & Style",
//               "Food & Cooking",
//               "Gaming"
//             ],
//             "bio": "",
//             "address": "",
//             "companyName": "",
//             "industry": "",
//             "website": "",
//             "companyDescription": "",
//             "previousExperience": "none",
//             "oneTimeCode": null,
//             "planName": "no-plan",
//             "isEmailVerified": true,
//             "acceptTerms": false,
//             "isResetPassword": false,
//             "isInterest": false,
//             "isSubscribe": false,
//             "isProfileCompleted": false,
//             "isDeleted": false,
//             "subscriptionId": null,
//             "createdAt": "2025-07-05T03:35:16.183Z",
//             "updatedAt": "2025-07-05T03:35:36.363Z",
//             "id": "68689d742525f04c0130cfd0"
//           }
//         ],
//         "acceptedInfluencers": [
//           {
//             "fullName": "abContent",
//             "userName": "abuser",
//             "email": "abu@gmail.com",
//             "phoneNumber": "065465334435",
//             "image": {
//               "url": "/uploads/users/users-1748606204040.jpg",
//               "path": "null"
//             },
//             "role": "influencer",
//             "walletBalance": 0,
//             "rand": 0,
//             "dateOfBirth": "Thu Jun 16 2022 06:00:00 GMT+0600 (Bangladesh Standard Time)",
//             "socialMedia": [
//               {
//                 "platform": "Facebook",
//                 "url": "afdfdf",
//                 "followers": "34k",
//                 "_id": "68689d742525f04c0130cfd1"
//               },
//               {
//                 "platform": "Instagram",
//                 "url": "dfdsf dfdfdsf",
//                 "followers": "77k",
//                 "_id": "68689d742525f04c0130cfd2"
//               },
//               {
//                 "platform": "YouTube",
//                 "url": "df dsaffdsf",
//                 "followers": "22k",
//                 "_id": "68689d742525f04c0130cfd3"
//               }
//             ],
//             "interests": [
//               "Fashion & Style",
//               "Food & Cooking",
//               "Gaming"
//             ],
//             "bio": "",
//             "address": "",
//             "companyName": "",
//             "industry": "",
//             "website": "",
//             "companyDescription": "",
//             "previousExperience": "none",
//             "oneTimeCode": null,
//             "planName": "no-plan",
//             "isEmailVerified": true,
//             "acceptTerms": false,
//             "isResetPassword": false,
//             "isInterest": false,
//             "isSubscribe": false,
//             "isProfileCompleted": false,
//             "isDeleted": false,
//             "subscriptionId": null,
//             "createdAt": "2025-07-05T03:35:16.183Z",
//             "updatedAt": "2025-07-05T03:35:36.363Z",
//             "id": "68689d742525f04c0130cfd0"
//           },
//           {
//             "fullName": "Testing influencer",
//             "userName": "",
//             "email": "influencer@gmail.com",
//             "phoneNumber": "01734456873",
//             "image": {
//               "url": "/uploads/users/users-1748606204040.jpg",
//               "path": "null"
//             },
//             "role": "influencer",
//             "walletBalance": 0,
//             "rand": 0,
//             "dateOfBirth": "22-04-25",
//             "interests": [],
//             "bio": "",
//             "address": "",
//             "companyName": "",
//             "industry": "",
//             "website": "",
//             "companyDescription": "",
//             "previousExperience": "none",
//             "oneTimeCode": null,
//             "planName": "no-plan",
//             "isEmailVerified": true,
//             "acceptTerms": false,
//             "isResetPassword": false,
//             "isInterest": false,
//             "isSubscribe": false,
//             "isProfileCompleted": false,
//             "isDeleted": false,
//             "subscriptionId": null,
//             "socialMedia": [],
//             "createdAt": "2025-06-30T12:09:35.138Z",
//             "updatedAt": "2025-06-30T12:23:18.657Z",
//             "id": "68627e7f93d9614796dd2216"
//           }
//         ],
//         "drafts": [],
//         "updatedAt": "2025-07-05T10:46:02.742Z",
//         "id": "6864ebdb10ec5a7b208eb2cb"
//       }
//     }
//   };



  const campaign = campaignData?.data?.attributes;
  const [activeTab, setActiveTab] = useState('accepted');

  const getSocialMediaIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <FacebookOutlined className="text-blue-600" />;
      case 'instagram':
        return <InstagramOutlined className="text-pink-600" />;
      case 'youtube':
        return <YoutubeOutlined className="text-red-600" />;
      case 'tiktok':
        return <TikTokOutlined className="text-black" />;
      default:
        return <GlobalOutlined className="text-gray-600" />;
    }
  };

  const getPlatformTags = (platforms) => {
    try {
      const platformArray = JSON.parse(platforms[0]);
      return platformArray.map(platform => (
        <Tag key={platform} icon={getSocialMediaIcon(platform)} className="mb-2">
          {platform}
        </Tag>
      ));
    } catch {
      return <Tag>Unknown Platform</Tag>;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'upComming': { status: 'processing', text: 'Upcoming' },
      'active': { status: 'success', text: 'Active' },
      'completed': { status: 'default', text: 'Completed' },
      'cancelled': { status: 'error', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || statusConfig['upComming'];
    return <Badge status={config.status} text={config.text} />;
  };

  const handleAcceptInfluencer = (influencerId) => {
    console.log('Accepting influencer:', influencerId);
    // Add your accept logic here
  };

  const handleDenyInfluencer = (influencerId) => {
    console.log('Denying influencer:', influencerId);
    // Add your deny logic here
  };

  const InfluencerCard = ({ influencer, showActions = false }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <Avatar
            size={64}
            src={influencer.image.url}
            icon={<UserOutlined />}
            className="border-2 border-gray-200"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Title level={4} className="m-0">{influencer.fullName}</Title>
              {influencer.userName && (
                <Text type="secondary">@{influencer.userName}</Text>
              )}
            </div>
            
            <div className="mb-3">
              <Text type="secondary" className="block">{influencer.email}</Text>
              <Text type="secondary" className="block">{influencer.phoneNumber}</Text>
            </div>

            {/* Social Media */}
            {influencer.socialMedia && influencer.socialMedia.length > 0 && (
              <div className="mb-3">
                <Text strong className="block mb-2">Social Media:</Text>
                <div className="flex flex-wrap gap-2">
                  {influencer.socialMedia.map((social, index) => (
                    <div key={index} className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      {getSocialMediaIcon(social.platform)}
                      <span className="ml-2 text-sm font-medium">{social.platform}</span>
                      <span className="ml-2 text-xs text-gray-500">{social.followers} followers</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests */}
            {influencer.interests && influencer.interests.length > 0 && (
              <div className="mb-3">
                <Text strong className="block mb-2">Interests:</Text>
                <div className="flex flex-wrap gap-1">
                  {influencer.interests.map((interest, index) => (
                    <Tag key={index} color="blue" className="text-xs">
                      {interest}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleAcceptInfluencer(influencer.id)}
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              Accept
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={() => handleDenyInfluencer(influencer.id)}
            >
              Deny
            </Button>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
  
        <Title level={1} className="mb-6">Campaign Details</Title>

      <div className="max-w-7xl mx-auto">
        {/* Campaign Header */}
        <Card className="mb-6 shadow-lg">
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <div className="text-center md:text-left">
                <img
                  src={campaign.image}
                  alt={campaign.campaignName}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              </div>
            </Col>
            <Col xs={24} md={16}>
              <div className="h-full flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <Title level={2} className="m-0">{campaign.campaignName}</Title>
                  {getStatusBadge(campaign.status)}
                </div>
                
                <Paragraph className="text-lg text-gray-600 mb-4">
                  {campaign.description}
                </Paragraph>

                <Row gutter={16} className="mb-4">
                  <Col xs={12} sm={6}>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <CalendarOutlined className="text-2xl text-blue-600 mb-2" />
                      <div className="text-sm text-gray-600">Start Date</div>
                      <div className="font-semibold">{campaign.startDate}</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <CalendarOutlined className="text-2xl text-red-600 mb-2" />
                      <div className="text-sm text-gray-600">End Date</div>
                      <div className="font-semibold">{campaign.endDate}</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <DollarOutlined className="text-2xl text-green-600 mb-2" />
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="font-semibold">${campaign.budget}</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={6}>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <TeamOutlined className="text-2xl text-purple-600 mb-2" />
                      <div className="text-sm text-gray-600">Influencers</div>
                      <div className="font-semibold">{campaign.influencerCount}</div>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <Text strong className="block mb-2">Platforms:</Text>
                  <div className="flex flex-wrap gap-2">
                    {getPlatformTags(campaign.selectedPlatforms)}
                  </div>
                </div>

                {/* Brand Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Text strong className="block mb-2">Brand Information:</Text>
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={campaign.brandId.image.url}
                      icon={<UserOutlined />}
                      size={40}
                    />
                    <div>
                      <div className="font-semibold">{campaign.brandId.fullName}</div>
                      <div className="text-sm text-gray-600">{campaign.brandId.email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Influencers Tabs */}
        <Card className="shadow-lg">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            className="min-h-96"
          >
            <TabPane
              tab={
                <span className="text-lg">
                  <CheckOutlined className="mr-2" />
                  Accepted Influencers ({campaign.acceptedInfluencers.length})
                </span>
              }
              key="accepted"
            >
              <div className="py-4">
                {campaign.acceptedInfluencers.length > 0 ? (
                  campaign.acceptedInfluencers.map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      showActions={false}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <TeamOutlined className="text-6xl text-gray-300 mb-4" />
                    <Title level={4} type="secondary">No accepted influencers yet</Title>
                    <Text type="secondary">Influencers you accept will appear here</Text>
                  </div>
                )}
              </div>
            </TabPane>
            
            <TabPane
              tab={
                <span className="text-lg">
                  <UserOutlined className="mr-2" />
                  Interested Influencers ({campaign.interestedInfluencers.length})
                </span>
              }
              key="interested"
            >
              <div className="py-4">
                {campaign.interestedInfluencers.length > 0 ? (
                  campaign.interestedInfluencers.map((influencer) => (
                    <InfluencerCard
                      key={influencer.id}
                      influencer={influencer}
                      showActions={true}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <UserOutlined className="text-6xl text-gray-300 mb-4" />
                    <Title level={4} type="secondary">No interested influencers yet</Title>
                    <Text type="secondary">Influencers interested in your campaign will appear here</Text>
                  </div>
                )}
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;