"use client";
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import { useCampaignPaymentQuery } from '@/redux/fetures/payment/campaignPayment';

const PaymentRequestList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { data: transactionData } = useCampaignPaymentQuery();

  const [paymentRequests, setPaymentRequests] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5, // Adjust the page size as needed
    total: 0,
  });

  // Set the payment requests and pagination when the data is fetched
  useEffect(() => {
    if (transactionData && transactionData?.data && transactionData?.data?.attributes?.results) {
      const transformedData = transactionData?.data?.attributes?.results.map((transaction) => ({
        key: transaction?.id, // Unique key based on transaction? id
        requestId: transaction?.id,
        user: transaction?.campaignId?.campaignName, // Campaign name
        amount: `$${transaction?.amount}`,
        requestTime: new Date(transaction?.transactionDate).toLocaleString(),
        status: transaction?.paymentStatus,
        campaignId: transaction?.campaignId,
        brandId: transaction?.brandId,
      }));
      setPaymentRequests(transformedData);
      setPagination((prev) => ({
        ...prev,
        total: transactionData?.data?.attributes?.totalResults, // Update the total count of records from API
      }));
    }
  }, [transactionData]);

  const columns = [
    {
      title: '#SL',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1, 
    },
    {
      title: 'Transaction ID',
      dataIndex: 'requestId',
      key: 'requestId',
    },
    {
      title: 'Campaign Name',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Transaction Time',
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

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    // Optionally, refetch the data based on the page change, passing the pagination params
    // If your API supports paginated requests, you can modify your query to fetch the current page's data.
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 p-4 border-b">Payment Request List</h2>
        <Table
          columns={columns}
          dataSource={paymentRequests}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize });
            },
          }}
          onChange={handleTableChange}
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
            <p><strong>User (Campaign Name):</strong> {selectedRequest.user}</p>
            <p><strong>Amount:</strong> {selectedRequest.amount}</p>
            <p><strong>Request Time:</strong> {selectedRequest.requestTime}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>

            {/* Brand and Campaign Info */}
            <h3 className="mt-4">Brand and Campaign Information</h3>
            <p><strong>Campaign Name:</strong> {selectedRequest?.campaignId?.campaignName}</p>
            <p><strong>Description:</strong> {selectedRequest?.campaignId?.description}</p>
            <p><strong>Start Date:</strong> {new Date(selectedRequest?.campaignId?.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedRequest?.campaignId?.endDate).toLocaleDateString()}</p>
            {/* <p><strong>Platforms:</strong> {JSON.parse(selectedRequest?.campaignId?.selectedPlatforms[0]).join(', ')}</p> */}
            <p><strong>Influencer Count:</strong> {selectedRequest?.campaignId?.influencerCount}</p>
            <p><strong>Campaign Image:</strong> <img src={selectedRequest?.campaignId?.image} alt="Campaign" style={{ width: '100px', height: 'auto' }} /></p>

            {/* Brand Information */}
            <h3 className="mt-4">Brand Information</h3>
            <p><strong>Brand Name:</strong> {selectedRequest?.brandId?.fullName}</p>
            <p><strong>Email:</strong> {selectedRequest?.brandId?.email}</p>
            <p><strong>Phone Number:</strong> {selectedRequest?.brandId?.phoneNumber}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentRequestList;
