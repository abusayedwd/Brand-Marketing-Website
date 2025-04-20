
import React from 'react';

export default function WhyChooseUs() {
  return (
    <div className="bg-white min-h-screen p-8 md:py-20">
      <div className=" container mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Content Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            Why choose <span className="text-blue-500">us?</span>
          </h2>
          
          <p className="text-gray-700 mb-8">
            Choose us for our expertise in connecting top-tier influencers with
            brands. We deliver tailored campaigns that drive engagement, results,
            and brand growth.
          </p>
          
          <div className="space-y-8">
            {/* Card 1 */}
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-blue-500 rounded-lg p-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L15 22l-3-8-8-3L22 2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Promote your product
                </h4>
                <p className="text-gray-600">
                  Promote your brand's products by leveraging the power of
                  influencers, creating authentic, engaging campaigns that
                  resonate with the right audience and drive measurable
                  results.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-blue-500 rounded-lg p-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Success campaign on social media
                </h4>
                <p className="text-gray-600">
                  Promote your brand's products by leveraging the power of
                  influencers, creating authentic, engaging campaigns that
                  resonate with the right audience and drive measurable
                  results.
                </p>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="flex items-start">
              <div className="mr-4">
                <div className="bg-blue-500 rounded-lg p-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Growing & Scale Up Businesses
                </h4>
                <p className="text-gray-600">
                  Promote your brand's products by leveraging the power of
                  influencers, creating authentic, engaging campaigns that
                  resonate with the right audience and drive measurable
                  results.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Image Column */}
        <div className="w-full md:w-1/2 relative ml-24">
          <div className="relative h-full  flex items-center justify-center">
            <div className="rounded-bl-3xl rounded-br-3xl overflow-hidden">
              <img
                src="/images/chos.png"
                alt="Influencer marketing"
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-12 left-16">
              <img
                src="/images/chos1.png"
                alt="Influencer example"
                className="rounded-lg shadow-lg h-64"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}