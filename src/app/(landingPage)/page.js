 

"use client";
 
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
  // const [searchCriteria, setSearchCriteria] = useState(null);

  // const handleSearch = (criteria) => {
  //   setSearchCriteria(criteria);
  // };

  return (
    <div>
    
       <Banner />
       <BrivoMarquee />
       <Service />
       <InfluencersPage />
       <HowItWorks />
       <WhyChooseUs />
       <TestimonialsGrid />
       <PricingSection />


    
      
    </div>
  );
}