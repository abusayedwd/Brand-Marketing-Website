"use client";

import AllInfluencer from "@/components/homePage/AllInfluencer";
import AudienceSplit from "@/components/homePage/AudienceSplit";
import Banner from "@/components/homePage/Banner";
import CaseStudies from "@/components/homePage/CaseStudies";
import FinalCta from "@/components/homePage/FinalCta";
import HomeFaq from "@/components/homePage/HomeFaq";
import InfluencersPage from "@/components/homePage/Influencer";
import BrivoMarquee from "@/components/homePage/MarqueeLogo";
import OpenCampaigns from "@/components/homePage/OpenCampaigns";
import PricingSection from "@/components/homePage/PricingPlan";
import Service from "@/components/homePage/Service";
import TestimonialsGrid from "@/components/homePage/Testomonials";
import TrustSecurity from "@/components/homePage/TrustSecurity";
import HowItWorks from "@/components/homePage/WorkIt";
import React, { useState } from "react";

export default function Home() {
  const [searchCriteria, setSearchCriteria] = useState(null);

  const handleSearch = (platform) => {
    setSearchCriteria(platform);
  };

  return (
    <div>
      <Banner onSearch={handleSearch} />

      {searchCriteria && <AllInfluencer searchCriteria={searchCriteria} />}

      {!searchCriteria && (
        <>
          <BrivoMarquee />
          <Service />
          <InfluencersPage />
          <OpenCampaigns />
          <HowItWorks />
          <AudienceSplit />
          <TrustSecurity />
          <CaseStudies />
          <TestimonialsGrid />
          <PricingSection />
          <HomeFaq />
          <FinalCta />
        </>
      )}
    </div>
  );
}
