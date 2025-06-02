 

"use client";
 
import AllInfluencer from "@/components/homePage/AllInfluencer";
import Banner from "@/components/homePage/Banner";
import InfluencersPage from "@/components/homePage/Influencer";
import BrivoMarquee from "@/components/homePage/MarqueeLogo";
import PricingSection from "@/components/homePage/PricingPlan";
import Service from "@/components/homePage/Service";
import TestimonialsGrid from "@/components/homePage/Testomonials";
import WhyChooseUs from "@/components/homePage/WhyChoseUs";
import HowItWorks from "@/components/homePage/WorkIt";
import React, { useState } from "react";
 

export default function Home() {
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleSearch = (platform) => {
    setSearchCriteria(platform);
  };

  return (
    <div>
    
           {/* Banner Component */}
      <Banner onSearch={handleSearch} />

      {/* Conditionally render AllProperty if searchCriteria exists */}
      {searchCriteria && <AllInfluencer searchCriteria={searchCriteria} />}

        {!searchCriteria && (
        <>
       <BrivoMarquee />
       <Service />
       <InfluencersPage />
       <HowItWorks />
       <WhyChooseUs />
       <TestimonialsGrid />
       <PricingSection />

 </>
      )}
    
      
    </div>
  );
}