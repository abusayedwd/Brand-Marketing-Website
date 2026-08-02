// 'use client';

// import React, { useState } from 'react';
// import { Button, Avatar, Dropdown, Modal } from 'antd';
// import { 
//   UserOutlined, 
//   BellOutlined, 
//   MenuUnfoldOutlined, 
//   MenuFoldOutlined,
//   SettingOutlined,
//   LogoutOutlined,
//   BarsOutlined 
// } from '@ant-design/icons';
// import { Header } from 'antd/es/layout/layout';

// export default function DashboardHeader({ collapsed, setCollapsed }) {
//   // State for modals and mobile menu
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Modal handlers
//   const openPasswordModal = () => setIsPasswordModalOpen(true);
//   const closePasswordModal = () => setIsPasswordModalOpen(false);
  
//   const openLogoutModal = () => setIsLogoutModalOpen(true);
//   const closeLogoutModal = () => setIsLogoutModalOpen(false);
  
//   // Sidebar toggle handler
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   // Mobile menu toggle
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   // Logout handler
//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log('Logging out...');
//     // Example: Clear localStorage, cookies, etc.
//     // localStorage.removeItem('token');
//     window.location.href = '/login';
//   };

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
//       label: 'Change Password',
//       icon: <SettingOutlined />,
//       onClick: openPasswordModal,
//     },
//     {
//       key: '3',
//       label: 'Logout',
//       icon: <LogoutOutlined />,
//       onClick: openLogoutModal,
//     },
//   ];

//   return (
//     <>
//       <Header
//         className="bg-white p-0 shadow-md flex items-center justify-between sticky top-0 z-50"
//         style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 100,
//           width: '100%',
//           padding: '0 16px',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
//         }}
//       >
//         <div className="flex items-center">
//           {/* Mobile menu trigger */}
//           <Button
//             type="text"
//             icon={<BarsOutlined />}
//             onClick={toggleMobileMenu}
//             className="md:hidden ml-4"
//           />
         
//           {/* Desktop sidebar toggle */}
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={toggleCollapsed}
//             className="hidden md:block ml-4"
//           />
         
//           <h1 className="text-lg font-bold ml-4">Dashboard</h1>
//         </div>
       
//         {/* User profile */}
//         <div className="mr-6">
//           <Dropdown
//             menu={{ items: userMenuItems }}
//             placement="bottomRight"
//             trigger={["click"]}
//           >
//             <div className="flex items-center cursor-pointer">
//               <Avatar icon={<UserOutlined />} />
//               <span className="ml-2 hidden sm:inline">John Doe</span>
//             </div>
//           </Dropdown>
//         </div>
//       </Header>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         title="Confirm Logout"
//         open={isLogoutModalOpen}
//         onCancel={closeLogoutModal}
//         footer={[
//           <Button key="cancel" onClick={closeLogoutModal}>
//             Cancel
//           </Button>,
//           <Button key="logout" type="primary" danger onClick={handleLogout}>
//             Logout
//           </Button>
//         ]}
//       >
//         <p>Are you sure you want to logout?</p>
//       </Modal>

//       {/* Password Change Modal (placeholder) */}
//       <Modal
//         title="Change Password"
//         open={isPasswordModalOpen}
//         onCancel={closePasswordModal}
//         footer={[
//           <Button key="cancel" onClick={closePasswordModal}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary">
//             Change Password
//           </Button>
//         ]}
//       >
//         <p>Password change form would go here.</p>
//       </Modal>
//     </>
//   );
// }

  
"use client";
import React, { useState } from 'react';
import { Button, Avatar, Dropdown, Modal, Form, Input } from 'antd';
import { 
  UserOutlined, 
  BellOutlined, 
  MenuUnfoldOutlined, 
  MenuFoldOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarsOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
 
import { useChangPasswordMutation } from '@/redux/fetures/auth/changePassword';
import toast, { Toaster } from 'react-hot-toast';
import url from '@/redux/api/baseUrl';
import NotificationBell from './NotificationBell';

export default function DashboardHeader({ collapsed}) {
  // State for modals and mobile menu
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {data: user} = useLogedUserQuery();
  // console.log(user?.data?.attributes)
  const [changePasswordd] = useChangPasswordMutation()
  // Modal handlers
  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);
  
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);
  
 

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Logout handler
  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: Clear localStorage, cookies, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  // Password change handler
 const changePassword = async (values) => {
    const { confirmPassword, ...ChangePassword } = values;
    console.log("Form Values: ", ChangePassword);
    try{
      const res = await changePasswordd(ChangePassword).unwrap();
      console.log(res);
      if(res?.code == 200){
        toast.success(res?.message)
        closePasswordModal(true)
        router.push('/')
      }
    } catch(error) {
      console.log(error)
      setError(error?.data?.message)
    }
  };



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
    <div className=''>
      <Toaster />
      <Header
        className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-emerald-100 bg-white/90 px-4 shadow-sm backdrop-blur"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          padding: '0 16px',
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
         
        
         <div>
          <h1 className="ml-2 text-lg font-bold text-slate-900">
            Dashboard
            <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {user?.data?.attributes?.role || "member"}
            </span>
            </h1>
       

         </div>
          
        </div>
       
        {/* User profile */}
        <div className="mr-2 flex items-center">
  <NotificationBell />
  <Dropdown
    menu={{ items: userMenuItems }}
    placement="bottomRight"
    trigger={["click"]}
  >
    <div className="flex items-center cursor-pointer rounded-full border border-slate-200 px-2 py-1 hover:border-emerald-300">
      <Avatar src={url + user?.data?.attributes?.image?.url} className='h-12 w-12' />
      <span className="ml-2 hidden sm:inline">{user?.data?.attributes?.fullName}</span>
    </div>
  </Dropdown>
</div>

      </Header>

      {/* Password Change Modal */}
      <Modal
        open={isPasswordModalOpen}
        onOk={closePasswordModal}
        onCancel={closePasswordModal}
        footer={null}
      >
        <div className="flex flex-col w-[80%] mx-auto">
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
        title="Confirm Logout"
        open={isLogoutModalOpen}
        onCancel={closeLogoutModal}
        footer={[
          <Button key="cancel" onClick={closeLogoutModal}>
            Cancel
          </Button>,
          <Button key="logout" type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        ]}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}