// components/CardComponent.js
 
import { useGetMyCampaignQuery } from '@/redux/fetures/campaign/getMyCampaign';
import { useGetBrandPaymentQuery } from '@/redux/fetures/payment/getBrandPayment';
import { useContentCreatorQuery } from '@/redux/fetures/user/contentCreator';
import { Card } from 'antd'; // Import Ant Design's Card component
import { FaUser, FaMoneyBillAlt, FaBullhorn, FaClipboardList } from 'react-icons/fa'; // Optional: for icons

const CardForbarand = () => {
const {data: status}= useGetBrandPaymentQuery()
const {data: contentCreators}= useContentCreatorQuery()

// console.log(contentCreators?.data?.attributes?.results?.length)
const contenNumber = contentCreators?.data?.attributes?.results?.length
  const { data: myCampaign, isLoading, error } = useGetMyCampaignQuery();
  // console.log(myCampaign);
  
  // Get campaigns from API data
  const campaigns = myCampaign?.data?.attributes?.results || [];

   // Filter campaigns by status
  const upcomingCampaigns = campaigns.filter(campaign => campaign.status === 'upComming');
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');

  return (
    <div className="flex space-x-6 p-6">
      {/* Card for Total Influencer */}


 {/* Card for Total Payment */}
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-green-500 mb-4">
            <FaMoneyBillAlt />
          </div>
          <div className="text-sm text-gray-500">Total Payment</div>
          <div className="text-xl font-semibold text-gray-800">{status?.data?.totalPayment}</div>
        </div>
      </Card>


      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-blue-500 mb-4">
            <FaUser />
          </div>
          <div className="text-sm text-gray-500">Total Content Creator</div>
          <div className="text-xl font-semibold text-gray-800">{contenNumber}</div>
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
          <div className="text-sm text-gray-500">Total My Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{campaigns?.length}</div>
        </div>
      </Card>

      {/* Card for Active Campaign */}
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-red-500 mb-4">
            <FaBullhorn />
          </div>
          <div className="text-sm text-gray-500">Active Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{activeCampaigns?.length}</div>
        </div>
      </Card>
      
      <Card
        className="w-72"
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 text-center">
          <div className="text-4xl text-red-500 mb-4">
            <FaBullhorn />
          </div>
          <div className="text-sm text-gray-500">Completed Campaign</div>
          <div className="text-xl font-semibold text-gray-800">{completedCampaigns?.length}</div>
        </div>
      </Card>
    </div>
  );
};

export default CardForbarand;
