




// "use client"

// import { useState, useEffect, useRef, useMemo } from "react"
// import Link from "next/link"
// import { ArrowRightOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons"
// import { Button, Card, Typography, Row, Col, Avatar, Input, Empty } from "antd"
// import { motion, useInView, useAnimation } from "framer-motion"
// import { useGetInfluencersQuery } from "@/redux/fetures/user/influencers"
// import url from "@/redux/api/baseUrl"
 
 

// const { Title, Paragraph, Text } = Typography
// const { Search } = Input

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

// export default function AllInfluencer({ searchCriteria }) {

   
//   const [activeCategory, setActiveCategory] = useState(null)
//   const [loaded, setLoaded] = useState(false)
//   const [localSearchTerm, setLocalSearchTerm] = useState("")



// const { data:influencersResponse, isLoading, error } = useGetInfluencersQuery({
//   interests: activeCategory || "",
//   socialMedia: searchCriteria?.platform || "",   // Search term for social media platform
//   fullName: searchCriteria?.searchValue || "",      // Search term for full name
// });


// //   const { data: influencersResponse, isLoading, error } = useGetInfluencersQuery()

//   console.log("API Response:", influencersResponse)
  
//   useEffect(() => {
//     setLoaded(true)
//   }, [])

//   // Extract influencers from API response
//   const apiInfluencers = influencersResponse?.data?.attributes?.results || []

//   const categories = [
//     "Fashion & Style",
//     "Beauty & Cosmetics", 
//     "Food & Cooking",
//     "Travel & Adventure",
//     "Fitness & Health",
//     "Technology & Gadgets",
//     "Gaming",
//     "Music & Entertainment",
//     "Art & Design",
//     "Business & Finance",
//     "Education & Learning",
//     "Parenting & Family",
//     "Sports",
//     "Home & Garden",
//     "Photography"
//   ]

//   // Function to get follower count for a specific platform
//   const getFollowerCount = (socialMedia, platform) => {
//     const social = socialMedia?.find(s => s.platform.toLowerCase() === platform.toLowerCase())
//     return social?.followers || "0"
//   }

//   // Function to get social media URL for a specific platform
//   const getSocialMediaUrl = (socialMedia, platform) => {
//     const social = socialMedia?.find(s => s.platform.toLowerCase() === platform.toLowerCase())
//     return social?.url || "#"
//   }

//   // Transform API data to match your component structure
//   const transformedInfluencers = useMemo(() => {
//     return apiInfluencers.map(influencer => ({
//       id: influencer.id,
//       name: influencer.fullName || "Unknown",
//       tag: influencer.interests?.[0] ? `#${influencer.interests[0]}` : "#Influencer",
//       category: influencer.interests?.[0] || "General",
//       bio: influencer.bio || "No bio available",
//       image: influencer.image?.url ? `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${influencer.image.url}` : "/images/default-avatar.png",
//       interests: influencer.interests || [],
//       socialMedia: influencer.socialMedia || [],
//       followers: {
//         instagram: getFollowerCount(influencer.socialMedia, "instagram"),
//         tiktok: getFollowerCount(influencer.socialMedia, "tiktok"),
//         facebook: getFollowerCount(influencer.socialMedia, "facebook"),
//         youtube: getFollowerCount(influencer.socialMedia, "youtube"),
//       },
//       urls: {
//         instagram: getSocialMediaUrl(influencer.socialMedia, "instagram"),
//         tiktok: getSocialMediaUrl(influencer.socialMedia, "tiktok"),
//         facebook: getSocialMediaUrl(influencer.socialMedia, "facebook"),
//         youtube: getSocialMediaUrl(influencer.socialMedia, "youtube"),
//       }
//     }))
//   }, [apiInfluencers])

//   // Enhanced filtering logic

//   // const filteredInfluencers = useMemo(() => {
//   //   let filtered = transformedInfluencers

//   //   // Apply search criteria from props (from Banner search)
//   //   if (searchCriteria) {
//   //     const searchTerm = searchCriteria.toLowerCase().trim()
//   //     filtered = filtered.filter(influencer => {
//   //       return (
//   //         // Search in name
//   //         influencer.name.toLowerCase().includes(searchTerm) ||
//   //         // Search in bio
//   //         influencer.bio.toLowerCase().includes(searchTerm) ||
//   //         // Search in interests/category
//   //         influencer.interests.some(interest => 
//   //           interest.toLowerCase().includes(searchTerm)
//   //         ) ||
//   //         // Search in social media platforms
//   //         influencer.socialMedia.some(social => 
//   //           social.platform.toLowerCase().includes(searchTerm)
//   //         )
//   //       )
//   //     })
//   //   }

//   //   // Apply local search term
//   //   if (localSearchTerm) {
//   //     const localTerm = localSearchTerm.toLowerCase().trim()
//   //     filtered = filtered.filter(influencer => {
//   //       return (
//   //         influencer.name.toLowerCase().includes(localTerm) ||
//   //         influencer.bio.toLowerCase().includes(localTerm) ||
//   //         influencer.interests.some(interest => 
//   //           interest.toLowerCase().includes(localTerm)
//   //         )
//   //       )
//   //     })
//   //   }

//   //   // Apply category filter
//   //   if (activeCategory) {
//   //     filtered = filtered.filter(influencer => 
//   //       influencer.interests.some(interest => 
//   //         interest.toLowerCase().includes(activeCategory.toLowerCase())
//   //       )
//   //     )
//   //   }

//   //   return filtered
//   // }, [transformedInfluencers, searchCriteria, localSearchTerm, activeCategory])

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

//   // Handle local search
//   const handleLocalSearch = (value) => {
//     setLocalSearchTerm(value)
//   }

//   // Clear all filters
//   const clearAllFilters = () => {
//     setActiveCategory(null)
//     setLocalSearchTerm("")
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-red-600 mb-4">Error loading influencers</p>
//         <Button onClick={() => window.location.reload()}>
//           Try Again
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className={`md:container mx-auto py-12 px-4 ${loaded ? "fade-in" : ""}`}>
//       <ScrollReveal>
//         <Row gutter={[32, 32]} className="mb-8">
//           <Col xs={24} md={12}>
//             <Title level={2} style={{ color: "#003366" }}>
//               {searchCriteria ? `Search Results for "${searchCriteria}"` : "Find the best Content Creator to help your business"}
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

//       {/* Search and Filter Section */}
//       <ScrollReveal>
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1">
//               <Search
//                 placeholder="Search by name, interests, or bio..."
//                 allowClear
//                 enterButton="Search"
//                 size="large"
//                 value={localSearchTerm}
//                 onChange={(e) => setLocalSearchTerm(e.target.value)}
//                 onSearch={handleLocalSearch}
//               />
//             </div>
//             {(searchCriteria || localSearchTerm || activeCategory) && (
//               <Button onClick={clearAllFilters} size="large">
//                 Clear Filters
//               </Button>
//             )}
//           </div>

//           {/* Active Filters Display */}
//           {(searchCriteria || localSearchTerm || activeCategory) && (
//             <div className="mb-4">
//               <Text strong>Active Filters: </Text>
//               {searchCriteria && (
//                 <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
//                   Search: {searchCriteria}
//                 </span>
//               )}
//               {localSearchTerm && (
//                 <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
//                   Local: {localSearchTerm}
//                 </span>
//               )}
//               {activeCategory && (
//                 <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
//                   Category: {activeCategory}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* Results Count */}
//           <div className="mb-4">
//             <Text className="text-gray-600">
//               Showing {filteredInfluencers.length} of {transformedInfluencers.length} influencers
//             </Text>
//           </div>
//         </div>
//       </ScrollReveal>

//       {/* Category Filter Buttons */}
//       <ScrollReveal>
//         <div className="flex flex-wrap gap-2 mb-8 items-center">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.05 * index, duration: 0.3 }}
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

//       {/* Influencers Grid */}
//       {filteredInfluencers.length === 0 ? (
//         <ScrollReveal>
//           <Empty
//             description={
//               <span>
//                 {searchCriteria || localSearchTerm || activeCategory
//                   ? "No influencers found matching your criteria"
//                   : "No influencers available"}
//               </span>
//             }
//             image={Empty.PRESENTED_IMAGE_SIMPLE}
//           >
//             {(searchCriteria || localSearchTerm || activeCategory) && (
//               <Button type="primary" onClick={clearAllFilters}>
//                 Clear Filters
//               </Button>
//             )}
//           </Empty>
//         </ScrollReveal>
//       ) : (
//         <Row gutter={[24, 24]}>
//           {filteredInfluencers.map((influencer, index) => (
//             <Col xs={24} md={12} lg={8} key={influencer.id}>
//               <ScrollReveal threshold={0.1}>
//                 <motion.div whileHover="hover">
//                   <MotionCard 
//                     hoverable 
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 1.03 }}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * index, duration: 0.5 }}
//                   >
//                     <div className="flex flex-col items-center text-center">
//                       <motion.div
//                         className="avatar-wrapper relative"
//                         whileHover={{ scale: 1.05 }}
//                       >
//                         <Avatar
//                           size={148}
//                           src={url + influencer.image}
//                           className="profile-image"
//                           style={{ 
//                             border: "4px solid transparent",
//                             transition: "all 0.3s ease"
//                           }}
//                         />
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           whileHover={{ opacity: 1 }}
//                           className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-full flex items-center justify-center"
//                         >
//                           <div className="bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-bold text-blue-500">
//                             View Profile
//                           </div>
//                         </motion.div>
//                       </motion.div>
                      
//                       <Title level={4} style={{ color: "#003366", marginTop: 16 }} className="influencer-name">
//                         {influencer.name}
//                       </Title>
                      
//                       <motion.div 
//                         className="mb-2 tag-container"
//                         whileHover={{ scale: 1.1 }}
//                       >
//                         <span
//                           style={{
//                             backgroundColor: "#e6f7ff",
//                             color: "#1890ff",
//                             padding: "2px 8px",
//                             borderRadius: "4px",
//                             fontSize: "14px",
//                           }}
//                           className="tag"
//                         >
//                           {influencer.tag}
//                         </span>
//                       </motion.div>

//                       {/* Display interests */}
//                       {influencer.interests.length > 0 && (
//                         <div className="mb-3 flex flex-wrap gap-1 justify-center">
//                           {influencer.interests.slice(0, 3).map((interest, idx) => (
//                             <span
//                               key={idx}
//                               className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
//                             >
//                               {interest}
//                             </span>
//                           ))}
//                         </div>
//                       )}
                      
//                       <Paragraph className="mt-2 mb-6 bio" style={{ fontSize: 14 }}>
//                         {influencer.bio}
//                       </Paragraph>

//                       <Row gutter={[16, 16]} className="w-full mb-6">
//                         <Col span={12}>
//                           <motion.div 
//                             className="social-icon-container" 
//                             variants={socialIconVariants}
//                           >
//                             <Avatar
//                               className="social-icon"
//                               style={{ backgroundColor: "#FCE7F3" }}
//                               icon={<InstagramOutlined style={{ color: "#DB2777" }} />}
//                               size={40}
//                             />
//                             <div>
//                               <Text strong className="follower-count">
//                                 {influencer.followers.instagram}
//                               </Text>
//                               <div className="text-xs text-gray-500">Followers Instagram</div>
//                             </div>
//                           </motion.div>
//                         </Col>
                        
//                         <Col span={12}>
//                           <motion.div 
//                             className="social-icon-container"
//                             variants={socialIconVariants}
//                           >
//                             <Avatar
//                               className="social-icon"
//                               style={{ backgroundColor: "#000" }}
//                               icon={
//                                 <svg width="1em" height="1em" fill="white" viewBox="0 0 24 24">
//                                   <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
//                                 </svg>
//                               }
//                               size={40}
//                             />
//                             <div>
//                               <Text strong className="follower-count">
//                                 {influencer.followers.tiktok}
//                               </Text>
//                               <div className="text-xs text-gray-500">Followers TikTok</div>
//                             </div>
//                           </motion.div>
//                         </Col>
                        
//                         <Col span={12}>
//                           <motion.div 
//                             className="social-icon-container"
//                             variants={socialIconVariants}
//                           >
//                             <Avatar
//                               className="social-icon"
//                               style={{ backgroundColor: "#EFF6FF" }}
//                               icon={<FacebookOutlined style={{ color: "#2563EB" }} />}
//                               size={40}
//                             />
//                             <div>
//                               <Text strong className="follower-count">
//                                 {influencer.followers.facebook}
//                               </Text>
//                               <div className="text-xs text-gray-500">Followers Facebook</div>
//                             </div>
//                           </motion.div>
//                         </Col>
                        
//                         <Col span={12}>
//                           <motion.div 
//                             className="social-icon-container"
//                             variants={socialIconVariants}
//                           >
//                             <Avatar
//                               className="social-icon"
//                               style={{ backgroundColor: "#FEF2F2" }}
//                               icon={<YoutubeOutlined style={{ color: "#DC2626" }} />}
//                               size={40}
//                             />
//                             <div>
//                               <Text strong className="follower-count">
//                                 {influencer.followers.youtube}
//                               </Text>
//                               <div className="text-xs text-gray-500">Followers YouTube</div>
//                             </div>
//                           </motion.div>
//                         </Col>
//                       </Row>

//                       <motion.div
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         style={{ width: "100%" }}
//                       >
//                         <Button type="primary" block className="connect-button">
//                            View Details
//                         </Button>
//                       </motion.div>
//                     </div>
//                   </MotionCard>
//                 </motion.div>
//               </ScrollReveal>
//             </Col>
//           ))}
//         </Row>
//       )}
      
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

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import { ArrowRightOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined } from "@ant-design/icons"
import { Button, Card, Typography, Row, Col, Avatar, Input, Empty } from "antd"
import { motion, useInView, useAnimation } from "framer-motion"
import { useGetInfluencersQuery } from "@/redux/fetures/user/influencers"
import getMediaUrl from "@/utils/getMediaUrl"
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser"
import { CustomButton } from "../customComponent/Button"
import { LoginModal } from "../customComponent/LoginModal"
 
const { Title, Paragraph, Text } = Typography
const { Search } = Input

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

export default function AllInfluencer({ searchCriteria }) {
   
  const [activeCategory, setActiveCategory] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [localSearchTerm, setLocalSearchTerm] = useState("")


  const { data: influencersResponse, isLoading, error } = useGetInfluencersQuery({
    interests: activeCategory || "",
    socialMedia: searchCriteria?.platform || "",
    fullName: searchCriteria?.searchValue || "",
  });

  const { data: loggedUser} = useLogedUserQuery()
  const isSubscribed = loggedUser?.data?.attributes?.isSubscribe;

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

  
  useEffect(() => {
    setLoaded(true)
  }, [])

  // Extract influencers from API response
  const apiInfluencers = influencersResponse?.data?.attributes?.results || []

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

  // Function to get follower count for a specific platform
  const getFollowerCount = (socialMedia, platform) => {
    const social = socialMedia?.find(s => s.platform.toLowerCase() === platform.toLowerCase())
    return social?.followers || "0"
  }

  // Function to get social media URL for a specific platform
  const getSocialMediaUrl = (socialMedia, platform) => {
    const social = socialMedia?.find(s => s.platform.toLowerCase() === platform.toLowerCase())
    return social?.url || "#"
  }

  // Transform API data to match your component structure
  const transformedInfluencers = useMemo(() => {
    return apiInfluencers.map(influencer => ({
      id: influencer.id,
      name: influencer.fullName || "Unknown",
      tag: influencer.interests?.[0] ? `#${influencer.interests[0]}` : "#Influencer",
      category: influencer.interests?.[0] || "General",
      bio: influencer.bio || "No bio available",
      image: influencer.image?.url ? `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${influencer.image.url}` : "/images/default-avatar.png",
      interests: influencer.interests || [],
      socialMedia: influencer.socialMedia || [],
      followers: {
        instagram: getFollowerCount(influencer.socialMedia, "instagram"),
        tiktok: getFollowerCount(influencer.socialMedia, "tiktok"),
        facebook: getFollowerCount(influencer.socialMedia, "facebook"),
        youtube: getFollowerCount(influencer.socialMedia, "youtube"),
      },
      urls: {
        instagram: getSocialMediaUrl(influencer.socialMedia, "instagram"),
        tiktok: getSocialMediaUrl(influencer.socialMedia, "tiktok"),
        facebook: getSocialMediaUrl(influencer.socialMedia, "facebook"),
        youtube: getSocialMediaUrl(influencer.socialMedia, "youtube"),
      }
    }))
  }, [apiInfluencers])

  // Client-side filtering for local search only (since API handles main search)
  const filteredInfluencers = useMemo(() => {
    let filtered = transformedInfluencers

    // Apply local search term only
    if (localSearchTerm) {
      const localTerm = localSearchTerm.toLowerCase().trim()
      filtered = filtered.filter(influencer => {
        return (
          influencer.name.toLowerCase().includes(localTerm) ||
          influencer.bio.toLowerCase().includes(localTerm) ||
          influencer.interests.some(interest => 
            interest.toLowerCase().includes(localTerm)
          )
        )
      })
    }

    return filtered
  }, [transformedInfluencers, localSearchTerm])

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

  // Handle local search
  const handleLocalSearch = (value) => {
    setLocalSearchTerm(value)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategory(null)
    setLocalSearchTerm("")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading influencers</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className={`mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 ${loaded ? "fade-in" : ""}`}>
      <ScrollReveal>
        <Row gutter={[32, 32]} className="mb-8">
          <Col xs={24} md={12}>
            <Title level={2} style={{ color: "#003366" }}>
              {searchCriteria?.searchValue ? `Search Results for "${searchCriteria.searchValue}"` : "Find the best Content Creator to help your business"}
            </Title>
          </Col>
          <Col xs={24} md={12}>
            <Paragraph>
              An Content Creator marketing website connects brands with Content Creator to promote products. Content Creator create
              profiles, receive campaign invitations, and share promotional content, while brands approve and track
              Content Creator performance.
            </Paragraph>
          </Col>
        </Row>
      </ScrollReveal>

      {/* Search and Filter Section */}
      <ScrollReveal>
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Search
                placeholder="Search by name, interests, or bio..."
                allowClear
                enterButton="Search"
                size="large"
                value={localSearchTerm}
                onChange={(e) => setLocalSearchTerm(e.target.value)}
                onSearch={handleLocalSearch}
              />
            </div>
            {(searchCriteria?.searchValue || localSearchTerm || activeCategory) && (
              <Button onClick={clearAllFilters} size="large">
                Clear Filters
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchCriteria?.searchValue || localSearchTerm || activeCategory) && (
            <div className="mb-4">
              <Text strong>Active Filters: </Text>
              {searchCriteria?.searchValue && (
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Search: {searchCriteria.searchValue}
                </span>
              )}
              {searchCriteria?.platform && (
                <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Platform: {searchCriteria.platform}
                </span>
              )}
              {localSearchTerm && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Local: {localSearchTerm}
                </span>
              )}
              {activeCategory && (
                <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                  Category: {activeCategory}
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-4">
            <Text className="text-gray-600">
              Showing {filteredInfluencers.length} of {transformedInfluencers.length} influencers
            </Text>
          </div>
        </div>
      </ScrollReveal>

      {/* Category Filter Buttons */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
            >
              <Button
                type={activeCategory === category ? "primary" : "default"}
                shape="round"
                onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                style={{
                  marginBottom: 8,
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
          <motion.div
            className="ml-auto"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="#" className="flex items-center text-blue-600 font-medium hover-link">
              See all <ArrowRightOutlined style={{ marginLeft: 4 }} />
            </Link>
          </motion.div>
        </div>
      </ScrollReveal>

      {/* Influencers Grid */}
      {filteredInfluencers.length === 0 ? (
        <ScrollReveal>
          <Empty
            description={
              <span>
                {searchCriteria?.searchValue || localSearchTerm || activeCategory
                  ? "No influencers found matching your criteria"
                  : "No influencers available"}
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            {(searchCriteria?.searchValue || localSearchTerm || activeCategory) && (
              <Button type="primary" onClick={clearAllFilters}>
                Clear Filters
              </Button>
            )}
          </Empty>
        </ScrollReveal>
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
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <motion.div
                        className="avatar-wrapper relative"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Avatar
                          size={148}
                          src={getMediaUrl(influencer.image)}
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
                      
                      <motion.div 
                        className="mb-2 tag-container"
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

                      {/* Display interests */}
                      {influencer.interests.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1 justify-center">
                          {influencer.interests.slice(0, 3).map((interest, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Paragraph className="mt-2 mb-6 bio" style={{ fontSize: 14 }}>
                        {influencer.bio}
                      </Paragraph>

                      <Row gutter={[16, 16]} className="w-full mb-6">
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container" 
                            variants={socialIconVariants}
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#FCE7F3" }}
                              icon={<InstagramOutlined style={{ color: "#DB2777" }} />}
                              size={40}
                            />
                            <div>
                              <Text strong className="follower-count">
                                {influencer.followers.instagram}
                              </Text>
                              <div className="text-xs text-gray-500">Followers Instagram</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container"
                            variants={socialIconVariants}
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#000" }}
                              icon={
                                <svg width="1em" height="1em" fill="white" viewBox="0 0 24 24">
                                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"></path>
                                </svg>
                              }
                              size={40}
                            />
                            <div>
                              <Text strong className="follower-count">
                                {influencer.followers.tiktok}
                              </Text>
                              <div className="text-xs text-gray-500">Followers TikTok</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container"
                            variants={socialIconVariants}
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#EFF6FF" }}
                              icon={<FacebookOutlined style={{ color: "#2563EB" }} />}
                              size={40}
                            />
                            <div>
                              <Text strong className="follower-count">
                                {influencer.followers.facebook}
                              </Text>
                              <div className="text-xs text-gray-500">Followers Facebook</div>
                            </div>
                          </motion.div>
                        </Col>
                        
                        <Col span={12}>
                          <motion.div 
                            className="social-icon-container"
                            variants={socialIconVariants}
                          >
                            <Avatar
                              className="social-icon"
                              style={{ backgroundColor: "#FEF2F2" }}
                              icon={<YoutubeOutlined style={{ color: "#DC2626" }} />}
                              size={40}
                            />
                            <div>
                              <Text strong className="follower-count">
                                {influencer.followers.youtube}
                              </Text>
                              <div className="text-xs text-gray-500">Followers YouTube</div>
                            </div>
                          </motion.div>
                        </Col>
                      </Row>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ width: "100%" }}
                      >


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