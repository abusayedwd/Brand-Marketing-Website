"use client";

import { useContentCreatorQuery } from "@/redux/fetures/user/contentCreator";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Modal, Space, Table } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import getMediaUrl from "@/utils/getMediaUrl";
import StartChatButton from "@/components/shared/StartChatButton";
import FavoriteButton from "@/components/shared/FavoriteButton";

const InfluencersList = () => {
  const { data: influencerData } = useContentCreatorQuery();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // Update the influencer data and pagination based on the API response
  useEffect(() => {
    if (influencerData && influencerData.data && influencerData.data.attributes.results) {
      const { totalResults } = influencerData.data.attributes;
      setPagination(prev => ({
        ...prev,
        total: totalResults, // Set total number of items for pagination
      }));
    }
  }, [influencerData]);

  const showModal = (influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInfluencer(null);
  };

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
    });
  };

  // Conditionally render influencers based on API data
  const influencers = influencerData?.data?.attributes?.results || [];

  const columns = [
    {
      title: 'S. No',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1, 
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
      render: (_, influencer) => influencer.followers || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, influencer) => (
        <Space wrap>
          <Button
            type="default"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => showModal(influencer)}
          >
            View
          </Button>
          <Link href={`/influencer/${influencer.id}`}>
            <Button>Profile</Button>
          </Link>
          <StartChatButton userId={influencer.id} size="small" />
          <FavoriteButton influencerId={influencer.id} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">All Content Creator List</h2>
      
      {/* Table to show influencers */}
      <Table
        columns={columns}
        dataSource={influencers}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize });
          },
        }}
        onChange={handleTableChange}
        rowKey="id" // Set the unique key for each row
      />

      {/* Modal to show influencer details */}
      <Modal
        title="Influencer Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        destroyOnClose={true}
        centered
      >
        {selectedInfluencer && (
          <div className="custom-modal-content">
            <div className="modal-header">
              <h3 className="modal-title">{selectedInfluencer.fullName}</h3>
              <Button type="text" onClick={handleCancel} icon={<ArrowLeftOutlined />} />
            </div>
            <div className="modal-body">
              <img
                src={getMediaUrl(selectedInfluencer.image, "/images/default-avatar.png")}
                alt="Influencer Image"
                className="modal-image"
              />
              <p><strong>Email:</strong> {selectedInfluencer.email}</p>
              <p><strong>Phone Number:</strong> {selectedInfluencer.phoneNumber}</p>
              <p><strong>Bio:</strong> {selectedInfluencer.bio || 'No bio available'}</p>
              <p><strong>Date of Birth:</strong> {new Date(selectedInfluencer.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Interests:</strong> {selectedInfluencer.interests.join(', ')}</p>
              <p><strong>Social Media:</strong> {selectedInfluencer.socialMedia?.map((social, idx) => (
                <span key={idx}>{social.platform} </span>
              ))}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InfluencersList;
