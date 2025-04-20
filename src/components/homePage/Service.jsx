import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Service() {
  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    // Trigger animations when component mounts
    setAnimated(true);
  }, []);
  
  const services = [
    {
      title: "Content idea generation",
      image: "/images/service.png",
      description: "Collaborate with our team to generate innovative content ideas tailored to your brand's voice and audience."
    },
    {
      title: "Content idea generation",
      image: "/images/service_2.png",
      description: "Custom content strategies designed to maximize engagement and conversion across all platforms."
    },
    {
      title: "Content idea generation", 
      image: "/images/service_3.png",
      description: "Professional content creation services that deliver high-quality assets for your marketing campaigns."
    },
    {
      title: "Content idea generation",
      image: "/images/service_3.png",
      description: "Expert analysis and optimization to ensure your content performs at its best."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          className={`text-blue-500 font-medium mb-3 transform transition-all duration-700 ${
            animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Service
        </div>
        
        <h2 
          className={`text-3xl font-bold mb-8 text-gray-900 transform transition-all duration-700 delay-100 ${
            animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Our services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Service main card with animations */}
          <div 
            className={`relative overflow-hidden bg-black text-white rounded-lg shadow-lg transform transition-all duration-700 delay-200 ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
            }`}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Our services</h3>
                <p className="mb-6">
                  Connect with top influencers to elevate your brand through 
                  authentic content and strategic promotional campaigns for
                  maximum impact.
                </p>
              </div>
              <Button 
                type="link" 
                className="text-blue-400 hover:text-blue-300 flex items-center p-0 group"
                style={{ width: 'fit-content' }}
              >
                All Services 
                <ArrowRightOutlined className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="absolute inset-0 bg-blue-200 opacity-0 mix-blend-overlay transition-opacity duration-500 hover:opacity-20"></div>
          </div>
          
          {/* Service cards with hover effects and staggered animations */}
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg bg-white transition-all duration-700 shadow-sm hover:shadow-md transform ${
                animated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
              }`}
              style={{ transitionDelay: `${300 + (index * 100)}ms` }}
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300">
                  <div className="p-4 text-white absolute bottom-0 left-0">
                    <h3 className="text-lg font-medium">{service.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Slide-up info panel on hover with smooth animation */}
              <div className="absolute inset-0 bg-transparent bg-sky-200 bg-opacity-50 flex flex-col justify-end p-6 transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-3 transform transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">{service.title}</h3>
                <p className="text-white text-sm mb-4 transform transition-all duration-500 delay-75 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">{service.description}</p>
                <Button 
                  type="primary" 
                  ghost 
                  className="self-start border-white text-white hover:bg-white hover:text-blue-600 transform transition-all duration-500 delay-150 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Learn more
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}