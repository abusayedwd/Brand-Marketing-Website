// components/CardComponent.js
import { Card } from 'antd'; // Import Ant Design's Card component
import { FaUser, FaMoneyBillAlt, FaBullhorn, FaClipboardList } from 'react-icons/fa'; // Optional: for icons

const CardComponent = () => {
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
            <FaUser />
          </div>
          <div className="text-sm text-gray-500">Total Influencer</div>
          <div className="text-xl font-semibold text-gray-800">5000+</div>
        </div>
      </Card>

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
          <div className="text-xl font-semibold text-gray-800">10,000</div>
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
          <div className="text-sm text-gray-500">Total Campaign</div>
          <div className="text-xl font-semibold text-gray-800">120</div>
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
          <div className="text-xl font-semibold text-gray-800">100</div>
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
