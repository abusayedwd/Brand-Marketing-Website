 


// "use client";
// import { useState, useEffect } from 'react';
// import { Menu } from 'antd';
// import { 
//   HomeOutlined, 
//   UserOutlined, 
//   AppstoreAddOutlined, 
//   WalletOutlined, 
//   FileSearchOutlined, 
//   MenuFoldOutlined, 
//   MenuUnfoldOutlined 
// } from '@ant-design/icons';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const pathname = usePathname();

//   const {data: user} = useLogedUserQuery();
//   const userRole = user?.data?.attributes?.role;

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth < 768) {
//         setCollapsed(true);
//       } else {
//         setCollapsed(false);
//       }
//     };

//     // Initial check
//     handleResize();

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   // Filter menu items based on the user role
//   const menuItems = [
//     {
//       key: "/dashboard",
//       icon: <HomeOutlined />,
//       label: "Dashboard",
//       path: "/dashboard",
//     },
//     // Conditionally hide "Content Creator" menu item for certain roles
//     ...(userRole !== "influencer" && userRole !== "content creator" ? [{
//       key: "/dashboard/influencerlist",
//       icon: <UserOutlined />,
//       label: "Content Creator",
//       path: "/dashboard/influencerlist",
//     }] : []),
//     {
//       key: "/dashboard/campaigns",
//       icon: <AppstoreAddOutlined />,
//       label: "Campaigns",
//       path: "/dashboard/campaigns",
//     },
//     // Conditionally hide the "Payment" menu item for certain roles
//     ...(userRole !== "influencer" && userRole !== "content creator" ? [{
//       key: "/dashboard/payment",
//       icon: <WalletOutlined />,
//       label: "Payment",
//       path: "/dashboard/payment",
//     }] : []),
//     // Conditionally hide the "Withdraw" and "Transactions" for the "brand" role
//     ...(userRole !== "brand" ? [
//       {
//         key: "/dashboard/withdraw",
//         icon: <FileSearchOutlined />,
//         label: "Withdraw Request",
//         path: "/dashboard/withdraw",
//       },
//       {
//         key: "/dashboard/transaction",
//         icon: <FileSearchOutlined />,
//         label: "Transactions",
//         path: "/dashboard/transaction",
//       }
//     ] : []),
//   ];

//   const logo = "/images/logo.png"; // Path to your logo image

//   return (
//     <div className={`${collapsed ? 'w-20' : 'w-52'} transition-all duration-300 h-full shadow-md`}>
//       <div className="flex justify-between items-center p-4">
//         <div className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
//           <Link href="/" className="flex items-center">
//             <img src={logo} alt="App Logo" className="w-24" /> {/* App logo */}
//           </Link>
//         </div>
//         <button 
//           onClick={toggleCollapsed} 
//           className="p-2 rounded-md hover:bg-gray-100"
//         >
//           {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//         </button>
//       </div>
//       <Menu 
//         mode={collapsed ? "vertical" : "inline"}  // Switch mode based on collapsed state
//         selectedKeys={[pathname]}
//         inlineCollapsed={collapsed}
//       >
//         {menuItems.map((item) => (
//           <Menu.Item key={item.key} icon={item.icon}>
//             <Link href={item.path}>{item.label}</Link>
//           </Menu.Item>
//         ))}
//       </Menu>
//     </div>
//   );
// }



'use client'

import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  AppstoreAddOutlined, 
  WalletOutlined, 
  FileSearchOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const { data: user, isLoading, error } = useLogedUserQuery();
  const userRole = user?.data?.attributes?.role;

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  

  // Filter menu items based on the user role
  const menuItems = [
    {
      key: "/dashboard",
      icon: <HomeOutlined />,
      label: "Dashboard",
      path: "/dashboard",
    },
    ...(userRole !== "influencer" && userRole !== "content creator" ? [{
      key: "/dashboard/influencerlist",
      icon: <UserOutlined />,
      label: "Content Creator",
      path: "/dashboard/influencerlist",
    }] : []),
    {
      key: "/dashboard/campaigns",
      icon: <AppstoreAddOutlined />,
      label: "Campaigns",
      path: "/dashboard/campaigns",
    },
    ...(userRole !== "influencer" && userRole !== "content creator" ? [{
      key: "/dashboard/payment",
      icon: <WalletOutlined />,
      label: "Payment",
      path: "/dashboard/payment",
    }] : []),
    ...(userRole !== "brand" ? [
      {
        key: "/dashboard/my-wallet",
        icon: <FileSearchOutlined />,
        label: "My Wallet",
        path: "/dashboard/my-wallet",
      },
      {
        key: "/dashboard/transaction",
        icon: <FileSearchOutlined />,
        label: "Transactions",
        path: "/dashboard/transaction",
      }
    ] : []),
  ];

  const logo = "/images/logo.png";  

  return (
    <div className={`${collapsed ? 'w-20' : 'w-52'} transition-all duration-300 h-full shadow-md`}>
      <div className="flex justify-between items-center p-4">
        <div className={`text-xl font-bold ${collapsed ? 'hidden' : 'block'}`}>
          <Link href="/" className="flex items-center">
            <img src={logo} alt="App Logo" className="w-24" /> {/* App logo */}
          </Link>
        </div>
        <button 
          onClick={toggleCollapsed} 
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      <Menu 
        mode={collapsed ? "vertical" : "inline"}  // Switch mode based on collapsed state
        selectedKeys={[pathname]}
        inlineCollapsed={collapsed}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
