"use client";
import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';

const PaymentRequestList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const paymentRequests = [
    {
      key: 1,
      requestId: 'pyrq1',
      user: 'John Doe',
      amount: '$150',
      requestTime: '11 Oct 24, 12:00 PM',
      status: 'Pending',
    },
    {
      key: 2,
      requestId: 'pyrq2',
      user: 'Jane Smith',
      amount: '$200',
      requestTime: '12 Oct 24, 10:00 AM',
      status: 'Approved',
    },
    {
      key: 3,
      requestId: 'pyrq3',
      user: 'Alice Brown',
      amount: '$300',
      requestTime: '13 Oct 24, 2:00 PM',
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
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">Payment Request List</h2>
        <Table
          columns={columns}
          dataSource={paymentRequests}
          pagination={false}
          className="ant-table-container"
        />
      </div>

      {/* Modal to show payment request details */}
      <Modal
        title="Payment Request Details"
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

export default PaymentRequestList;
