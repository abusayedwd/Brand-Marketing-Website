import React from 'react';
import { Button } from 'antd';
import { SearchOutlined, FileTextOutlined, BarChartOutlined, PlayCircleFilled } from '@ant-design/icons';

export default function HowItWorks() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side - Step Cards */}
          <div className="w-full lg:w-1/2 relative mb-10 lg:mb-0">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-16 max-w-md mx-auto lg:mx-0 relative z-10">
              <div className="flex items-center mb-2">
                <SearchOutlined className="text-blue-500 text-xl mr-3" />
                <div>
                  <div className="text-blue-600 font-medium">Step 1</div>
                  <div className="text-gray-800 font-bold">Find a Content Creator</div>
                </div>
              </div>
            </div>
            
            {/* Arrow 1 */}
            <div className="hidden lg:block absolute top-24 right-16 transform -rotate-12">
              <svg width="130" height="80" viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 C40 30, 80 20, 120 70" stroke="#3CDBC0" strokeWidth="2" strokeLinecap="round" />
                <path d="M110 50 L120 70 L100 65" stroke="#3CDBC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-16 max-w-md mx-auto lg:ml-20 relative z-10">
              <div className="flex items-center mb-2">
                <FileTextOutlined className="text-blue-500 text-xl mr-3" />
                <div>
                  <div className="text-blue-600 font-medium">Step 2</div>
                  <div className="text-gray-800 font-bold">Create a content</div>
                </div>
              </div>
            </div>
            
            {/* Arrow 2 */}
            <div className="hidden lg:block absolute bottom-60 right-24 transform rotate-45">
              <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 C30 20, 60 30, 100 70" stroke="#3CDBC0" strokeWidth="2" strokeLinecap="round" />
                <path d="M80 60 L100 70 L90 50" stroke="#3CDBC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto lg:ml-40 relative z-10">
              <div className="flex items-center mb-2">
                <BarChartOutlined className="text-blue-500 text-xl mr-3" />
                <div>
                  <div className="text-blue-600 font-medium">Step 3</div>
                  <div className="text-gray-800 font-bold">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - How it works description */}
          <div className="w-full lg:w-5/12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">
              How it <span className="text-blue-500">work's?</span>
            </h2>
            
            <p className="text-gray-700 mb-8">
              An influencer marketing website connects brands with  Content Creator to
              promote products. Content Creator create profiles, receive campaign
              invitations, and share promotional content, while brands approve and
              track influencer performance.
            </p>
            
            <div className="flex items-center justify-center lg:justify-start">
              <div className="bg-blue-100 rounded-full p-3 inline-flex items-center justify-center relative">
                <div className="absolute inset-0 bg-blue-200 bg-opacity-50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <PlayCircleFilled className="text-blue-500 text-4xl" />
              </div>
              
              <Button
                type="link"
                className="text-blue-500 font-medium ml-4 hover:text-blue-700"
              >
                View tutorials
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}