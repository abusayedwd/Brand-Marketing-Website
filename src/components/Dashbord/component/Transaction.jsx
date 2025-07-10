"use client";
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { useGetMysubscriptionQuery } from '@/redux/fetures/payment/getMysubscription';

const TransactionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { data } = useGetMysubscriptionQuery();
 console.log(data)
  // Ensure that data exists and map it
  const transactions = data?.data?.attributes || []; 

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
      render: (_, record) => record.transactionId || 'N/A', // Show 'N/A' if no transaction ID
    },
    {
      title: 'Plan Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      render: (_, record) => record.planName, // Use plan name as campaign name
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (_, record) => record.status || 'N/A',  
    // },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => `${record.price} ${record.currency}`, // Show price and currency
    },
    {
      title: 'Time & Date',
      dataIndex: 'time',
      key: 'time',
      render: (_, record) => new Date(record.createdAt).toLocaleString(), // Format date
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
            <p><strong>Transaction ID:</strong> {selectedTransaction.transactionId || 'N/A'}</p>
            <p><strong>Campaign Name:</strong> {selectedTransaction.planName}</p>
            <p><strong>Email:</strong> {selectedTransaction.email || 'N/A'}</p>
            <p><strong>Amount:</strong> {`${selectedTransaction.price} ${selectedTransaction.currency}`}</p>
            <p><strong>Time & Date:</strong> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TransactionList;
