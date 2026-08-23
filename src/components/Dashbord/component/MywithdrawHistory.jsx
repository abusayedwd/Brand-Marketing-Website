import React, { useState, useEffect } from 'react';
import { Table, Tag, Card, Select, Row, Col, Statistic, Button } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import getMediaUrl from '@/utils/getMediaUrl';
import { useGetMyWithdrawQuery } from '@/redux/fetures/wallet/getMywithdraw';

const { Option } = Select;

const WithdrawRequestPage = () => {
 const { data: withdrawData, isLoading, error, refetch } = useGetMyWithdrawQuery();
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (withdrawData?.data?.attributes?.results) {
      const data = withdrawData.data.attributes.results;
      if (statusFilter === 'all') {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter(item => item.status === statusFilter));
      }
    }
  }, [withdrawData, statusFilter]);

  // Calculate statistics
  const getStatistics = () => {
    const data = withdrawData?.data?.attributes?.results || [];
    const pending = data.filter(item => item.status === 'pending').length;
    const approved = data.filter(item => item.status === 'approved').length;
    const totalAmount = data.reduce((sum, item) => sum + (item.amount || 0), 0);
    const pendingAmount = data.filter(item => item.status === 'pending').reduce((sum, item) => sum + (item.amount || 0), 0);
    const approvedAmount = data.filter(item => item.status === 'approved').reduce((sum, item) => sum + (item.amount || 0), 0);
    
    return { pending, approved, totalAmount, pendingAmount, approvedAmount };
  };

  const stats = getStatistics();

  const handleFilterChange = (value) => {
    setStatusFilter(value);
  };

  const handleRefresh = () => {
    refetch();
  };

  // Get status tag with appropriate color
  const getStatusTag = (status) => {
    const statusConfig = {
      pending: {
        color: 'orange',
        icon: <ClockCircleOutlined />,
        text: 'Pending'
      },
      approved: {
        color: 'green',
        icon: <CheckCircleOutlined />,
        text: 'Approved'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Tag 
        color={config.color} 
        icon={config.icon}
        style={{ 
          fontWeight: 'bold',
          padding: '4px 8px',
          borderRadius: '6px'
        }}
      >
        {config.text}
      </Tag>
    );
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error loading withdraw requests</div>;

  // Columns for the Ant Design Table
  const columns = [
    {
      title: 'S. No',
      key: 'serialNumber',
      width: 80,
      render: (_, __, index) => (
        <span className="font-medium text-gray-600">{index + 1}</span>
      ),
    },
    {
      title: 'Influencer Name',
      key: 'fullName',
      render: (_, withdraw) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{withdraw.influencerId.fullName}</span>
          <span className="text-sm text-gray-500">{withdraw.influencerId.email}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <span className="font-bold text-green-600 text-lg">${amount}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => (
        <span className="text-gray-700">{reason || 'No reason provided'}</span>
      ),
    },
    {
      title: 'Bank Details',
      key: 'bankDetails',
      render: (_, withdraw) => (
        <div className="text-sm">
          <div className="font-medium">{withdraw.bankDetails.bankName}</div>
          <div className="text-gray-500">Acc: {withdraw.bankDetails.accountNumber}</div>
          <div className="text-gray-500">{withdraw.bankDetails.holderName}</div>
        </div>
      ),
    },
    {
      title: 'Created Date',
      key: 'createdAt',
      render: (_, withdraw) => (
        <span className="text-gray-600">
          {new Date(withdraw.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      ),
    },
    {
      title: 'Approval Note',
      key: 'approvalNote',
      render: (_, withdraw) => (
        withdraw.status === 'approved' && withdraw.approvalNote ? (
          <span className="text-green-700 text-sm bg-green-50 px-2 py-1 rounded">
            {withdraw.approvalNote}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )
      ),
    },
    {
      title: 'Signature',
      key: 'signature',
      render: (_, withdraw) => (
        withdraw.image ? (
          <img
            src={getMediaUrl(withdraw.image)}
            alt="Signature"
            className="w-16 h-12 object-cover border rounded shadow-sm"
          />
        ) : (
          <span className="text-gray-400">No signature</span>
        )
      ),
    },
  ];

  return (
    <div className="mx-auto mt-8 px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Withdraw History</h1>
        <p className="text-gray-600">View and manage withdrawal requests from influencers</p>
      </div> 
      
      {/* Filters and Actions */}
      <Card className="mb-4">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8}>
            <div className="flex items-center space-x-2">
              <FilterOutlined className="text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by Status:</span>
              <Select
                value={statusFilter}
                onChange={handleFilterChange}
                style={{ width: 120 }}
              >
                <Option value="all">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="approved">Approved</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <div className="flex items-center space-x-2 text-gray-600">
              <span>Showing {filteredData.length} of {withdrawData?.data?.attributes?.totalResults || 0} requests</span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={8} className="text-right">
            <Button 
              icon={<ReloadOutlined />} 
              onClick={handleRefresh}
              loading={isLoading}
            >
              Refresh
            </Button>
          </Col>
        </Row>
      </Card>
      
      <Card className="shadow-lg">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          className="custom-table"
          scroll={{ x: 1200 }}
        />
      </Card>

      <style jsx>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #374151;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background-color: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default WithdrawRequestPage;