"use client"

// components/CardComponent.js
import { useGetAcceptedCampaignsForInfluencerQuery } from '@/redux/fetures/campaign/getMyAcceptedCampaign';
import { useUpcommingCampaignQuery } from '@/redux/fetures/campaign/upcommingCampaign';
import { useGetInfluencerStatusQuery } from '@/redux/fetures/wallet/getInfluencerStatus';
import { Card } from 'antd';
import { FaMoneyBillAlt, FaBullhorn, FaClipboardList } from 'react-icons/fa';

const CardComponent = () => {
  const {data:acceptedCampaignns} = useGetAcceptedCampaignsForInfluencerQuery()
  const {data:status} = useGetInfluencerStatusQuery()
  const acceptedCampaignn = acceptedCampaignns?.data?.attributes?.results || [];
  const { data: myCampaign, isLoading, error } = useUpcommingCampaignQuery();
  const campaigns = myCampaign?.data?.attributes?.results || [];

  const activeCampaigns = acceptedCampaignn.filter(campaign => campaign.status === 'active');
  const completedCampaignsCount = status?.data?.attributes?.completedCampaignsCount ?? 0;
 

  return (
    <div className="flex space-x-6 p-6">
      {/* Card for Total Influencer */}
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-blue-500 mb-4">
           <FaMoneyBillAlt />
          </div>
          <div className="text-sm text-gray-500">Total Earning</div>
          <div className="text-xl font-semibold text-gray-800">{status?.data?.attributes?.totalEarnings}</div>
        </div>
      </Card>

      {/* Card for Total Payment */}
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-red-500 mb-4">
            <FaMoneyBillAlt />
          </div>
          <div className="text-sm text-gray-500">Total withdraw</div>
          <div className="text-xl font-semibold text-gray-800">{status?.data?.attributes?.totalWithdrawals}</div>
        </div>
      </Card>

      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-green-500 mb-4">
            <FaMoneyBillAlt />
          </div>
          <div className="text-sm text-gray-500">Current Balance</div>
          <div className="text-xl font-semibold text-gray-800">{status?.data?.attributes?.currentBalance}</div>
        </div>
      </Card>

      {/* Card for Total Campaign */}
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-orange-500 mb-4">
            <FaClipboardList />
          </div>
          <div className="text-sm text-gray-500">Upcomming Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{campaigns.length}</div>
        </div>
      </Card>
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-orange-500 mb-4">
            <FaBullhorn />
          </div>
          <div className="text-sm text-gray-500">Active Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{activeCampaigns.length}</div>
        </div>
      </Card>
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-orange-500 mb-4">
            <FaClipboardList />
          </div>
          <div className="text-sm text-gray-500">Completed Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{completedCampaignsCount}</div>
        </div>
      </Card> 
    </div>
  );
};

export default CardComponent;
