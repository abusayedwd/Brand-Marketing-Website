// "use client"

// import { Card, Row, Col, Statistic } from 'antd';
// import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// import CardComponent from '@/components/Dashbord/overview/Card';
 
// import Barchart from '@/components/Dashbord/overview/Barchart';
// import CardForbarand from '@/components/Dashbord/overview/CardForbarand';
// import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
// import BarchartforBrand from '@/components/Dashbord/overview/BarchartforBrand';

// export default function Dashboard() {

// const {data: loggedUser} = useLogedUserQuery()
// const userRole = loggedUser?.data?.attributes?.role;
// console.log(userRole)
// userRole === "brand"
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
       
//         <CardComponent />
//         <CardForbarand/>
//         <Barchart /> 
//         <BarchartforBrand />
      
//     </div>
//   );
// }



"use client"

import { Card } from 'antd';
import CardComponent from '@/components/Dashbord/overview/Card';
import Barchart from '@/components/Dashbord/overview/Barchart';
import CardForbarand from '@/components/Dashbord/overview/CardForbarand';
import { useLogedUserQuery } from '@/redux/fetures/user/logedUser';
import BarchartforBrand from '@/components/Dashbord/overview/BarchartforBrand';

export default function Dashboard() {

  const { data: loggedUser } = useLogedUserQuery();
  const userRole = loggedUser?.data?.attributes?.role;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Common Card for all users */}
      

      {/* Conditionally render components based on the user role */}
      {userRole === "brand" ? (
        <>
          <CardForbarand />
          <BarchartforBrand />
        </>
      ) : (
        <>
        <CardComponent />
          <Barchart />
        </>
      )}
    </div>
  );
}
