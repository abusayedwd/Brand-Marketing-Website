// "use client"

// import React, { useEffect, useState } from "react";
// import { Spin, Alert, Card, Avatar, Tag, Typography, Divider, Tooltip } from "antd";
// import {
//   FacebookOutlined,
//   InstagramOutlined,
//   TwitterOutlined,
//   YoutubeOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import { useSigleInfluencerQuery } from "@/redux/fetures/user/signleInfluencer";

// // ... socialIcons definition same as before ...
// const socialIcons = {
//   Facebook: <FacebookOutlined className="text-blue-600" />,
//   Instagram: <InstagramOutlined className="text-pink-500" />,
//   Twitter: <TwitterOutlined className="text-blue-400" />,
//   YouTube: <YoutubeOutlined className="text-red-600" />,
//   TikTok: (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="inline-block h-5 w-5"
//       fill="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path d="M12 2v14.27A5.75 5.75 0 1 1 10 15V9h4V7h-4V2h2z" />
//     </svg>
//   ),
// };

// const { Title, Paragraph, Text } = Typography;

// const InfluencerSinglePage = ({ id }) => {
//   const { data: influencer, error, isLoading } = useSigleInfluencerQuery(id);
  
//   // Optional: if your hook does not provide loading, error, you can handle with useEffect and local state

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spin size="large" tip="Loading influencer data..." />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen px-4">
//         <Alert message="Error" description="Failed to load influencer data" type="error" showIcon />
//       </div>
//     );

//   if (!influencer?.data?.attributes?.user)
//     return (
//       <div className="text-center text-gray-500 mt-20">
//         <p>No influencer data available.</p>
//       </div>
//     );

//   const user = influencer.data.attributes.user;

//   const dobFormatted = new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
//       <Card
//         className="max-w-3xl mx-auto shadow-lg rounded-lg"
//         bodyStyle={{ padding: 24 }}
//         hoverable
//       >
//         <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
//           <Avatar
//             size={120}
//             src={user.image?.url}
//             icon={!user.image?.url && <UserOutlined />}
//             className="border border-gray-300"
//           />
//           <div className="flex-1">
//             <Title level={2} className="mb-0">
//               {user.fullName}
//             </Title>
//             <Text type="secondary" className="block mb-2 text-lg">
//               @{user.userName}
//             </Text>
//             <div className="flex flex-wrap gap-3 mb-5">
//               <Tag color="blue" className="font-semibold">
//                 Role: {user.role}
//               </Tag>
//               <Tag color="green">DOB: {dobFormatted}</Tag>
//               <Tag color="purple">Verified: {user.isEmailVerified ? "Yes" : "No"}</Tag>
//             </div>

//             <Paragraph className="mb-5">{user.bio || "No bio available."}</Paragraph>

//             <div className="mb-5 space-y-2 text-sm">
//               {user.email && (
//                 <div>
//                   <Text strong>Email: </Text>
//                   <a href={`mailto:${user.email}`} className="text-blue-600 underline">
//                     {user.email}
//                   </a>
//                 </div>
//               )}
//               {user.phoneNumber && (
//                 <div>
//                   <Text strong>Phone: </Text>
//                   <a href={`tel:${user.phoneNumber}`} className="text-blue-600 underline">
//                     {user.phoneNumber}
//                   </a>
//                 </div>
//               )}
//               {user.address && (
//                 <div>
//                   <Text strong>Address: </Text> {user.address}
//                 </div>
//               )}
//               {user.website && (
//                 <div>
//                   <Text strong>Website: </Text>
//                   <a href={user.website} target="_blank" rel="noreferrer" className="text-blue-600 underline">
//                     {user.website}
//                   </a>
//                 </div>
//               )}
//             </div>

//             {user.interests?.length > 0 && (
//               <>
//                 <Divider orientation="left" className="!my-5">
//                   Interests
//                 </Divider>
//                 <div className="flex flex-wrap gap-2 mb-5">
//                   {user.interests.map((interest, idx) => (
//                     <Tag key={idx} color="magenta" className="cursor-default select-none">
//                       {interest}
//                     </Tag>
//                   ))}
//                 </div>
//               </>
//             )}

//             {user.socialMedia?.length > 0 && (
//               <>
//                 <Divider orientation="left" className="!my-5">
//                   Social Media
//                 </Divider>
//                 <div className="flex flex-wrap gap-6">
//                   {user.socialMedia.map(({ platform, url, followers, _id }) => {
//                     const icon = socialIcons[platform] || null;
//                     return (
//                       <Tooltip key={_id} title={`${platform} - ${followers} followers`}>
//                         <a
//                           href={url.trim()}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
//                         >
//                           {icon}
//                           <span className="hidden sm:inline">{platform}</span>
//                           <span className="font-semibold">{followers}</span>
//                         </a>
//                       </Tooltip>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default InfluencerSinglePage;





 
"use client"

import React, { useEffect, useState } from "react";
import { Spin, Alert, Card, Avatar, Tag, Typography, Divider, Tooltip, Button } from "antd";
import { useRouter } from "next/navigation";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  GlobalOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useSigleInfluencerQuery } from "@/redux/fetures/user/signleInfluencer";
import url from "@/redux/api/baseUrl";

const socialIcons = {
  Facebook: <FacebookOutlined className="text-blue-600" />,
  Instagram: <InstagramOutlined className="text-pink-500" />,
  Twitter: <TwitterOutlined className="text-blue-400" />,
  YouTube: <YoutubeOutlined className="text-red-600" />,
  TikTok: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2v14.27A5.75 5.75 0 1 1 10 15V9h4V7h-4V2h2z" />
    </svg>
  ),
};

const { Title, Paragraph, Text } = Typography;



const InfluencerSinglePage = ({ id }) => {
  const { data: influencer, error, isLoading } = useSigleInfluencerQuery(id);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-gray-600 font-medium">Loading influencer profile...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-red-50 to-pink-50">
        <Alert 
          message="Oops! Something went wrong" 
          description="We couldn't load the influencer profile. Please try again later." 
          type="error" 
          showIcon 
          className="max-w-md"
        />
      </div>
    );

  if (!influencer?.data?.attributes?.user)
    return (
      <div className="text-center text-gray-500 mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div>
          <UserOutlined className="text-6xl mb-4 text-gray-300" />
          <p className="text-xl">No influencer data available.</p>
        </div>
      </div>
    );

  const user = influencer.data.attributes.user;
  const completedCampaignsCount = influencer.data.attributes.completedCampaignsCount ?? 0;

  const dobFormatted = new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-6">
        <Button
          onClick={() => router.back()}
          size="large"
          className="group flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border-0 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          <ArrowLeftOutlined className="text-purple-600 group-hover:text-purple-700 transition-colors duration-200 group-hover:-translate-x-1 transform" />
          <span className="font-semibold text-gray-700 group-hover:text-gray-800">Back</span>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 p-1">
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar Section */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Avatar
                  size={160}
                  src={url + user.image?.url}
                  icon={!user.image?.url && <UserOutlined />}
                  className="relative border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-2 shadow-lg">
                  {user.isEmailVerified ? (
                    <CheckCircleOutlined className="text-white text-xl" />
                  ) : (
                    <CloseCircleOutlined className="text-white text-xl" />
                  )}
                </div>
              </div>

              {/* Main Info */}
              <div className="flex-1 text-center lg:text-left">
                <Title level={1} className="!mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {user.fullName}
                </Title>
                <Text className="text-xl text-gray-600 font-medium mb-4 block">
                  @{user.userName}
                </Text>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  <Tag 
                    color="purple" 
                    className="px-4 py-2 text-sm font-semibold rounded-full border-0 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800"
                  >
                    {user.role}
                  </Tag>
                  <Tag 
                    color="green" 
                    className="px-4 py-2 text-sm font-semibold rounded-full border-0 bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                  >
                    <CheckCircleOutlined className="mr-1" />
                    {completedCampaignsCount} Completed Campaign{completedCampaignsCount !== 1 ? 's' : ''}
                  </Tag>
                  <Tag 
                    color="blue" 
                    className="px-4 py-2 text-sm font-semibold rounded-full border-0 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
                  >
                    <CalendarOutlined className="mr-1" />
                    {dobFormatted}
                  </Tag>
                  <Tag 
                    color={user.isEmailVerified ? "green" : "red"}
                    className={`px-4 py-2 text-sm font-semibold rounded-full border-0 ${
                      user.isEmailVerified 
                        ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                        : "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                    }`}
                  >
                    {user.isEmailVerified ? <CheckCircleOutlined className="mr-1" /> : <CloseCircleOutlined className="mr-1" />}
                    {user.isEmailVerified ? "Verified" : "Unverified"}
                  </Tag>
                </div>

                <Paragraph className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                  {user.bio || "No bio available."}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <Card 
            className="col-span-1 shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            bodyStyle={{ padding: '24px' }}
          >
            <Title level={3} className="flex items-center gap-2 mb-6 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MailOutlined className="text-white text-sm" />
              </div>
              Contact Info
            </Title>
            
            <div className="space-y-4">
              {user.email && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200">
                  <MailOutlined className="text-blue-600 text-lg" />
                  <div>
                    <Text className="block text-xs text-gray-500 uppercase tracking-wide">Email</Text>
                    <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      {user.email}
                    </a>
                  </div>
                </div>
              )}
              
              {user.phoneNumber && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all duration-200">
                  <PhoneOutlined className="text-green-600 text-lg" />
                  <div>
                    <Text className="block text-xs text-gray-500 uppercase tracking-wide">Phone</Text>
                    <a href={`tel:${user.phoneNumber}`} className="text-green-600 hover:text-green-800 font-medium">
                      {user.phoneNumber}
                    </a>
                  </div>
                </div>
              )}
              
              {user.address && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 transition-all duration-200">
                  <HomeOutlined className="text-orange-600 text-lg" />
                  <div>
                    <Text className="block text-xs text-gray-500 uppercase tracking-wide">Address</Text>
                    <Text className="text-orange-600 font-medium">{user.address}</Text>
                  </div>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-200">
                  <GlobalOutlined className="text-purple-600 text-lg" />
                  <div>
                    <Text className="block text-xs text-gray-500 uppercase tracking-wide">Website</Text>
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-purple-600 hover:text-purple-800 font-medium break-all"
                    >
                      {user.website.replace('https://', '')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Interests */}
          <Card 
            className="col-span-1 lg:col-span-2 shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            bodyStyle={{ padding: '24px' }}
          >
            <Title level={3} className="flex items-center gap-2 mb-6 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">❤️</span>
              </div>
              Interests & Passions
            </Title>
            
            {user.interests?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user.interests.map((interest, idx) => (
                  <Tag 
                    key={idx} 
                    className="px-4 py-2 text-sm font-medium rounded-full border-0 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-gray-800 hover:from-pink-200 hover:via-purple-200 hover:to-blue-200 transition-all duration-200 cursor-default transform hover:scale-105"
                  >
                    {interest}
                  </Tag>
                ))}
              </div>
            ) : (
              <Text className="text-gray-500 italic">No interests listed</Text>
            )}
          </Card>
        </div>

        {/* Social Media Section */}
        {user.socialMedia?.length > 0 && (
          <Card 
            className="mt-8 shadow-xl border-0 rounded-2xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
            bodyStyle={{ padding: '32px' }}
          >
            <Title level={3} className="flex items-center gap-2 mb-8 text-gray-800">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🚀</span>
              </div>
              Social Media Presence
            </Title>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {user.socialMedia.map(({ platform, url, followers, _id }) => {
                const icon = socialIcons[platform] || <GlobalOutlined />;
                return (
                  <Tooltip key={_id} title={`Visit ${platform} profile`}>
                    <a
                      href={url.trim()}
                      target="_blank"
                      rel="noreferrer"
                      className="group block p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {icon}
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-lg font-bold text-gray-800 mb-1">{platform}</div>
                      <div className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {followers}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide mt-1">followers</div>
                    </a>
                  </Tooltip>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InfluencerSinglePage;