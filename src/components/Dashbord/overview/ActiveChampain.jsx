"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ActiveCampaigns = () => {
  const [mounted, setMounted] = useState(false);
  
  // Sample campaign data (you can replace with API data)
  const campaigns = [
    {
      id: 1,
      title: 'Holiday Music Campaign',
      startDate: '20/12/2025',
      image: '/images/campaign.png' // Replace with actual image path
    },
    {
      id: 2,
      title: 'Holiday Music Campaign',
      startDate: '20/12/2025',
      image: '/images/campaign.png'
    },
    {
      id: 3,
      title: 'Holiday Music Campaign',
      startDate: '20/12/2025',
      image: '/images/campaign.png'
    },
    {
      id: 4,
      title: 'Holiday Music Campaign',
      startDate: '20/12/2025',
      image: '/images/campaign.png'
    },
    {
      id: 5,
      title: 'Holiday Music Campaign',
      startDate: '20/12/2025',
      image: '/images/campaign.png'
    }
  ];
  
  // Fix for hydration issues with Swiper
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Active Campaigns</h2>
        <button className="bg-blue-50 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-100 transition">
          Show All
        </button>
      </div> 
      
      
      {mounted && (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            }
          }}
          className="campaign-swiper"
        >
          {campaigns.map((campaign) => (
            <SwiperSlide key={campaign.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                <div className="h-40 bg-purple-100 relative overflow-hidden">
                  {/* Placeholder for image - replace with actual image */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-80" />
                  <img 
                    src={campaign.image || "https://via.placeholder.com/400x200/8B5CF6/FFFFFF"}
                    alt={campaign.title} 
                    className="w-full h-full object-cover opacity-70"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Target Start Date:</span>
                    <br />
                    {campaign.startDate}
                  </p>
                  <button className="mt-4 w-full py-2 bg-white border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      
      {/* Add custom styles for Swiper */}
      <style jsx global>{`
        .campaign-swiper {
          padding-bottom: 40px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #4B5563;
          background-color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
        .swiper-pagination-bullet-active {
          background-color: #4F46E5;
        }
      `}</style>
    </div>
  );
};

export default ActiveCampaigns;