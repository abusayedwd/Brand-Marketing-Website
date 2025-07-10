// "use client";

// import React, { useState } from "react";
// import {
//   Card,
//   Tabs,
//   Button,
//   Avatar,
//   Badge,
//   Tag,
//   Divider,
//   Row,
//   Col,
//   Typography,
//   Space,
// } from "antd";
// import {
//   UserOutlined,
//   FacebookOutlined,
//   InstagramOutlined,
//   YoutubeOutlined,
//   TikTokOutlined,
//   CheckOutlined,
//   CloseOutlined,
//   CalendarOutlined,
//   DollarOutlined,
//   TeamOutlined,
//   GlobalOutlined,
// } from "@ant-design/icons";

// import { CloudCog } from "lucide-react";
// import { useGetSingleCampaignQuery } from "@/redux/fetures/campaign/getSingleCampaign";
// import url from "@/redux/api/baseUrl";
// import { useAcceptedInfluenerMutation } from "@/redux/fetures/campaign/acceptedInfluener";
// import toast from "react-hot-toast";

// const { Title, Text, Paragraph } = Typography;
// const { TabPane } = Tabs;

// const CampaignDetailsPage = ({ id }) => {
//   console.log("Campaign ID:", id);
//   const [activeTab, setActiveTab] = useState("accepted");
//   const {
//     data: campaignData,
//     isLoading,
//     error,
//   } = useGetSingleCampaignQuery(id);

//   console.log("Campaign Data:", campaignData);
//   console.log("Is Loading:", isLoading);
//   console.log("Error:", error);

//   // Handle loading state
//   if (isLoading) {
//     return (
//       <div>
//         <h2>Loading campaign details...</h2>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div>
//         <h2>Error loading campaign</h2>
//         <p>{error.message || "Something went wrong"}</p>
//       </div>
//     );
//   }

//   // Handle no data
//   if (!campaignData || !campaignData.data || !campaignData.data.attributes) {
//     return (
//       <div>
//         <h2>No campaign data found</h2>
//         <p>Campaign ID: {id}</p>
//       </div>
//     );
//   }

//   // Extract campaign data
//   const campaign = campaignData?.data?.attributes;
//   console.log(campaign);

//   const getSocialMediaIcon = (platform) => {
//     switch (platform.toLowerCase()) {
//       case "facebook":
//         return <FacebookOutlined className="text-blue-600" />;
//       case "instagram":
//         return <InstagramOutlined className="text-pink-600" />;
//       case "youtube":
//         return <YoutubeOutlined className="text-red-600" />;
//       case "tiktok":
//         return <TikTokOutlined className="text-black" />;
//       default:
//         return <GlobalOutlined className="text-gray-600" />;
//     }
//   };

//   const getPlatformTags = (platforms) => {
//     try {
//       if (!platforms || platforms.length === 0) {
//         return <Tag>No platforms selected</Tag>;
//       }

//       const platformArray = JSON.parse(platforms[0]);
//       return platformArray.map((platform) => (
//         <Tag
//           key={platform}
//           icon={getSocialMediaIcon(platform)}
//           className="mb-2"
//         >
//           {platform}
//         </Tag>
//       ));
//     } catch (error) {
//       console.error("Error parsing platforms:", error);
//       return <Tag>Unknown Platform</Tag>;
//     }
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       upComming: { status: "processing", text: "Upcoming" },
//       active: { status: "success", text: "Active" },
//       completed: { status: "default", text: "Completed" },
//       cancelled: { status: "error", text: "Cancelled" },
//     };

//     const config = statusConfig[status] || statusConfig["upComming"];
//     return <Badge status={config.status} text={config.text} />;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch (error) {
//       return dateString;
//     }
//   };
 

//   const InfluencerCard = ({ influencer, id, showActions = false }) => {
//     console.log(id);
//     // const campaignId = id;
//     const handleAcceptInfluencer = async (influencerId, ) => {
//       console.log("Campaign ID:", id);
//       console.log("Accepting influencer:", influencerId);
//       try{
//         const res = await accepted({id, influencerId}).unwrap();
//         console.log(res)
//         if(res.code === 200){
//           toast.success("accepted influencer")
//         }

//       }catch(error){
//         console.log(error.message)
//       }
//     };

//     const handleDenyInfluencer = (influencerId) => {
//       console.log("Denying influencer:", influencerId);
//        console.log("Campaign ID:", id);
//       // Add your deny logic here
//     };

//     return (
//       <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
//         <div className="flex items-start justify-between">
//           <div className="flex items-start space-x-4">
//             <Avatar
//               size={64}
//               src={influencer.image?.url}
//               icon={<UserOutlined />}
//               className="border-2 border-gray-200"
//             />
//             <div className="flex-1">
//               <div className="flex items-center space-x-2 mb-2">
//                 <Title level={4} className="m-0">
//                   {influencer.fullName || "Unknown Influencer"}
//                 </Title>
//                 {influencer.userName && (
//                   <Text type="secondary">@{influencer.userName}</Text>
//                 )}
//               </div>

//               <div className="mb-3">
//                 <Text type="secondary" className="block">
//                   {influencer.email}
//                 </Text>
//                 <Text type="secondary" className="block">
//                   {influencer.phoneNumber}
//                 </Text>
//               </div>

//               {/* Social Media */}
//               {influencer.socialMedia?.length > 0 ? (
//                 <div className="mb-3">
//                   <Text strong className="block mb-2">
//                     Social Media:
//                   </Text>
//                   <div className="flex flex-wrap gap-2">
//                     {influencer.socialMedia.map((social, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center bg-gray-50 px-3 py-1 rounded-full"
//                       >
//                         {getSocialMediaIcon(social.platform)}
//                         <span className="ml-2 text-sm font-medium">
//                           {social.platform}
//                         </span>
//                         <span className="ml-2 text-xs text-gray-500">
//                           {social.followers} followers
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-3">
//                   <Text type="secondary" className="block">
//                     No social media profiles linked
//                   </Text>
//                 </div>
//               )}

//               {/* Interests */}
//               {influencer.interests?.length > 0 ? (
//                 <div className="mb-3">
//                   <Text strong className="block mb-2">
//                     Interests:
//                   </Text>
//                   <div className="flex flex-wrap gap-1">
//                     {influencer.interests.map((interest, index) => (
//                       <Tag key={index} color="blue" className="text-xs">
//                         {interest}
//                       </Tag>
//                     ))}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="mb-3">
//                   <Text type="secondary" className="block">
//                     No interests specified
//                   </Text>
//                 </div>
//               )}

//               {/* Additional Info */}
//               <div className="text-sm text-gray-500">
//                 <div>Plan: {influencer.planName || "N/A"}</div>
//                 <div>Wallet Balance: ${influencer.walletBalance || 0}</div>
//                 <div>Experience: {influencer.previousExperience || "N/A"}</div>
//               </div>
//             </div>
//           </div>

//           {showActions && (
//             <div className="flex space-x-2">
//               <Button
//                 type="primary"
//                 icon={<CheckOutlined />}
//                 onClick={() =>
//                   handleAcceptInfluencer(influencer.id)
//                 } // Pass both influencer.id and campaignId
//                 className="bg-green-500 hover:bg-green-600 border-green-500"
//               >
//                 Accept
//               </Button>

//               <Button
//                 danger
//                 icon={<CloseOutlined />}
//                 onClick={() => handleDenyInfluencer(influencer.id)}
//               >
//                 Deny
//               </Button>
//             </div>
//           )}
//         </div>
//       </Card>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <Title level={1} className="mb-6">
//         Campaign Details
//       </Title>

//       <div className="max-w-7xl mx-auto">
//         {/* Campaign Header */}
//         <Card className="mb-6 shadow-lg">
//           <Row gutter={24}>
//             <Col xs={24} md={8}>
//               <div className="text-center md:text-left">
//                 <img
//                   src={url + campaign.image || "/placeholder-image.jpg"}
//                   alt={campaign.campaignName || "Campaign"}
//                   className="w-full h-80 object-cover rounded-lg mb-4"
//                 />
//               </div>
//             </Col>
//             <Col xs={24} md={16}>
//               <div className="h-full flex flex-col justify-center">
//                 <div className="flex items-center justify-between mb-4">
//                   <Title level={2} className="m-0">
//                     {campaign.campaignName || "Untitled Campaign"}
//                   </Title>
//                   {getStatusBadge(campaign.status)}
//                 </div>

//                 <Paragraph className="text-lg text-gray-600 mb-4">
//                   {campaign.description || "No description available"}
//                 </Paragraph>

//                 <Row gutter={16} className="mb-4">
//                   <Col xs={12} sm={6}>
//                     <div className="text-center p-3 bg-blue-50 rounded-lg">
//                       <CalendarOutlined className="text-2xl text-blue-600 mb-2" />
//                       <div className="text-sm text-gray-600">Start Date</div>
//                       <div className="font-semibold">
//                         {formatDate(campaign.startDate)}
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={12} sm={6}>
//                     <div className="text-center p-3 bg-red-50 rounded-lg">
//                       <CalendarOutlined className="text-2xl text-red-600 mb-2" />
//                       <div className="text-sm text-gray-600">End Date</div>
//                       <div className="font-semibold">
//                         {formatDate(campaign.endDate)}
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={12} sm={6}>
//                     <div className="text-center p-3 bg-green-50 rounded-lg">
//                       <DollarOutlined className="text-2xl text-green-600 mb-2" />
//                       <div className="text-sm text-gray-600">Budget</div>
//                       <div className="font-semibold">
//                         ${campaign.budget || 0}
//                       </div>
//                     </div>
//                   </Col>
//                   <Col xs={12} sm={6}>
//                     <div className="text-center p-3 bg-purple-50 rounded-lg">
//                       <TeamOutlined className="text-2xl text-purple-600 mb-2" />
//                       <div className="text-sm text-gray-600">Influencers</div>
//                       <div className="font-semibold">
//                         {campaign.influencerCount || 0}
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>

//                 <div className="mb-4">
//                   <Text strong className="block mb-2">
//                     Platforms:
//                   </Text>
//                   <div className="flex flex-wrap gap-2">
//                     {getPlatformTags(campaign.selectedPlatforms)}
//                   </div>
//                 </div>

//                 {/* Brand Info */}
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <Text strong className="block mb-2">
//                     Brand Information:
//                   </Text>
//                   <div className="flex items-center space-x-3">
//                     <Avatar
//                       src={campaign.brandId?.image?.url}
//                       icon={<UserOutlined />}
//                       size={40}
//                     />
//                     <div>
//                       <div className="font-semibold">
//                         {campaign.brandId?.fullName || "Unknown Brand"}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {campaign.brandId?.email || "No email"}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {campaign.brandId?.phoneNumber || "No phone"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Card>

//         {/* Influencers Tabs */}
//         <Card className="shadow-lg">
//           <Tabs
//             activeKey={activeTab}
//             onChange={setActiveTab}
//             size="large"
//             className="min-h-96"
//           >
//             <TabPane
//               tab={
//                 <span className="text-lg">
//                   <CheckOutlined className="mr-2" />
//                   Accepted Influencers (
//                   {campaign.acceptedInfluencers?.length || 0})
//                 </span>
//               }
//               key="accepted"
//             >
//               <div className="py-4">
//                 {campaign.acceptedInfluencers &&
//                 campaign.acceptedInfluencers.length > 0 ? (
//                   campaign.acceptedInfluencers.map((influencer) => (
//                     <InfluencerCard
//                       key={influencer.id}
//                       influencer={influencer}
//                       id={campaign?.id}
//                       showActions={false}
//                     />
//                   ))
//                 ) : (
//                   <div className="text-center py-12">
//                     <TeamOutlined className="text-6xl text-gray-300 mb-4" />
//                     <Title level={4} type="secondary">
//                       No accepted influencers yet
//                     </Title>
//                     <Text type="secondary">
//                       Influencers you accept will appear here
//                     </Text>
//                   </div>
//                 )}
//               </div>
//             </TabPane>

//             <TabPane
//               tab={
//                 <span className="text-lg">
//                   <UserOutlined className="mr-2" />
//                   Interested Influencers (
//                   {campaign.interestedInfluencers?.length || 0})
//                 </span>
//               }
//               key="interested"
//             >
//               <div className="py-4">
//                 {campaign.interestedInfluencers &&
//                 campaign.interestedInfluencers.length > 0 ? (
//                   campaign.interestedInfluencers.map((influencer) => (
//                     <InfluencerCard
//                       key={influencer.id}
//                       id = {campaign.id}
//                       influencer={influencer}
//                       showActions={true}
//                     />
//                   ))
//                 ) : (
//                   <div className="text-center py-12">
//                     <UserOutlined className="text-6xl text-gray-300 mb-4" />
//                     <Title level={4} type="secondary">
//                       No interested influencers yet
//                     </Title>
//                     <Text type="secondary">
//                       Influencers interested in your campaign will appear here
//                     </Text>
//                   </div>
//                 )}
//               </div>
//             </TabPane>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default CampaignDetailsPage;




"use client";

import React, { useState } from "react";
import {
  Card,
  Tabs,
  Button,
  Avatar,
  Badge,
  Tag,
  Row,
  Col,
  Typography,
  Space,
  message,
} from "antd";
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
  GlobalOutlined,
} from "@ant-design/icons";

import { useGetSingleCampaignQuery } from "@/redux/fetures/campaign/getSingleCampaign";
 
import url from "@/redux/api/baseUrl";
 
import toast, { Toaster } from "react-hot-toast";
import { useAcceptedInfluenerMutation } from "@/redux/fetures/campaign/acceptedInfluener";
import BackButton from "@/components/customComponent/BackButton";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import { CustomButton } from "@/components/customComponent/Button";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const CampaignDetailsPage = ({ id }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleYes = () => {
    // Handle the "Yes" action here
    console.log("User is interested in the campaign!");
    closeModal();
  }



  console.log(id)
  const {data: user } = useLogedUserQuery()
  const [activeTab, setActiveTab] = useState("accepted");
  const {
    data: campaignData,
    isLoading,
    error,
    refetch,
  } = useGetSingleCampaignQuery(id);
  
  const [acceptInfluencer, { isLoading: acceptLoading }] = useAcceptedInfluenerMutation();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading campaign details...</h2>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading campaign</h2>
          <p className="text-gray-600">{error.message || "Something went wrong"}</p>
          <Button 
            type="primary" 
            onClick={() => refetch()} 
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Handle no data
  if (!campaignData?.data?.attributes) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No campaign data found</h2>
          <p className="text-gray-500">Campaign ID: {id}</p>
        </div>
      </div>
    );
  }

  const campaign = campaignData.data.attributes;

  // Helper functions
  const getSocialMediaIcon = (platform) => {
    const icons = {
      facebook: <FacebookOutlined className="text-blue-600" />,
      instagram: <InstagramOutlined className="text-pink-600" />,
      youtube: <YoutubeOutlined className="text-red-600" />,
      tiktok: <TikTokOutlined className="text-black" />,
    };
    return icons[platform.toLowerCase()] || <GlobalOutlined className="text-gray-600" />;
  };

  const getPlatformTags = (platforms) => {
    if (!platforms?.length) {
      return <Tag>No platforms selected</Tag>;
    }

    try {
      const platformArray = JSON.parse(platforms[0]);
      return platformArray.map((platform) => (
        <Tag key={platform} icon={getSocialMediaIcon(platform)} className="mb-2">
          {platform}
        </Tag>
      ));
    } catch (error) {
      console.error("Error parsing platforms:", error);
      return <Tag>Unknown Platform</Tag>;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      upComming: { status: "processing", text: "Upcoming" },
      active: { status: "success", text: "Active" },
      completed: { status: "default", text: "Completed" },
      cancelled: { status: "error", text: "Cancelled" },
    };
    const config = statusConfig[status] || statusConfig.upComming;
    return <Badge status={config.status} text={config.text} />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // Action handlers
 const handleAcceptInfluencer = async (influencerId) => {
    console.log("Campaign ID:", id);  // Ensure id is defined
    console.log("Accepting influencer:", influencerId);
    try {
        const res = await acceptInfluencer({ campaignId: id, influencerId }).unwrap();
        console.log(res);
        if (res.code === 200) {
            toast.success(res.message);
        }
    } catch (error) {
        console.log(error);
    }
};


  const handleDenyInfluencer = async (influencerId) => {
    try {
      console.log("Campaign ID:", id);
      console.log("Denying influencer:", influencerId);
      
      // Add your deny logic here when the mutation is available
      // const result = await denyInfluencer({
      //   campaignId: id,
      //   influencerId: influencerId,
      // }).unwrap();
      
      message.success("Influencer denied successfully!");
      // refetch(); // Refresh the campaign data
    } catch (error) {
      console.error("Error denying influencer:", error);
      message.error("Failed to deny influencer. Please try again.");
    }
  };

  // Influencer Card Component
  const InfluencerCard = ({ influencer, showActions = false }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <Avatar
            size={64}
            src={influencer.image?.url}
            icon={<UserOutlined />}
            className="border-2 border-gray-200 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Title level={4} className="m-0 truncate">
                {influencer.fullName || "Unknown Influencer"}
              </Title>
              {influencer.userName && (
                <Text type="secondary" className="truncate">
                  @{influencer.userName}
                </Text>
              )}
            </div>

            <div className="mb-3 space-y-1">
              <Text type="secondary" className="block truncate">
                {influencer.email}
              </Text>
              <Text type="secondary" className="block">
                {influencer.phoneNumber}
              </Text>
            </div>

            {/* Social Media */}
            {influencer.socialMedia?.length > 0 ? (
              <div className="mb-3">
                <Text strong className="block mb-2">Social Media:</Text>
                <div className="flex flex-wrap gap-2">
                  {influencer.socialMedia.map((social, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 px-3 py-1 rounded-full"
                    >
                      {getSocialMediaIcon(social.platform)}
                      <span className="ml-2 text-sm font-medium">{social.platform}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {social.followers} followers
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Text type="secondary" className="block mb-3">
                No social media profiles linked
              </Text>
            )}

            {/* Interests */}
            {influencer.interests?.length > 0 ? (
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
            ) : (
              <Text type="secondary" className="block mb-3">
                No interests specified
              </Text>
            )}

            {/* Additional Info */}
            <div className="text-sm text-gray-500 space-y-1">
              <div>Plan: {influencer.planName || "N/A"}</div>
              <div>Wallet Balance: ${influencer.walletBalance || 0}</div>
              <div>Experience: {influencer.previousExperience || "N/A"}</div>
            </div>
          </div>
        </div>

{showActions && user?.data?.attributes?.role === "brand" && (
  <div className="flex space-x-2 flex-shrink-0">
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

  // Stats cards data
  const statsCards = [
    {
      icon: <CalendarOutlined className="text-2xl text-blue-600 mb-2" />,
      label: "Start Date",
      value: formatDate(campaign.startDate),
      bgColor: "bg-blue-50",
    },
    {
      icon: <CalendarOutlined className="text-2xl text-red-600 mb-2" />,
      label: "End Date",
      value: formatDate(campaign.endDate),
      bgColor: "bg-red-50",
    },
    {
      icon: <DollarOutlined className="text-2xl text-green-600 mb-2" />,
      label: "Budget",
      value: `$${campaign.budget || 0}`,
      bgColor: "bg-green-50",
    },
    {
      icon: <TeamOutlined className="text-2xl text-purple-600 mb-2" />,
      label: "Influencers",
      value: campaign.influencerCount || 0,
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster />
      <Title level={1} className="mb-6">
        Campaign Details
      </Title>
       <BackButton ></BackButton>
      <div className="max-w-7xl mx-auto">
        {/* Campaign Header */}
        <Card className="mb-6 shadow-lg">
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <div className="text-center md:text-left">
                <img
                  src={campaign.image ? url + campaign.image : "/placeholder-image.jpg"}
                  alt={campaign.campaignName || "Campaign"}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </div>
            </Col>
            
            <Col xs={24} md={16}>
              <div className="h-full flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <Title level={2} className="m-0">
                    {campaign.campaignName || "Untitled Campaign"}
                  </Title> 
                  {getStatusBadge(campaign.status)}
                </div>

                <Paragraph className="text-lg text-gray-600 mb-4">
                  {campaign.description || "No description available"}
                </Paragraph>

                <Row gutter={16} className="mb-4">
                  {statsCards.map((card, index) => (
                    <Col xs={12} sm={6} key={index}>
                      <div className={`text-center p-3 ${card.bgColor} rounded-lg`}>
                        {card.icon}
                        <div className="text-sm text-gray-600">{card.label}</div>
                        <div className="font-semibold">{card.value}</div>
                      </div>
                    </Col>
                  ))}
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
                      src={campaign.brandId?.image?.url}
                      icon={<UserOutlined />}
                      size={40}
                    />
                    <div>
                      <div className="font-semibold">
                        {campaign.brandId?.fullName || "Unknown Brand"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {campaign.brandId?.email || "No email"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {campaign.brandId?.phoneNumber || "No phone"}
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* intereted modal */}

  {user?.data?.attributes?.role === "influencer" && (
           <div className="p-8">
      <div className="text-right font-semibold my-2">
        <button 
          className="bg-sky-400 py-1 px-10 rounded hover:bg-sky-500 transition-colors"
          onClick={openModal}
        >
          Interest
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Campaign Interest
              </h2>
              <p className="text-gray-600 mb-6">
                Are you interested in this campaign?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors"
                  onClick={handleYes}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded transition-colors"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
)}



  



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
                  Accepted Influencers ({campaign.acceptedInfluencers?.length || 0})
                </span>
              }
              key="accepted"
            >
              <div className="py-4">
                {campaign.acceptedInfluencers?.length > 0 ? (
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
                    <Title level={4} type="secondary">
                      No accepted influencers yet
                    </Title>
                    <Text type="secondary">
                      Influencers you accept will appear here
                    </Text>
                  </div>
                )}
              </div>
            </TabPane>

            <TabPane
              tab={
                <span className="text-lg">
                  <UserOutlined className="mr-2" />
                  Interested Influencers ({campaign.interestedInfluencers?.length || 0})
                </span>
              }
              key="interested"
            >
              <div className="py-4">
                {campaign.interestedInfluencers?.length > 0 ? (
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
                    <Title level={4} type="secondary">
                      No interested influencers yet
                    </Title>
                    <Text type="secondary">
                      Influencers interested in your campaign will appear here
                    </Text>
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