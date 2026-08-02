import DashboardHeader from '@/components/Dashbord/dashboardLayout/DashboardHeader';
import Sidebar from '@/components/Dashbord/dashboardLayout/Siddebar';
import AuthGuard from '@/components/Dashbord/dashboardLayout/AuthGuard';
import { ConfigProvider } from 'antd';

export default function DashboardLayout({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#047857',
          borderRadius: 10,
          fontFamily: 'inherit',
        },
      }}
    >
      <AuthGuard>
        <div className="flex h-screen bg-[#f4f7f5]">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </AuthGuard>
    </ConfigProvider>
  );
}