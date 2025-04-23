"use client";

import React, { useState } from 'react';
import { Tabs, Avatar, Card, Row, Col, Button, Badge, Tooltip } from 'antd';
import { ArrowLeftOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';

const InfluencerProfile = () => {
  const [activeTab, setActiveTab] = useState('1');
  
  // Influencer data - replace with actual data from your API
  const influencer = {
    id: 1,
    name: 'Maria Rodriguez',
    role: 'Influencer',
    avatar: '/images/model2.png', // Replace with actual image path
    email: 'maria123@gmail.com',
    phone: '01234567890',
    joinedDate: 'December 1, 2015',
    socials: {
      tiktok: {
        name: 'Maria Rodriguez',
        username: '@maria123',
        followers: '1,200',
        url: 'https://tiktok.com/@maria123'
      },
      youtube: {
        name: 'Maria Rodriguez',
        username: '@maria123',
        followers: '1,200',
        url: 'https://youtube.com/@maria123'
      },
      instagram: {
        name: 'Maria Rodriguez',
        username: '@maria123',
        followers: '1,200',
        url: 'https://instagram.com/@maria123'
      },
      twitter: {
        name: 'Maria Rodriguez',
        username: '@maria123',
        followers: '1,200',
        url: 'https://twitter.com/@maria123'
      }
    }
  };

  // Campaign data - replace with actual data from your API
  const campaigns = [
    { id: 1, title: 'Holiday Music Campaign', image: '/images/campaign.png' },
    { id: 2, title: 'Holiday Music Campaign', image: '/images/campaign.png' },
    { id: 3, title: 'Holiday Music Campaign', image: '/images/campaign.png' },
    { id: 4, title: 'Holiday Music Campaign', image: '/images/campaign.png' },
    { id: 5, title: 'Holiday Music Campaign', image: '/images/campaign.png' },
    { id: 6, title: 'Holiday Music Campaign', image: '/images/campaign.png' }
  ];

  // Social platform icons
  const socialIcons = {
    tiktok: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19.321 5.562a5.122 5.122 0 01-1.152 1.768 5.071 5.071 0 01-3.356 1.361v2.738a8.835 8.835 0 01-1.624-.172 5.516 5.516 0 01-3.096-1.723v5.879a5.513 5.513 0 11-3.509-5.126v2.95a2.587 2.587 0 102.247 2.584V2.5h2.956c.171 2.352 1.178 3.622 3.534 4.079v-1.017z"/></svg>,
    youtube: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.5 6.507a2.786 2.786 0 00-2.775-2.776h-17.45A2.786 2.786 0 00.5 6.507v10.986a2.786 2.786 0 002.775 2.776h17.45a2.786 2.786 0 002.775-2.776V6.507zm-16 8.995V8.498l7.275 3.502L7.5 15.502z"/></svg>,
    instagram: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
    twitter: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  };

  const { TabPane } = Tabs;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/dashboard/influencerlist" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeftOutlined className="mr-2" /> Back to Influencers
        </Link>
      </div>

      {/* Profile header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <Avatar 
              size={100} 
              src={influencer.avatar || "https://via.placeholder.com/100/2A2A2A/FFFFFF?text=MR"} 
              className="border-2 border-gray-200"
            />
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-2xl font-bold">{influencer.name}</h1>
                <p className="text-gray-500 mb-2">{influencer.role}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.keys(influencer.socials).map((platform) => (
                    <Link 
                      href={influencer.socials[platform].url} 
                      target="_blank" 
                      key={platform}
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        platform === 'tiktok' ? 'bg-black text-white' :
                        platform === 'youtube' ? 'bg-red-600 text-white' :
                        platform === 'instagram' ? 'bg-pink-600 text-white' :
                        'bg-blue-400 text-white'
                      }`}
                    >
                      {socialIcons[platform]}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-3 md:mt-0">
                <div className="flex flex-col space-y-2 text-sm">
                  <div className="flex items-center">
                    <MailOutlined className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{influencer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <PhoneOutlined className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{influencer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarOutlined className="mr-2 text-gray-500" />
                    <span className="text-gray-700">Joined: {influencer.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social media tabs */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <Tabs 
          defaultActiveKey="1" 
          onChange={setActiveTab}
          className="influencer-tabs"
        >
          <TabPane 
            tab={
              <span className="flex items-center">
                {socialIcons.tiktok}
                <span className="ml-2">TikTok Information</span>
              </span>
            } 
            key="1"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-1">User Name:</p>
                  <p className="font-medium">{influencer.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">TikTok Account:</p>
                  <p className="font-medium">{influencer.socials.tiktok.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">TikTok Followers:</p>
                  <p className="font-medium">{influencer.socials.tiktok.followers}</p>
                </div>
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span className="flex items-center">
                {socialIcons.youtube}
                <span className="ml-2">YouTube Information</span>
              </span>
            } 
            key="2"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-1">User Name:</p>
                  <p className="font-medium">{influencer.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">YouTube Account:</p>
                  <p className="font-medium">{influencer.socials.youtube.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">YouTube Followers:</p>
                  <p className="font-medium">{influencer.socials.youtube.followers}</p>
                </div>
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span className="flex items-center">
                {socialIcons.instagram}
                <span className="ml-2">Instagram Information</span>
              </span>
            } 
            key="3"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-1">User Name:</p>
                  <p className="font-medium">{influencer.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Instagram Account:</p>
                  <p className="font-medium">{influencer.socials.instagram.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Instagram Followers:</p>
                  <p className="font-medium">{influencer.socials.instagram.followers}</p>
                </div>
              </div>
            </div>
          </TabPane>
          
          <TabPane 
            tab={
              <span className="flex items-center">
                {socialIcons.twitter}
                <span className="ml-2">X Information</span>
              </span>
            } 
            key="4"
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-500 mb-1">User Name:</p>
                  <p className="font-medium">{influencer.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">X Account:</p>
                  <p className="font-medium">{influencer.socials.twitter.username}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">X Followers:</p>
                  <p className="font-medium">{influencer.socials.twitter.followers}</p>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>

      {/* Campaigns Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recently Participated Campaigns</h2>
        <Button type="link" className="text-blue-600">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="h-36 bg-gradient-to-r from-pink-400 to-pink-600 relative">
              <img 
                src={campaign.image || "https://via.placeholder.com/300x200/FF69B4/FFFFFF"}
                alt={campaign.title}
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium mb-2">{campaign.title}</h3>
              <Button size="small" block>Go to media</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom styles to match the design */}
      <style jsx global>{`
        /* Tab styles */
        .influencer-tabs .ant-tabs-nav {
          padding: 0 1.5rem;
          margin-bottom: 0 !important;
        }
        .influencer-tabs .ant-tabs-tab {
          padding: 1rem 0;
        }
        .influencer-tabs .ant-tabs-ink-bar {
          height: 3px;
        }
        /* Custom tab colors */
        .influencer-tabs .ant-tabs-tab:nth-child(1) .ant-tabs-tab-btn:hover {
          color: #000000;
        }
        .influencer-tabs .ant-tabs-tab:nth-child(2) .ant-tabs-tab-btn:hover {
          color: #FF0000;
        }
        .influencer-tabs .ant-tabs-tab:nth-child(3) .ant-tabs-tab-btn:hover {
          color: #E1306C;
        }
        .influencer-tabs .ant-tabs-tab:nth-child(4) .ant-tabs-tab-btn:hover {
          color: #1DA1F2;
        }
        /* Active tab colors */
        .influencer-tabs .ant-tabs-tab-active:nth-child(1) .ant-tabs-tab-btn {
          color: #000000;
        }
        .influencer-tabs .ant-tabs-tab-active:nth-child(2) .ant-tabs-tab-btn {
          color: #FF0000;
        }
        .influencer-tabs .ant-tabs-tab-active:nth-child(3) .ant-tabs-tab-btn {
          color: #E1306C;
        }
        .influencer-tabs .ant-tabs-tab-active:nth-child(4) .ant-tabs-tab-btn {
          color: #1DA1F2;
        }
        /* Tab ink bar colors */
        .influencer-tabs .ant-tabs-ink-bar {
          background: #000000;
        }
      `}</style>
    </div>
  );
};

export default InfluencerProfile;