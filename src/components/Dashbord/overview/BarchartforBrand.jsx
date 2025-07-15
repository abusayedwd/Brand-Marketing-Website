 
"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Select } from 'antd';
import { useGetMyCampaignQuery } from '@/redux/fetures/campaign/getMyCampaign';
import { useBrandEarningChartQuery } from '@/redux/fetures/payment/brandEarningChart';

const BarchartforBrand = () => {

  const { data: myCampaign, isLoading, error } = useGetMyCampaignQuery();
  // console.log(myCampaign);
  
  // Get campaigns from API data
  const campaigns = myCampaign?.data?.attributes?.results || [];

   // Filter campaigns by status
  const upcomingCampaigns = campaigns.filter(campaign => campaign.status === 'upComming');
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');

  const [selectedYear, setSelectedYear] = useState('2025');

 const { data: areaChartData } = useBrandEarningChartQuery(selectedYear);
  console.log(areaChartData);

  

  // Check if areaChartData is available and properly formatted
  const formattedAreaChartData = areaChartData?.data?.attributes?.map((item) => ({
    month: item.month,
    earning: parseFloat(item.totalEarnings),  // Assuming totalEarnings is a string, converting it to number
  })) || [];

 

  // Payment data organized by year
  const paymentDataByYear = {
    '2023': [
      { month: 'Jan', value: 55, growth: 12 },
      { month: 'Feb', value: 62, growth: 18 },
      { month: 'Mar', value: 75, growth: 24 },
      { month: 'Apr', value: 78, growth: 26 },
      { month: 'May', value: 67, growth: 20 },
      { month: 'Jun', value: 38, growth: 10 },
      { month: 'Jul', value: 45, growth: 14 },
      { month: 'Aug', value: 55, growth: 17 },
      { month: 'Sep', value: 68, growth: 22 },
      { month: 'Oct', value: 72, growth: 25 },
      { month: 'Nov', value: 60, growth: 19 },
      { month: 'Dec', value: 50, growth: 15 },
    ],
    '2022': [
      { month: 'Jan', value: 45, growth: 10 },
      { month: 'Feb', value: 52, growth: 14 },
      { month: 'Mar', value: 60, growth: 18 },
      { month: 'Apr', value: 65, growth: 20 },
      { month: 'May', value: 58, growth: 17 },
      { month: 'Jun', value: 30, growth: 8 },
      { month: 'Jul', value: 35, growth: 10 },
      { month: 'Aug', value: 48, growth: 14 },
      { month: 'Sep', value: 58, growth: 18 },
      { month: 'Oct', value: 62, growth: 19 },
      { month: 'Nov', value: 50, growth: 16 },
      { month: 'Dec', value: 40, growth: 12 },
    ],
    '2021': [
      { month: 'Jan', value: 35, growth: 8 },
      { month: 'Feb', value: 42, growth: 12 },
      { month: 'Mar', value: 50, growth: 15 },
      { month: 'Apr', value: 55, growth: 17 },
      { month: 'May', value: 48, growth: 14 },
      { month: 'Jun', value: 25, growth: 7 },
      { month: 'Jul', value: 30, growth: 9 },
      { month: 'Aug', value: 38, growth: 11 },
      { month: 'Sep', value: 48, growth: 15 },
      { month: 'Oct', value: 52, growth: 16 },
      { month: 'Nov', value: 40, growth: 12 },
      { month: 'Dec', value: 35, growth: 10 },
    ]
  };

  // Campaign data for the pie chart
  const campaignData = [
    { name: 'Upcoming', value: upcomingCampaigns?.length, color: '#8BB6FC' },
    { name: 'Active', value: activeCampaigns?.length, color: '#4A90E2' },
    { name: 'Complete', value: completedCampaigns?.length, color: '#1B5EB8' },
  ];

  // Year selection options
  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2026', label: '2026' },
    { value: '2027', label: '2027' },
    { value: '2028', label: '2028' },
    { value: '2029', label: '2029' },
    { value: '2030', label: '2030' },
  ];

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium text-gray-700">{`${label || ''}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color || entry.fill }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 font-sans">
      <div className="flex flex-col md:flex-row gap-6">
         {/* Line Chart Card */}
         <div className="bg-white rounded-lg shadow-md p-6 md:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Payment Trends</h2>
            <div className="flex items-center gap-4">
              <Select
                defaultValue={selectedYear}
                onChange={handleYearChange}
                options={yearOptions}
                className="w-24"
                dropdownStyle={{ zIndex: 1000 }}
              />
            </div>
          </div>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={formattedAreaChartData} 
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <defs>
                  <linearGradient id="colorBlueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6FADFF" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#BFD7FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis hide={true} />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />
                
                <Area 
                  type="monotone" 
                  dataKey="earning" 
                  stroke="#4A90E2"
                  strokeWidth={2}
                  fill="url(#colorBlueGradient)"
                  animationDuration={1500}
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            {/* Gradient overlay for enhanced wave effect */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-transparent to-transparent opacity-20"></div>
          </div>
        </div>
        
        {/* Pie Chart Card */}
        <div className="bg-white rounded-lg shadow-md p-6 md:w-1/3">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Campaign Status</h2>
              {/* <p className="text-2xl font-bold">1000+</p> */}
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {campaignData.map((entry, index) => (
                    <linearGradient key={`gradient-${index}`} id={`pieGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                      <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  data={campaignData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  animationDuration={1500}
                >
                  {campaignData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#pieGradient${index})`} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              {campaignData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-xs text-gray-600">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarchartforBrand;