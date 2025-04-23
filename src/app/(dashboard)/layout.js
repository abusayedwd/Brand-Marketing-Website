 
 
import DashboardHeader from '@/components/Dashbord/dashboardLayout/DashboardHeader';
import Sidebar from '@/components/Dashbord/dashboardLayout/Siddebar';
import { ConfigProvider } from 'antd';

export default function DashboardLayout({ children }) {
  return (
    <ConfigProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <DashboardHeader/>
          <main className="flex-1 overflow-y-auto p-4 ">
            {children}
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
}