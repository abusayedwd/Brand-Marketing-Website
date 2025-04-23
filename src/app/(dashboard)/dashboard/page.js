import { Card, Row, Col, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import CardComponent from '@/components/Dashbord/overview/Card';
import ActiveCampaigns from '@/components/Dashbord/overview/ActiveChampain';
import Barchart from '@/components/Dashbord/overview/Barchart';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
        <CardComponent />
        <Barchart />
      
        <ActiveCampaigns />
      
      {/* Add more dashboard content here */}
    </div>
  );
}