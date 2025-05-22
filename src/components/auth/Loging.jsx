// "use client"
// import React, { useState } from 'react';
// import { Form, Input, Button, Checkbox } from 'antd';
// import Link from 'next/link';
// import { useLoginMutation } from '@/redux/fetures/auth/login';
// import { useRouter } from 'next/navigation';
// import toast, { Toaster } from 'react-hot-toast';

// const LoginPage = () => {
// const router = useRouter()
// const [error, setError] = useState(' ')
// const [logingData, {isLoading}] = useLoginMutation()

// const onFinish = async (values) => {
//   const { remember, ...formValues } = values;
//   console.log("Received values of form: ", formValues);
  
//   try {
//       const res = await logingData(formValues).unwrap();
//       console.log(res);

//       if (res?.code === 200) {
//           toast.success(res?.message);
//           localStorage.setItem("token", res?.data?.attributes?.tokens?.access?.token);
//           localStorage.setItem("user", JSON.stringify(res?.data));

//           // Force reload and redirect to root
//           setTimeout(() => {
//               window.location.href = "/";
//           }, 500);
//       }
//   } catch (error) {
//       setError(error?.data?.message || "An unexpected error occurred. Please try again.");
//   }
// };


//   return (
//     <div className="flex justify-center items-center lg:min-h-[700px] bg-gray-100">
//       <Toaster />
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full md:max-w-[500px]">
//         <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>
//         <Form
//           name="login_form"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//         >
//           <Form.Item
//             name="email"
//             rules={[{ required: true, message: 'Please input your email!' }]}
//           >
//             <Input placeholder="Email" className="w-full p-2 border rounded" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password
//               placeholder="Password"
//               className="w-full p-2 border rounded"
//             />
//           </Form.Item>
//           <div className='flex justify-between items-center'>
//           <Form.Item name="remember" valuePropName="checked">
//             <Checkbox className="">Remember me</Checkbox>
//           </Form.Item>
//           <Link href="/auth/forgotPassword" className="text-blue-500 hover:underline">
//               Forgot password?
//             </Link>

//           </div>
//           <p className=' text-red-500'>{error}</p>
//           <Form.Item>
//             <Button
           
//               htmlType="submit"
//               className="w-full !bg-[#2E7D32] text-white p-3 rounded "
//             >
//               LOG IN
//             </Button>
//           </Form.Item>

//           <div className=" text-center">
            
//             <h1 className=''>
//             Don’t have an Account?  
//               <Link href="/auth/singup">

//                <span className="text-blue-500 hover:underline"> Create Account</span> 
//               </Link>
//             </h1>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
"use client"
import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import Link from "next/link";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Login form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-2 mb-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png" // Replace with your logo URL
              alt="Logo"
              className="w-20 h-20"
            />
            <Link href="/"> 
            <img
              src="/images/logo.png" // Replace with your logo URL
              alt="Logo"
              className=""
            />
            </Link>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Login</h2>
          <p className="text-xs text-gray-400 mb-6">
            Please Enter Your Details Below to Continue
          </p>

          <Form
            name="login_form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              label="Your email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter Email"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                className="rounded-md"
              />
            </Form.Item>

             <div className="flex justify-between items-center mb-5">

              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="/auth/forgotPassword" className="  text-gray-500 hover:text-blue-600">
                Forgot password?
              </Link>
             </div>
          

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black hover:bg-black"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className=" text-center">
            
             <h1 className=''>
            Don’t have an Account?  
              <Link href="/auth/singup">
                <span className="text-blue-500 hover:underline"> Create Account</span> </Link>
            </h1>
           </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png"
          alt="Login Banner"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
};

export default LoginPage;
