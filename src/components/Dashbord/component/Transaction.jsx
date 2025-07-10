// import React from "react";
// import { Table, Button, Menu } from "antd";

// // Sample Transaction List Component
// const TransactionList = () => {
//   // Columns definition for the Ant Design table
//   const columns = [
//     {
//       title: "#SL",
//       dataIndex: "sl",
//       key: "sl",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Transaction ID",
//       dataIndex: "transactionId",
//       key: "transactionId",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Campaign Name",
//       dataIndex: "campaignName",
//       key: "campaignName",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Time & Date",
//       dataIndex: "time",
//       key: "time",
//       render: (text) => <span className="text-gray-700">{text}</span>,
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: () => (
//         <Button
//           type="link"
//           className="text-blue-500 hover:text-blue-700"
//           icon={<i className="fa fa-eye"></i>}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   // Sample data for the table
//   const data = [
//     {
//       key: "1",
//       sl: "01",
//       transactionId: "rtrgfgvb",
//       campaignName: "Holiday Music Campaign",
//       email: "abc@gmail.com",
//       amount: "$1,200",
//       time: "11 oct 24, 11:10PM",
//     },
//     {
//       key: "2",
//       sl: "02",
//       transactionId: "rtrgfgvb",
//       campaignName: "Holiday Music Campaign",
//       email: "abc@gmail.com",
//       amount: "$1,200",
//       time: "11 oct 24, 11:10PM",
//     },
//     // More rows...
//   ];

//   // Menu component using 'items' prop instead of 'children'
//   const menuItems = [
//     { key: '1', label: 'Item 1' },
//     { key: '2', label: 'Item 2' },
//     { key: '3', label: 'Item 3' },
//   ];

//   return (
//     <div className="container mx-auto my-10 px-5">
//       <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
//         All Transaction List
//       </h1>
      
//       {/* Example of Menu usage with the 'items' prop */}
//       <Menu items={menuItems} />
      
//       <Table columns={columns} dataSource={data} />
//     </div>
//   );
// };

// export default TransactionList;

"use client";
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { useCampaignPaymentQuery } from '@/redux/fetures/payment/campaignPayment';
 
 

const TransactionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
 const {data:transaction } = useCampaignPaymentQuery()
 
console.log("addddddddddddd:",transaction)
  const transactions = [
    {
      key: 1,
      transactionId: 'rtrgfyb',
      campaignName: 'Holiday Music Campaign',
      email: 'abc@gmail.com',
      amount: '$1200',
      time: '11 Oct 24, 11:00 PM',
    },
    {
      key: 2,
      transactionId: 'rtrgfyb',
      campaignName: 'Holiday Music Campaign',
      email: 'abc@gmail.com',
      amount: '$1200',
      time: '11 Oct 24, 11:00 PM',
    },
    {
      key: 3,
      transactionId: 'rtrgfyb',
      campaignName: 'Holiday Music Campaign',
      email: 'abc@gmail.com',
      amount: '$1200',
      time: '11 Oct 24, 11:00 PM',
    },
    {
      key: 4,
      transactionId: 'rtrgfyb',
      campaignName: 'Holiday Music Campaign',
      email: 'abc@gmail.com',
      amount: '$1200',
      time: '11 Oct 24, 11:00 PM',
    },
  ];


  
  const columns = [
    {
      title: '#SL',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1, // Index for the Serial Number
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Time & Date',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          View
        </Button>
      ),
    },
  ];

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">All Transaction List</h2>
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={false}
          className="ant-table-container"
        />
      </div>

      {/* Modal to show transaction details */}
      <Modal
        title="Transaction Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedTransaction && (
          <div>
            <p><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</p>
            <p><strong>Campaign Name:</strong> {selectedTransaction.campaignName}</p>
            <p><strong>Email:</strong> {selectedTransaction.email}</p>
            <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
            <p><strong>Time & Date:</strong> {selectedTransaction.time}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionList;
