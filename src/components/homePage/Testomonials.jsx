
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TestimonialsGrid() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote: "Great work on the content! It's aligned with our brand values. Just a minor adjustment needed before final approval",
      name: "Mrs. NANE yates",
      position: "CEO of Archa",
      bgColor: "bg-teal-500"
    },
    {
      id: 2,
      quote: "The influencer marketing platform has dramatically increased our brand visibility. The results exceeded our expectations!",
      name: "David Smith",
      position: "Marketing Director",
      bgColor: "bg-blue-500"
    },
    {
      id: 3,
      quote: "Working with this platform has been seamless. The analytics provided valuable insights for our campaign optimization.",
      name: "Mrs. NANE yates",
      position: "CEO of Archa",
      bgColor: "bg-gray-800"
    },
    {
      id: 4,
      quote: "Exceptional service and outstanding results. We've renewed our contract for another year after seeing the ROI.",
      name: "John Miller",
      position: "Brand Manager",
      bgColor: "bg-purple-600"
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`bg-blue-50 py-16 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4 ">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            What our client <span className="text-blue-500">say?</span>
          </h2>
          <p className="mt-4 text-gray-700 max-w-2xl">
            An influencer marketing website connects brands with influencers to
            promote products. Influencers create profiles, receive campaign
            invitations, and share promotional content, while brands approve and
            track influencer performance.
          </p>
        </motion.div>
        
        {/* Mobile View Grid (replaces Swiper) */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`${testimonial.bgColor} rounded-lg overflow-hidden shadow-md p-6 relative h-64`}
            >
              <div className="mb-4 text-white text-lg">
                "{testimonial.quote}"
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-medium">{testimonial.name}</div>
                <div className="text-white text-opacity-80 text-sm">{testimonial.position}</div>
              </div>
              <div className="absolute bottom-2 right-6 opacity-20 text-6xl font-serif text-white">
                "
              </div>
            </div>
          ))}
          <div className="rounded-lg overflow-hidden shadow-md h-64 relative">
            <Image 
              src="/images/client1.png" 
              alt="Client portrait" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>
        
        {/* Desktop Grid View */}
        <motion.div 
          className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Top Row */}
          <motion.div 
            className="rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative h-64"
            variants={item}
          >
            <Image 
              src="/images/client1.png" 
              alt="Client portrait" 
              fill
              className="object-cover hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </motion.div>
          
          <motion.div 
            className="bg-teal-500 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={item}
          >
            <div className="p-6 relative h-64 hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform">
              <div className="mb-4 text-white text-lg">
                "{testimonials[0].quote}"
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-medium">{testimonials[0].name}</div>
                <div className="text-white text-opacity-80 text-sm">{testimonials[0].position}</div>
              </div>
              <div className="absolute bottom-2 right-6 opacity-20 text-6xl font-serif text-white">
                "
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative h-64"
            variants={item}
          >
            <Image 
              src="/images/client2.png" 
              alt="Client portrait" 
              fill
              className="object-cover hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </motion.div>

          {/* Bottom Row */}
          <motion.div 
            className="bg-blue-500 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={item}
          >
            <div className="p-6 relative h-64 hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform">
              <div className="mb-4 text-white text-lg">
                "{testimonials[1].quote}"
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-medium">{testimonials[1].name}</div>
                <div className="text-white text-opacity-80 text-sm">{testimonials[1].position}</div>
              </div>
              <div className="absolute bottom-2 right-6 opacity-20 text-6xl font-serif text-white">
                "
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md relative h-64"
            variants={item}
          >
            <Image 
              src="/images/client3.png" 
              alt="Client portrait" 
              fill
              className="object-cover hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </motion.div>
          
          <motion.div 
            className="bg-gray-800 rounded-lg overflow-hidden shadow-sm transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            variants={item}
          >
            <div className="p-6 relative h-64 hover:scale-110 transition-transform duration-300 hover:opacity-80 hover:transform">
              <div className="mb-4 text-white text-lg">
                "{testimonials[2].quote}"
              </div>
              <div className="absolute bottom-6 left-6">
                <div className="text-white font-medium">{testimonials[2].name}</div>
                <div className="text-white text-opacity-80 text-sm">{testimonials[2].position}</div>
              </div>
              <div className="absolute bottom-2 right-6 opacity-20 text-6xl font-serif text-white">
                "
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}