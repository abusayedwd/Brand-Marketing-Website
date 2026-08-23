
// "use client"

// import { useState, useEffect, useRef } from "react"
// import Link from "next/link"
// import { ArrowRightOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons"
// import { Button, Card, Typography, Row, Col, Avatar } from "antd"
// import { motion, useInView, useAnimation, delay } from "framer-motion" // Import additional hooks
// import { useGetInfluencersQuery } from "@/redux/fetures/user/influencers"
 

// const { Title, Paragraph, Text } = Typography

// // Create a Card component wrapped with motion
// const MotionCard = motion(Card)

// // ScrollReveal component for elements that animate on scroll
// function ScrollReveal({ children, threshold = 0.1 }) {
//   const controls = useAnimation()
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: false, threshold })

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible")
//     }
//   }, [controls, isInView])

//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 50 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//       }}
//     >
//       {children}
//     </motion.div>
//   )
// }

// export default function InfluencersPage() {
//   const [activeCategory, setActiveCategory] = useState(null)
//   const [loaded, setLoaded] = useState(false)

//      const { data: influencersResponse, isLoading, error } = useGetInfluencersQuery({ 
//          interests : activeCategory || "",
//      })


 
//   useEffect(() => {
//     setLoaded(true)
//   }, [])

//    const categories = [
//   "Fashion & Style",
//   "Beauty & Cosmetics",
//   "Food & Cooking",
//   "Travel & Adventure",
//   "Fitness & Health",
//   "Technology & Gadgets",
//   "Gaming",
//   "Music & Entertainment",
//   "Art & Design",
//   "Business & Finance",
//   "Education & Learning",
//   "Parenting & Family",
//   "Sports",
//   "Home & Garden",
//   "Photography"
// ];

//   const Influencers= [
//     {
//       id: 1,
//       name: "Sophia Bennett",
//       tag: "#Life style",
//       category: "Fashion",
//       bio: "Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you! Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you!",
//       image: "/images/model2.png",
//       followers: {
//         instagram: "1.2M+",
//         tiktok: "1.2M+",
//         facebook: "1.2M+",
//         youtube: "1.2M+",
//       },
//     },
//     {
//       id: 2,
//       name: "Sophia Bennett",
//       tag: "#Life style",
//       category: "skin care",
//       bio: "Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you! Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you!",
//       image: "/images/model1.png",
//       followers: {
//         instagram: "1.2M+",
//         tiktok: "1.2M+",
//         facebook: "1.2M+",
//         youtube: "1.2M+",
//       },
//     },
//     {
//       id: 3,
//       name: "Sophia Bennett",
//       tag: "#Life style",
//       category: "Technology",
//       bio: "Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you! Sharing my journey through life, fashion, and wellness. Creating authentic content to inspire you!",
//       image: "/images/model3.png",
//       followers: {
//         instagram: "1.2M+",
//         tiktok: "1.2M+",
//         facebook: "1.2M+",
//         youtube: "1.2M+",
//       },
//     },
//   ]

//   const filteredInfluencers= activeCategory
//     ? Influencers.filter((influencer) => influencer.category === activeCategory)
//     : Influencers

//   // Hover animations for card
//   const cardHoverVariants = {
//     hover: {
//       scale: 1.03,
//       boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
//       transition: { duration: 0.3 }
//     }
//   }

//   // Social icon hover animations
//   const socialIconVariants = {
//     hover: {
//       y: -5,
//       transition: { duration: 0.2 }
//     }
//   }

//   return (
//     <div className={`md:container mx-auto py-12 px-4 ${loaded ? "fade-in" : ""}`}>
//       <ScrollReveal>
//         <Row gutter={[32, 32]} className="mb-12">
//           <Col xs={24} md={12}>
//             <Title level={2} style={{ color: "#003366" }}>
//               Find the best Content Creator to help your business
//             </Title>
//           </Col>
//           <Col xs={24} md={12}>
//             <Paragraph>
//               An Content Creator marketing website connects brands with Content Creator to promote products. Content Creator create
//               profiles, receive campaign invitations, and share promotional content, while brands approve and track
//               Content Creator performance.
//             </Paragraph>
//           </Col>
//         </Row>
//       </ScrollReveal>

//       <ScrollReveal>
//         <div className="flex flex-wrap gap-2 mb-8 items-center">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.5 * index, duration: 0.8 }}
//             >
//               <Button
//                 type={activeCategory === category ? "primary" : "default"}
//                 shape="round"
//                 onClick={() => setActiveCategory(activeCategory === category ? null : category)}
//                 style={{
//                   marginBottom: 8,
//                   backgroundColor: activeCategory === category ? "#1890ff" : "#333",
//                   color: "white",
//                   borderColor: activeCategory === category ? "#1890ff" : "#333",
//                 }}
//                 className="category-button"
//               >
//                 {category}
//               </Button>
//             </motion.div>
//           ))}
//           <motion.div
//             className="ml-auto"
//             whileHover={{ x: 5 }}
//             transition={{ duration: 0.2 }}
//           >
//             <Link href="#" className="flex items-center text-blue-600 font-medium hover-link">
//               See all <ArrowRightOutlined style={{ marginLeft: 4 }} />
//             </Link>
//           </motion.div>
//         </div>
//       </ScrollReveal>

//       <Row gutter={[24, 24]}>
//         {filteredInfluencers.map((influencer, index) => (
//           <Col xs={24} md={12} lg={8} key={influencer.id}>
//             <ScrollReveal threshold={0.1}>
//               <motion.div whileHover="hover">
//                 <MotionCard 
//                   hoverable 
//                 //   className="influencer-card" 
//                 //   bodyStyle={{ padding: 24 }} 
//                 //   style={{ height: "100%" }}
//                 //   variants={cardHoverVariants}
//                 whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 1.03 }}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 * index, duration: 0.8 }}
                 
//                 >
//                   <div className="flex flex-col items-center text-center">
//                     <motion.div
//                       className="avatar-wrapper relative"
//                       whileHover={{
//                         scale: 1.05,
//                       }}
//                     >
//                       <Avatar
//                         size={148}
//                         src={influencer.image}
//                         className="profile-image"
//                         style={{ 
//                           border: "4px solid transparent",
//                           transition: "all 0.3s ease"
//                         }}
//                       />
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         whileHover={{ opacity: 1 }}
//                         className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center"
//                       >
//                         <div className="bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-bold text-blue-500">
//                           View Profile
//                         </div>
//                       </motion.div>
//                     </motion.div>
                    
//                     <Title level={4} style={{ color: "#003366", marginTop: 16 }} className="influencer-name">
//                       {influencer.name}
//                     </Title>
                    
//                     <motion.div 
//                       className="mb-2 tag-container"
//                       whileHover={{ scale: 1.1 }}
//                     >
//                       <span
//                         style={{
//                           backgroundColor: "#e6f7ff",
//                           color: "#1890ff",
//                           padding: "2px 8px",
//                           borderRadius: "4px",
//                           fontSize: "14px",
//                         }}
//                         className="tag"
//                       >
//                         {influencer.tag}
//                       </span>
//                     </motion.div>
                    
//                     <Paragraph className="mt-2 mb-6 bio" style={{ fontSize: 14 }}>
//                       {influencer.bio}
//                     </Paragraph>

//                     <Row gutter={[16, 16]} className="w-full mb-6">
//                       <Col span={12}>
//                         <motion.div 
//                           className="social-icon-container" 
//                           variants={socialIconVariants}
//                         >
//                           <Avatar
//                             className="social-icon"
//                             style={{ backgroundColor: "#FCE7F3" }}
//                             icon={<InstagramOutlined style={{ color: "#DB2777" }} />}
//                             size={40}
//                           />
//                           <div>
//                             <Text strong className="follower-count">
//                               {influencer.followers.instagram}
//                             </Text>
//                             <div className="text-xs text-gray-500">Followers Instagram</div>
//                           </div>
//                         </motion.div>
//                       </Col>
                      
//                       <Col span={12}>
//                         <motion.div 
//                           className="social-icon-container"
//                           variants={socialIconVariants}
//                         >
//                           <Avatar
//                             className="social-icon"
//                             style={{ backgroundColor: "#000" }}
//                             icon={
//                               <svg width="1em" height="1em" fill="white" viewBox="0 0 24 24">
//                                 <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
//                               </svg>
//                             }
//                             size={40}
//                           />
//                           <div>
//                             <Text strong className="follower-count">
//                               {influencer.followers.tiktok}
//                             </Text>
//                             <div className="text-xs text-gray-500">Followers TikTok</div>
//                           </div>
//                         </motion.div>
//                       </Col>
                      
//                       <Col span={12}>
//                         <motion.div 
//                           className="social-icon-container"
//                           variants={socialIconVariants}
//                         >
//                           <Avatar
//                             className="social-icon"
//                             style={{ backgroundColor: "#EFF6FF" }}
//                             icon={<FacebookOutlined style={{ color: "#2563EB" }} />}
//                             size={40}
//                           />
//                           <div>
//                             <Text strong className="follower-count">
//                               {influencer.followers.facebook}
//                             </Text>
//                             <div className="text-xs text-gray-500">Followers Facebook</div>
//                           </div>
//                         </motion.div>
//                       </Col>
                      
//                       <Col span={12}>
//                         <motion.div 
//                           className="social-icon-container"
//                           variants={socialIconVariants}
//                         >
//                           <Avatar
//                             className="social-icon"
//                             style={{ backgroundColor: "#FEF2F2" }}
//                             icon={<YoutubeOutlined style={{ color: "#DC2626" }} />}
//                             size={40}
//                           />
//                           <div>
//                             <Text strong className="follower-count">
//                               {influencer.followers.youtube}
//                             </Text>
//                             <div className="text-xs text-gray-500">Followers YouTube</div>
//                           </div>
//                         </motion.div>
//                       </Col>
//                     </Row>

//                     <motion.div
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       style={{ width: "100%" }}
//                     >
//                       <Button type="primary" block className="connect-button">
//                         Connect with {influencer.name.split(' ')[0]}
//                       </Button>
//                     </motion.div>
//                   </div>
//                 </MotionCard>
//               </motion.div>
//             </ScrollReveal>
//           </Col>
//         ))}
//       </Row>
      
//       {/* Optional: Add more sections that will animate on scroll */}
//       <ScrollReveal>
//         <div className="mt-16 text-center">
//           <Title level={3} style={{ color: "#003366" }}>
//             Ready to work with the perfect influencer?
//           </Title>
//           <Button type="primary" size="large" className="mt-4">
//             Get Started Today
//           </Button>
//         </div>
//       </ScrollReveal>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRightOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined, TwitterOutlined } from "@ant-design/icons"
import { Button, Card, Typography, Row, Col, Avatar, Spin, Empty, Modal } from "antd"
import { motion, useInView, useAnimation } from "framer-motion"
import { useGetInfluencersQuery } from "@/redux/fetures/user/influencers"
import getMediaUrl from "@/utils/getMediaUrl"
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser"
import { CustomButton } from "../customComponent/Button"
import { LoginModal } from "../customComponent/LoginModal"

const { Title, Paragraph, Text } = Typography

// Create a Card component wrapped with motion
const MotionCard = motion(Card)

// ScrollReveal component for elements that animate on scroll
function ScrollReveal({ children, threshold = 0.1 }) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
    >
      {children}
    </motion.div>
  )
}

export default function InfluencersPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const { data: loggedUser} = useLogedUserQuery()
  const isSubscribed = loggedUser?.data?.attributes?.isSubscribe;
  // console.log(loggedUser)

  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

 const handleViewDetails = () => {
    if (loggedUser) {
      // User is logged in, navigate to details page
      // This will be handled by the Link component
      return;
    } else {
      // User is not logged in, show login modal
      setIsLoginModalVisible(true);
    }
  };

  const handleLoginModalClose = () => {
    setIsLoginModalVisible(false);
  };

  const handleLogin = () => {
    // Implement your login logic here
    // This could redirect to login page or handle login in modal
    setIsLoginModalVisible(false);
  };









  

  const { data: influencersResponse, isLoading, error } = useGetInfluencersQuery({ 
    interests: activeCategory || "",
  })


  useEffect(() => {
    setLoaded(true)
  }, [])

  const categories = [
    "Fashion & Style",
    "Beauty & Cosmetics", 
    "Food & Cooking",
    "Travel & Adventure",
    "Fitness & Health",
    "Technology & Gadgets",
    "Gaming",
    "Music & Entertainment",
    "Art & Design",
    "Business & Finance",
    "Education & Learning",
    "Parenting & Family",
    "Sports",
    "Home & Garden",
    "Photography"
  ]

  // Helper function to get social media follower count by platform
  const getSocialFollowers = (socialMedia, platform) => {
    const social = socialMedia.find(s => s.platform.toLowerCase() === platform.toLowerCase())
    return social ? social.followers : "0"
  }

  // Helper function to get social media URL by platform
  const getSocialUrl = (socialMedia, platform) => {
    const social = socialMedia.find(s => s.platform.toLowerCase() === platform.toLowerCase())
    return social ? social.url : "#"
  }

  // Map API data to component structure
  const influencers = influencersResponse?.data?.attributes?.results?.slice(0,3)?.map(influencer => ({
    id: influencer.id,
    name: influencer.fullName,
    userName: influencer.userName,
    email: influencer.email,
    tag: influencer.interests.length > 0 ? `#${influencer.interests[0]}` : "#Lifestyle",
    category: influencer.interests[0] || "General",
    bio: influencer.bio || "Content creator sharing authentic experiences and inspiring others through engaging content.",
    image: getMediaUrl(influencer.image, "/images/default-avatar.png"),
    interests: influencer.interests,
    socialMedia: influencer.socialMedia,
    followers: {
      instagram: getSocialFollowers(influencer.socialMedia, "Instagram"),
      tiktok: getSocialFollowers(influencer.socialMedia, "TikTok"),
      facebook: getSocialFollowers(influencer.socialMedia, "Facebook"),
      youtube: getSocialFollowers(influencer.socialMedia, "YouTube"),
      twitter: getSocialFollowers(influencer.socialMedia, "Twitter"),
      snapchat: getSocialFollowers(influencer.socialMedia, "Snapchat"),
    },
    socialUrls: {
      instagram: getSocialUrl(influencer.socialMedia, "Instagram"),
      tiktok: getSocialUrl(influencer.socialMedia, "TikTok"),
      facebook: getSocialUrl(influencer.socialMedia, "Facebook"),
      youtube: getSocialUrl(influencer.socialMedia, "YouTube"),
      twitter: getSocialUrl(influencer.socialMedia, "Twitter"),
      snapchat: getSocialUrl(influencer.socialMedia, "Snapchat"),
    }
  })) || []

  // Filter influencers based on active category
  const filteredInfluencers = activeCategory
    ? influencers.filter((influencer) => 
        influencer.interests.some(interest => 
          interest.toLowerCase().includes(activeCategory.toLowerCase())
        )
      )
    : influencers

  // Hover animations for card
  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  }

  // Social icon hover animations
  const socialIconVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  }

  // TikTok icon component
  const TikTokIcon = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )

  // Snapchat icon component
  const SnapchatIcon = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.404-5.965 1.404-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.74-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z"/>
    </svg>
  )

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6">
        <Empty description="Failed to load influencers" />
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 ${loaded ? "fade-in" : ""}`}>
      <ScrollReveal>
        <Row gutter={[24, 24]} className="mb-8 sm:mb-12">
          <Col xs={24} md={12}>
            <Title level={2} style={{ color: "#003366" }} className="!text-2xl sm:!text-3xl">
              Find the best creators for your brand
            </Title>
          </Col>
          <Col xs={24} md={12}>
            <Paragraph className="!mb-0 text-slate-600">
              Browse creator profiles, filter by niche, and connect for campaigns —
              brands review drafts and track performance in one place.
            </Paragraph>
          </Col>
        </Row>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-none">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * index, duration: 0.4 }}
                className="shrink-0"
              >
                <Button
                  type={activeCategory === category ? "primary" : "default"}
                  shape="round"
                  onClick={() =>
                    setActiveCategory(activeCategory === category ? null : category)
                  }
                  style={{
                    backgroundColor: activeCategory === category ? "#1890ff" : "#333",
                    color: "white",
                    borderColor: activeCategory === category ? "#1890ff" : "#333",
                  }}
                  className="category-button"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
          <Link
            href="/influencer"
            className="inline-flex shrink-0 items-center text-sm font-medium text-blue-600 sm:text-base"
          >
            See all <ArrowRightOutlined style={{ marginLeft: 4 }} />
          </Link>
        </div>
      </ScrollReveal>

      {isLoading ? (
        <div className="text-center py-12">
          <Spin size="large" />
          <div className="mt-4">Loading influencers...</div>
        </div>
      ) : (
        <Row gutter={[24, 24]}>
          {filteredInfluencers.map((influencer, index) => (
            <Col xs={24} md={12} lg={8} key={influencer.id}>
              <ScrollReveal threshold={0.1}>
                <motion.div whileHover="hover">
                  <MotionCard 
                    hoverable 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.03 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.8 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="avatar-wrapper relative"
                        whileHover={{
                          scale: 1.05,
                        }}
                      >
                        <Avatar
                          size={148}
                          src={influencer.image}
                          className="profile-image"
                          style={{ 
                            border: "4px solid transparent",
                            transition: "all 0.3s ease"
                          }}
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center"
                        >
                            <Link href={`/influencer/${influencer.id}`}>
                            
                          <div className="bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-bold text-blue-500">
                            View Profile
                          </div>
                            </Link>
                        </motion.div>
                      </motion.div>
                      
                      <Title level={4} style={{ color: "#003366", marginTop: 16 }} className="influencer-name">
                        {influencer.name}
                      </Title>
                      
                      <Text type="secondary" className="text-sm">
                        @{influencer.userName}
                      </Text>
                      
                      <motion.div 
                        className="mb-2 mt-2 tag-container"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span
                          style={{
                            backgroundColor: "#e6f7ff",
                            color: "#1890ff",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "14px",
                          }}
                          className="tag"
                        >
                          {influencer.tag}
                        </span>
                      </motion.div>
                      
                      <Paragraph className="mt-2 mb-6 bio" style={{ fontSize: 14 }}>
                        {influencer.bio}
                      </Paragraph>

                      {/* Interests */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {influencer.interests.slice(0, 3).map((interest, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {interest}
                            </span>
                          ))}
                          {influencer.interests.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{influencer.interests.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <Row gutter={[16, 16]} className="w-full mb-6">
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2" 
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#FCE7F3" }}
                              icon={<InstagramOutlined style={{ color: "#DB2777" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.instagram}
                              </Text>
                              <div className="text-xs text-gray-500">Instagram</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2"
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#000" }}
                              icon={<TikTokIcon style={{ color: "white" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.tiktok}
                              </Text>
                              <div className="text-xs text-gray-500">TikTok</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2"
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#EFF6FF" }}
                              icon={<FacebookOutlined style={{ color: "#2563EB" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.facebook}
                              </Text>
                              <div className="text-xs text-gray-500">Facebook</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2"
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#FEF2F2" }}
                              icon={<YoutubeOutlined style={{ color: "#DC2626" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.youtube}
                              </Text>
                              <div className="text-xs text-gray-500">YouTube</div>
                            </div>
                          </motion.div>
                        </Col>

                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2"
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#E0F2FE" }}
                              icon={<TwitterOutlined style={{ color: "#0284C7" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.twitter}
                              </Text>
                              <div className="text-xs text-gray-500">Twitter</div>
                            </div>
                          </motion.div>
                        </Col>

                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container flex items-center gap-2"
                            variants={socialIconVariants}
                            whileHover="hover"
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#FFFBEB" }}
                              icon={<SnapchatIcon style={{ color: "#F59E0B" }} />}
                              size={40}
                            />
                            <div className="text-left">
                              <Text strong className="follower-count block">
                                {influencer.followers.snapchat}
                              </Text>
                              <div className="text-xs text-gray-500">Snapchat</div>
                            </div>
                          </motion.div>
                        </Col>
                      </Row>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: "100%" }}
                      >

{/*                         
                        <Link href={`/influencer/${influencer.id}`}>
                        
                        <Button type="primary" block className="connect-button">
                          View Details {influencer.name.split(' ')[0]}
                        </Button>
                        </Link> */}

  {loggedUser && isSubscribed === true ? (
    <Link href={`/influencer/${influencer.id}`}>
      <CustomButton variant="primary" size="large">
        View Details {influencer.name.split(' ')[0]}
      </CustomButton>
    </Link>
  ) : (
    <>
      <CustomButton 
        variant="primary" 
        size="large"
        onClick={() => setIsLoginModalVisible(true)} // This will open the modal
      >
        View Details {influencer.name.split(' ')[0]}
      </CustomButton>

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


                      </motion.div>
                    </div>
                  </MotionCard>
                </motion.div>
              </ScrollReveal>
            </Col>
          ))}
        </Row>
      )}

      {!isLoading && filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Empty description="No influencers found for the selected category" />
        </div>
      )}
      
      <ScrollReveal>
        <div className="mt-16 text-center">
          <Title level={3} style={{ color: "#003366" }}>
            Ready to work with the perfect influencer?
          </Title>
          <Button type="primary" size="large" className="mt-4">
            Get Started Today
          </Button>
        </div>
      </ScrollReveal>
    </div>
  )
}