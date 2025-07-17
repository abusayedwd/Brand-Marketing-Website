"use client"

import React, { useState } from 'react';
import { Button, Card, List, Pagination, Typography, Avatar } from 'antd';
import { BankOutlined, CameraOutlined, DollarOutlined } from '@ant-design/icons';
import { useGetMyWalletQuery } from '@/redux/fetures/wallet/getMyWallet';
import { useRouter } from 'next/navigation';
import WithdrawRequestPage from './MywithdrawHistory';

const { Title, Text } = Typography;

const WalletPage = () => {

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  
  const {data: mywallet} = useGetMyWalletQuery()
  // console.log("dataaaaaaaaaa>>>>>>>>>>:",mywallet)
  
  // Get transactions and balance from API data
  const transactions = mywallet?.data?.attributes?.transactions || [];
  const balance = mywallet?.data?.attributes?.balance || 0;
  const total = transactions.length;
  
  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get current page transactions
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handleWithdraw = () => {
     router.push('/dashboard/my-wallet/withdraw-request')
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
   <div className='flex '>
    <div className='md:w-[30%] w-full'> 
      <div className="mx-auto">
        {/* Balance Card */}
        <Card className="mb-6 relative overflow-hidden">
    
          <div className="bg-gradient-to-r from-teal-300 via-blue-300 to-purple-400 p-8 -m-6 mb-4">
            {/* Camera Icon */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white bg-opacity-50 rounded flex items-center justify-center">
                  <CameraOutlined className="text-blue-600 text-lg" />
                </div>
              </div>
            </div>
            
            {/* Dollar Icon */}
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-teal-400 bg-opacity-50 rounded-full flex items-center justify-center">
                <DollarOutlined className="text-white text-xl" />
              </div>
            </div>
            
            {/* Balance Content */}
            <div className="text-center pt-12">
              <Text className="text-gray-700 text-base block font-semibold mb-2">Total Balance</Text>
              <Title level={1} className="text-blue-600 !mb-0 !text-4xl font-bold">
                ${balance}
              </Title>
            </div>
          </div>
          
          {/* Withdraw Button */}
          <Button 
            type="primary" 
            size="large" 
            block 
            className="bg-blue-600 hover:bg-blue-700 h-12 text-white font-semibold text-base"
            onClick={handleWithdraw}
          >
            WITHDRAW BALANCE
          </Button>
        </Card>

        {/* Recent Withdrawals */}
        <Card>
          <Title level={3} className="!mb-6 text-gray-800">Recent Transactions</Title>
          
          {currentTransactions.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={currentTransactions}
              renderItem={(item) => (
                <List.Item className="px-0 py-4 border-b border-gray-100 last:border-b-0">
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={<BankOutlined />} 
                        className={`w-10 h-10 flex items-center justify-center ${
                          item.type === 'deposit' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}
                      />
                    }
                    title={
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${
                          item.type === 'deposit' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {item.type === 'deposit' ? '+' : '-'}${item.amount}
                        </span>
                        <span className="text-gray-500 text-sm">{formatDate(item.date)}</span>
                      </div>
                    }
                    description={
                      <div>
                        <Text className="text-gray-600 block">{item.description}</Text>
                        {item.campaignName && (
                          <Text className="text-gray-500 text-sm">Campaign: {item.campaignName}</Text>
                        )}
                        <Text className={`text-sm font-medium ${
                          item.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <div className="text-center py-8">
              <Text className="text-gray-500">No transactions found</Text>
            </div>
          )}
          
          {/* Pagination */}
          {total > pageSize && (
            <div className="mt-6 flex justify-between items-center">
              <Text className="text-gray-600">
                SHOWING {startIndex + 1}-{Math.min(endIndex, total)} OF {total}
              </Text>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="flex items-center"
              />
            </div>
          )}
        </Card>
      </div> 
    </div>
    <div className='md:w-[70%] w-full'> 
        <WithdrawRequestPage />
    </div>
   </div> 
   
    </div>
  );
};

export default WalletPage;