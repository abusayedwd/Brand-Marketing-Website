"use client";
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';

const WithdrawRequestList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const withdrawRequests = [
    {
      key: 1,
      requestId: 'wdrq1',
      user: 'Chris Green',
      amount: '$500',
      requestTime: '14 Oct 24, 3:00 PM',
      status: 'Pending',
    },
    {
      key: 2,
      requestId: 'wdrq2',
      user: 'David Lee',
      amount: '$250',
      requestTime: '15 Oct 24, 1:00 PM',
      status: 'Approved',
    },
    {
      key: 3,
      requestId: 'wdrq3',
      user: 'Emma White',
      amount: '$700',
      requestTime: '16 Oct 24, 4:00 PM',
      status: 'Pending',
    },
  ];

  const columns = [
    {
      title: '#SL',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1, 
    },
    {
      title: 'Request ID',
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Request Time',
      dataIndex: 'requestTime',
      key: 'requestTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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

  const showModal = (request) => {
    setSelectedRequest(request);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">Withdraw Request List</h2>
        <Table
          columns={columns}
          dataSource={withdrawRequests}
          pagination={false}
          className="ant-table-container"
        />
      </div>

      {/* Modal to show withdraw request details */}
      <Modal
        title="Withdraw Request Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedRequest && (
          <div>
            <p><strong>Request ID:</strong> {selectedRequest.requestId}</p>
            <p><strong>User:</strong> {selectedRequest.user}</p>
            <p><strong>Amount:</strong> {selectedRequest.amount}</p>
            <p><strong>Request Time:</strong> {selectedRequest.requestTime}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WithdrawRequestList;
