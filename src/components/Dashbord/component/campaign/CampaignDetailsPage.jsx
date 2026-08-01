 



"use client";

import React, { use, useState } from "react";
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
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { useGetSingleCampaignQuery } from "@/redux/fetures/campaign/getSingleCampaign";
 
import url from "@/redux/api/baseUrl";
 
import toast, { Toaster } from "react-hot-toast";
import { useAcceptedInfluenerMutation } from "@/redux/fetures/campaign/acceptedInfluener";
import BackButton from "@/components/customComponent/BackButton";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import { CustomButton } from "@/components/customComponent/Button";
import { useInterestedCampaignInfluMutation } from "@/redux/fetures/campaign/interestedCampaignInflu";
import Link from "next/link";
import { useApprovedDraftMutation } from "@/redux/fetures/draftSubmit/approvedDraft";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const CampaignDetailsPage = ({ id }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
const [interested, {}] = useInterestedCampaignInfluMutation()

 

  const handleYes = async() => {
    console.log("Campaign IDdddddd:", id);
    try{
      const res = await interested(id).unwrap();
      console.log(res)
      if(res.code=== 200){
        toast.success("Intereted success") 
       closeModal();
       refetch();
      }
    }catch(error){
      console.log(error.data)
      toast.error(error.data.message)
    }
    
   
  }
 
 
  const {data: user } = useLogedUserQuery()
  console.log(user?.data?.attributes?.id)
  const [activeTab, setActiveTab] = useState("accepted");
  const {
    data: campaignData,
    isLoading,
    error,
    refetch,
  } = useGetSingleCampaignQuery(id);
  
  const [acceptInfluencer, { isLoading: acceptLoading }] = useAcceptedInfluenerMutation();

  const [approveDraft] = useApprovedDraftMutation()
 
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

  const campaign = campaignData?.data?.attributes; 
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
      pending: { status: "warning", text: "Payment Pending" },
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
    console.log("Campaign ID:", id);
    console.log("Accepting influencer:", influencerId);
    try {
        const res = await acceptInfluencer({ campaignId: id, influencerId }).unwrap();
        console.log(res);
        if (res.code === 200) {
            toast.success(res.message);
            refetch();
        }
    } catch (error) {
        console.log(error);
    }
};

  // Draft approve handler
  const handleApproveDraft = async (draftId) => {
    try {
      console.log("Approving draft:", draftId, id);
      const data = {
        campaignId: id,
        draftId: draftId
      }
      // Add your draft approval logic here
      const result = await approveDraft(data).unwrap();
      console.log(result)
       if(result?.code === 200){
         toast.success("Draft approved successfully!"); 
       }
      refetch(); // Refresh the campaign data
    } catch (error) {
      console.error("Error approving draft:", error);
      toast.error("Failed to approve draft. Please try again.");
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

  // Draft Card Component
  
  const DraftCard = ({ draft, showActions = false }) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <img
            src={draft.image?.url ? url + draft.image.url : "/placeholder-image.jpg"}
            alt="Draft"
            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Title level={4} className="m-0">
                Draft Content
              </Title>
              <div className="ml-auto">
                {draft.isApproved ? (
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    Approved
                  </Tag>
                ) : (
                  <Tag color="orange" icon={<ClockCircleOutlined />}>
                    Pending
                  </Tag>
                )}
              </div>
            </div>

            <div className="mb-3">
              <Text strong className="block mb-1">Influencer ID:</Text>
              <Text code className="text-sm">{draft.influencerId}</Text>
            </div>
            
            <div className="mb-3">
              <Text strong className="block mb-1">Content:</Text>
              <Paragraph className="text-sm text-gray-600 mb-0">
                {draft.draftContent}
              </Paragraph>
            </div>
            
            <div className="mb-3">
              <Text strong className="block mb-2">Social Platforms:</Text>
              <Space direction="vertical" size="small" className="w-full">
                {draft.socialPlatform?.map((platform) => (
                  <div key={platform._id} className="flex items-center space-x-2">
                    {getSocialMediaIcon(platform.platform)}
                    <Text className="text-sm">{platform.platform}</Text>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      {platform.url}
                    </a>
                  </div>
                ))}
              </Space>
            </div>
            
            <div className="pt-2 border-t border-gray-100">
              <Text className="text-xs text-gray-500">
                Created: {formatDate(draft.createdAt)}
              </Text>
            </div>
          </div>
        </div>

        {showActions && user?.data?.attributes?.role === "brand" && !draft.isApproved && (
          <div className="flex space-x-2 flex-shrink-0">
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => handleApproveDraft(draft._id)}
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              Approve
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
                
{campaign.status === "upComming" && 
  user?.data?.attributes?.role === "influencer" && 
  !campaign.acceptedInfluencers.some((influencer) => influencer.id === user?.data?.attributes?.id) && 
  !campaign.interestedInfluencers.some((influencer) => influencer.id === user?.data?.attributes?.id) ? (
    // If status is "upComming" and user ID is not in either acceptedInfluencers or interestedInfluencers, show Interest button
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
  ) : (campaign.status !== "upComming" || 
        campaign.acceptedInfluencers.some((influencer) => influencer.id === user?.data?.attributes?.id) || 
        campaign.interestedInfluencers.some((influencer) => influencer.id === user?.data?.attributes?.id)) && (
    // If the status is not "upComming" or user has already expressed interest, show the badge
    <div className="p-8">
      <div className="text-center font-semibold my-2">
        <span className="bg-green-400 py-1 px-6 rounded text-white">
          You already expressed interest in this campaign
        </span>
      </div>
    </div>
  )}


{/* Show Submit Draft button if the user is in the acceptedInfluencers list */}
{(campaign.acceptedInfluencers.some((influencer) => influencer.id === user?.data?.attributes?.id) &&
  (campaign?.status === "upComming" || campaign?.status === "active") &&
  campaign?.status !== "completed") && (
  <div className="p-8">
    <div className="text-right font-semibold my-2">
      <Link href={`/dashboard/campaigns/details/sumbit-draft?id=${campaign.id}`} >
        <button 
          className="bg-blue-400 py-1 px-10 rounded hover:bg-blue-500 transition-colors"
        >
          Submit Draft
        </button>
      </Link>
    </div>
  </div>
)}



{/* Display Campaign Status */}
{campaign.status === "active" && (
  <div className="p-8">
    <div className="text-center font-semibold my-2">
      <span className="bg-yellow-400 py-1 px-6 rounded text-white">
        This campaign is active
      </span>
    </div>
  </div>
)}

{campaign.status === "completed" && (
  <div className="p-8">
    <div className="text-center font-semibold my-2">
      <span className="bg-gray-400 py-1 px-6 rounded text-white">
        This campaign is completed
      </span>
    </div>
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
 
            {/* <TabPane
              tab={
                <span className="text-lg">
                  <FileTextOutlined className="mr-2" />
                  Drafts ({campaign.drafts?.length || 0})
                </span>
              }
              key="drafts"
            >
              <div className="py-4">
                {campaign.drafts?.length > 0 ? (
                  campaign.drafts.map((draft) => (
                    <DraftCard
                      key={draft._id}
                      draft={draft}
                      showActions={true}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
                    <Title level={4} type="secondary">
                      No drafts submitted yet
                    </Title>
                    <Text type="secondary">
                      Draft submissions from influencers will appear here
                    </Text>
                  </div>
                )}
              </div>
            </TabPane> */}


   // Replace the drafts TabPane with this updated version

<TabPane
  tab={
    <span className="text-lg">
      <FileTextOutlined className="mr-2" />
      {user?.data?.attributes?.role === "brand" ? "Drafts" : "My Drafts"} ({
        user?.data?.attributes?.role === "brand" 
          ? campaign.drafts?.length || 0 
          : campaign.drafts?.filter(draft => draft.influencerId === user?.data?.attributes?.id)?.length || 0
      })
    </span>
  }
  key="drafts"
>
  <div className="py-4">
    {(() => {
      const userRole = user?.data?.attributes?.role;
      const userId = user?.data?.attributes?.id;
      
      // Filter drafts based on user role
      const filteredDrafts = userRole === "brand" 
        ? campaign.drafts || [] 
        : (campaign.drafts || []).filter(draft => draft.influencerId === userId);

      return filteredDrafts.length > 0 ? (
        filteredDrafts.map((draft) => (
          <DraftCard
            key={draft._id}
            draft={draft}
            showActions={userRole === "brand"} // Only show actions for brand users
          />
        ))
      ) : (
        <div className="text-center py-12">
          <FileTextOutlined className="text-6xl text-gray-300 mb-4" />
          <Title level={4} type="secondary">
            {userRole === "brand" 
              ? "No drafts submitted yet" 
              : "You haven't submitted any drafts yet"
            }
          </Title>
          <Text type="secondary">
            {userRole === "brand" 
              ? "Draft submissions from influencers will appear here" 
              : "Your draft submissions will appear here"
            }
          </Text>
        </div>
      );
    })()}
  </div>
</TabPane>


          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;