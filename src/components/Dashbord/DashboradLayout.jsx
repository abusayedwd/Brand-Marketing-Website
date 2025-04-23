// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { 
//   MenuFoldOutlined, 
//   MenuUnfoldOutlined, 
//   UserOutlined, 
//   HomeOutlined, 
//   AppstoreOutlined, 
//   SettingOutlined,
//   LogoutOutlined,
//   BarsOutlined,
//   ShoppingOutlined,
//   DashboardOutlined
// } from "@ant-design/icons";
// import { Layout, Menu, Button, Avatar, Dropdown, Modal } from "antd";

// const { Header, Sider, Content } = Layout;

// const DashboardLayout = ({ children }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const pathname = usePathname();

//   // Toggle sidebar collapse state
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   // Toggle mobile menu state
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   // Logout confirmation modal handlers
//   const openLogoutModal = () => setIsLogoutModalOpen(true);
//   const closeLogoutModal = () => setIsLogoutModalOpen(false);

//   const handleLogout = () => {
//     console.log("Logging out...");
//     // Remove user session data
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
    
//     closeLogoutModal();
//     window.location.href = "/";
//   };

//   // Menu items for sidebar
//   const menuItems = [
//     {
//       key: "/dashboard",
//       icon: <DashboardOutlined />,
//       label: "Dashboard",
//       path: "/dashboard",
//     },
//     {
//       key: "/dashboard/profile",
//       icon: <UserOutlined />,
//       label: "Influencer",
//       path: "/dashboard/influencer",
//     },
//     {
//       key: "/dashboard/properties",
//       icon: <HomeOutlined />,
//       label: "Campaigns",
//       path: "/dashboard/campaigns",
//     },
//     {
//       key: "/dashboard/orders",
//       icon: <ShoppingOutlined />,
//       label: "Orders",
//       path: "/dashboard/orders",
//     },
//     {
//       key: "/dashboard/settings",
//       icon: <SettingOutlined />,
//       label: "Settings",
//       path: "/dashboard/settings",
//     },
//   ];

//   // User dropdown menu items
//   const userMenuItems = [
//     {
//       key: '1',
//       label: 'Profile',
//       icon: <UserOutlined />,
//       onClick: () => window.location.href = '/dashboard/profile',
//     },
//     {
//       key: '2',
//       label: 'Settings',
//       icon: <SettingOutlined />,
//       onClick: () => window.location.href = '/dashboard/settings',
//     },
//     {
//       key: '3',
//       label: 'Logout',
//       icon: <LogoutOutlined />,
//       onClick: openLogoutModal,
//     },
//   ];

//   return (
//     <Layout className="min-h-screen">
//       {/* Sidebar for desktop */}
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         className="hidden md:block"
//         style={{
//           overflow: 'auto',
//           height: '100vh',
//           position: 'fixed',
//           left: 0,
//           top: 0,
//           bottom: 0,
//           background: "#222F55",
//         }}
//       >
//         <div className="p-4 flex justify-center">
//           <Link href="/">
//             <img 
//               src="/images/logo.png" 
//               alt="Logo" 
//               className={collapsed ? "w-8" : "w-32"}
//             />
//           </Link>
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[pathname]}
//           style={{ background: "#222F55", borderRight: 0 }}
//         >
//           {menuItems.map((item) => (
//             <Menu.Item key={item.key} icon={item.icon}>
//               <Link href={item.path}>{item.label}</Link>
//             </Menu.Item>
//           ))}
//         </Menu>
//       </Sider>

//       <Layout className="md:ml-[200px] transition-all duration-300" style={{ marginLeft: collapsed ? 80 : 0 }}>
//         {/* Header */}
//         <Header className="bg-white p-0 shadow-md flex items-center justify-between">
//           <div className="flex items-center">
//             {/* Mobile menu trigger */}
//             <Button
//               type="text"
//               icon={<BarsOutlined />}
//               onClick={toggleMobileMenu}
//               className="md:hidden ml-4"
//             />
            
//             {/* Desktop sidebar toggle */}
//             <Button
//               type="text"
//               icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               onClick={toggleCollapsed}
//               className="hidden md:block ml-4"
//             />
            
//             <h1 className="text-lg font-bold ml-4">Dashboard</h1>
//           </div>
          
//           {/* User profile */}
//           <div className="mr-6">
//             <Dropdown
//               menu={{ items: userMenuItems }}
//               placement="bottomRight"
//               trigger={["click"]}
//             >
//               <div className="flex items-center cursor-pointer">
//                 <Avatar icon={<UserOutlined />} />
//                 <span className="ml-2 hidden sm:inline">John Doe</span>
//               </div>
//             </Dropdown>
//           </div>
//         </Header>
        
//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-[#222F55] text-white p-4 absolute w-full z-50">
//             <div className="flex justify-between items-center mb-4">
//               <img src="/images/logo.png" alt="Logo" className="w-32" />
//               <Button 
//                 type="text" 
//                 icon={<MenuFoldOutlined />} 
//                 onClick={toggleMobileMenu}
//                 className="text-white" 
//               />
//             </div>
//             <div className="flex flex-col space-y-3">
//               {menuItems.map((item) => (
//                 <Link 
//                   key={item.key} 
//                   href={item.path}
//                   className={`flex items-center py-2 px-4 hover:bg-[#1a243f] rounded ${
//                     pathname === item.path ? "bg-[#1a243f] text-green-400" : ""
//                   }`}
//                   onClick={toggleMobileMenu}
//                 >
//                   <span className="mr-3">{item.icon}</span>
//                   {item.label}
//                 </Link>
//               ))}
//               <div 
//                 className="flex items-center py-2 px-4 hover:bg-[#1a243f] rounded cursor-pointer"
//                 onClick={openLogoutModal}
//               >
//                 <LogoutOutlined className="mr-3" />
//                 Logout
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Main content */}
//         <Content
//           className="p-6 bg-gray-100"
//           style={{ minHeight: 'calc(100vh - 64px)' }}
//         >
//           {children}
//           jkhjkkkjhj
//         </Content>
//       </Layout>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         open={isLogoutModalOpen}
//         onCancel={closeLogoutModal}
//         footer={null}
//         centered
//       >
//         <div className="text-center">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             Are you sure you want to logout?
//           </h2>
//           <div className="flex justify-center gap-4">
//             <Button
//               type="primary"
//               className="bg-green-600 hover:bg-green-500 text-white"
//               onClick={handleLogout}
//             >
//               Yes
//             </Button>
//             <Button
//               className="bg-gray-200 hover:bg-gray-300 text-gray-700"
//               onClick={closeLogoutModal}
//             >
//               No
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </Layout>
//   );
// };

// export default DashboardLayout;


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined, 
  HomeOutlined, 
  AppstoreOutlined, 
  SettingOutlined,
  LogoutOutlined,
  BarsOutlined,
  ShoppingOutlined,
  DashboardOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, Avatar, Dropdown, Modal, Form, Input } from "antd";
import Barchart from "./overview/Barchart";
import CardComponent from "./overview/Card";
import ActiveCampaigns from "./overview/ActiveChampain";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ( {children} ) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false); // For Change Password Modal
 
    
  // Open and close modals
  const openPasswordModal = () => setIsModalOpen(true);
  const closePasswordModal = () => setIsModalOpen(false);

  const pathname = usePathname();

  // Toggle sidebar collapse state
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Toggle mobile menu state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 

  const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    console.log("Form Values: ", ChangePassword);
    // try{
    //   const res = await changePassword(ChangePassword).unwrap();
    //   console.log(res);
    //   if(res?.code == 200){
    //     toast.success(res?.message)
    //     closePasswordModal(true)
    //     router.push('/')
    //   }
    // } catch(error) {
    //   console.log(error)
    //   setError(error?.data?.message)
    // }
  };

  // Logout confirmation modal handlers
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    console.log("Logging out...");
    // Remove user session data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    closeLogoutModal();
    window.location.href = "/";
  };

  // Menu items for sidebar
  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      key: "/dashboard/profile",
      icon: <UserOutlined />,
      label: "Influencerlist",
      path: "/dashboard/influencerlist",
    },
    {
      key: "/dashboard/properties",
      icon: <HomeOutlined />,
      label: "Campaigns",
      path: "/dashboard/campaigns",
    },
    {
      key: "/dashboard/orders",
      icon: <ShoppingOutlined />,
      label: "Orders",
      path: "/dashboard/orders",
    },
    {
      key: "/dashboard/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      path: "/dashboard/settings",
    },
  ];

  // User dropdown menu items
  const userMenuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => window.location.href = '/dashboard/profile',
    },
    {
      key: '2',
      label: 'Change Password',
      icon: <SettingOutlined />,
      onClick: openPasswordModal,
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: openLogoutModal,
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Sidebar for desktop */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden md:block"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: "#222F55",
          zIndex: 1000,
        }}
      >
        <div className="p-4 flex justify-center">
          <Link href="/">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className={collapsed ? "w-8" : "w-32"}
            />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          style={{ background: "#222F55", borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link href={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      <Layout className="md:ml-[200px] transition-all duration-300" style={{ marginLeft: collapsed ? 80 : 0 }}>
        {/* Sticky Header */}
        <Header 
          className="bg-white p-0 shadow-md flex items-center justify-between sticky top-0 z-50"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            padding: '0 16px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="flex items-center">
            {/* Mobile menu trigger */}
            <Button
              type="text"
              icon={<BarsOutlined />}
              onClick={toggleMobileMenu}
              className="md:hidden ml-4"
            />
            
            {/* Desktop sidebar toggle */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              className="hidden md:block ml-4"
            />
            
            <h1 className="text-lg font-bold ml-4">Dashboard</h1>
          </div>
          
          {/* User profile */}
          <div className="mr-6">
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div className="flex items-center cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span className="ml-2 hidden sm:inline">John Doe</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#222F55] text-white p-4 absolute w-full z-50">
            <div className="flex justify-between items-center mb-4">
              <img src="/images/logo.png" alt="Logo" className="w-32" />
              <Button 
                type="text" 
                icon={<MenuFoldOutlined />} 
                onClick={toggleMobileMenu}
                className="text-white" 
              />
            </div>
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <Link 
                  key={item.key} 
                  href={item.path}
                  className={`flex items-center py-2 px-4 hover:bg-[#1a243f] rounded ${
                    pathname === item.path ? "bg-[#1a243f] text-green-400" : ""
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
              <div 
                className="flex items-center py-2 px-4 hover:bg-[#1a243f] rounded cursor-pointer"
                onClick={openLogoutModal}
              >
                <LogoutOutlined className="mr-3" />
                Logout
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <Content
          className="p-6 bg-gray-100 md:ml-44 ml-2"
          style={{ 
            minHeight: 'calc(100vh - 64px)',
            paddingTop: isMobileMenuOpen ? '0' : '16px'
          }}
        >
          {children}
        
        </Content>
      </Layout>

             {/* Change Password Modal */}
             <Modal
          open={isModalOpen}
          onOk={closePasswordModal}
          onCancel={closePasswordModal}
          footer={null}
        >
          <div className="flex flex-col w-[80%] mx-auto ">
            <h2 className="text-[28px] text-left font-semibold mb-4">
              Change Password
            </h2>
            <p className="mb-8 text-gray-600">
              Your password must be 8-10 characters long.
            </p>
            <Form
              name="changePassword"
              layout="vertical"
              onFinish={changePassword}
            >
              <Form.Item
                name="oldPassword"
                label="Old Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your old password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    border: "1px solid green",
                  }}
                  placeholder="Old Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    border: "1px solid green",
                  }}
                  placeholder="New Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["newPassword"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{
                    height: "40px",
                    background: "#E6F9EF",
                    border: "1px solid green",
                  }}
                  placeholder="Confirm Password"
                  prefix={<LockOutlined />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              {/* <p className="text-red-500 font-medium">{error}</p> */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-10 py-3 !bg-[#69C0BE] !text-black text-[16px] rounded-md"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalOpen}
        onCancel={closeLogoutModal}
        footer={null}
        centered
      >
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              type="primary"
              className="bg-green-600 hover:bg-green-500 text-white"
              onClick={handleLogout}
            >
              Yes
            </Button>
            <Button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={closeLogoutModal}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default DashboardLayout;