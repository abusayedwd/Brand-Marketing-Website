import React from 'react';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
 
// This is a simplified React Marquee component
// Typically you'd use a library like react-fast-marquee
 
export default function BrivoMarquee() {
  // Logo data with paths to your local images
  const firstRowLogos = [
    { id: 1, path: "/images/mlogo1.png", alt: "Brand Logo 1" },
    { id: 3, path: "/images/mlogo3.png", alt: "Brand Logo 3" },
    { id: 2, path: "/images/mlogo2.png", alt: "Brand Logo 2" },
    { id: 3, path: "/images/mlogo3.png", alt: "Brand Logo 3" },
    { id: 4, path: "/images/mlogo4.png", alt: "Brand Logo 4" },
  ];

  const secondRowLogos = [
    { id: 5, path: "/images/mlogo5.png", alt: "Brand Logo 5" },
    { id: 6, path: "/images/mlogo6.png", alt: "Brand Logo 6" },
    { id: 7, path: "/images/mlogo7.png", alt: "Brand Logo 7" },
    { id: 8, path: "/images/mlogo8.png", alt: "Brand Logo 8" },
    { id: 6, path: "/images/mlogo6.png", alt: "Brand Logo 6" },
  ];

  // Logo component
  const Logo = ({ path, alt }) => (
    <div className="inline-flex items-center justify-center bg-white rounded-md shadow-sm py-3 px-4 mx-4 h-16 min-w-32">
      <img 
        src={path} 
        alt={alt}
        className="max-h-full object-contain"
      />
    </div>
  );

  return (
    <div className="md:container md:flex justify-center mx-auto my-10 px-4">
      <div className="mb-6 md:w-[50%] lg:w-[40%] text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          More than 25,000 world-class <br /> brands trust <span className="text-blue-600">Brivo</span>
        </h2>
      </div>

      <div className="md:w-[50%] w-full rounded-lg p-6" 
      style={{
        background: "linear-gradient(to right, #8ABFF800, #51709280)",
      }} 
      >
        {/* First row - Right to Left */}
        <div className="mb-6 mr-12">
          <Marquee direction="left" speed={85} pauseOnHover={true}>
            {firstRowLogos.map((logo) => (
              <Logo key={`logo-${logo.id}`} path={logo.path} alt={logo.alt} />
            ))}
          </Marquee>
        </div>

        {/* Second row - Left to Right */}
        <div className='ml-12'>
          <Marquee direction="right" speed={75} pauseOnHover={true}>
            {secondRowLogos.map((logo) => (
              <Logo key={`logo-${logo.id}`} path={logo.path} alt={logo.alt} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}