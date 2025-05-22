// "use client"
// import React, { useEffect, useState } from 'react';
// import { Form, Input, Button, Radio, Checkbox } from 'antd';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useSignUpMutation } from '@/redux/fetures/auth/signUp';
// import toast from 'react-hot-toast';
 
 

// const SignUp = () => {

//   const router = useRouter()

//   const [pathName, setPathName] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setPathName(window.location.pathname);
//     }
//   }, []);

//   // console.log(pathName)
//   // const {data: users} = useGetUsersQuery()
//   // console.log(users)

//   const [register, {isLoading}] =  useSignUpMutation()


//   const onFinish = async (values) => {
//     // Destructure to exclude confirmPassword
//     const { confirmPassword, agreement, ...formValues } = values;
//     console.log('Received values of form: ', formValues);

//    try{
//     const res = await register(formValues).unwrap();
//      console.log(res)
//      if(res.code == 201){
//       toast.success(res.message)
//      }
//      setTimeout(() => {
//       router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`)
//      }, 1000);
//    }catch(error){
//     toast.error(error.data.message)
//     console.log(error.data)
//    }


    
//   };

//   return (
//     <div className="flex justify-center items-center lg:min-h-[700px] bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-[550Px]">
//         <h1 className="text-2xl font-bold mb-6 text-center">Create Your Account</h1>
//         <Form
//           name="signup_form"
//           initialValues={{ role: 'user' }}
//           onFinish={onFinish}
//         >
//           {/* Name and Email */}
//           <div className="flex space-x-4">
//             <Form.Item
//               name="fullName"
//               rules={[{ required: true, message: 'Please input your name!' }]}
//               className="flex-1"
//             >
//               <Input placeholder="fullName" className="w-full p-2 border rounded" />
//             </Form.Item>
//             <Form.Item
//               name="company"
             
//               className="flex-1"
//             >
//               <Input placeholder="Company Name (Optional)" className="w-full p-2 border rounded" />
//             </Form.Item>
//           </div>

//           {/* Street and Steel Name */}
//           <div className="flex space-x-4">
//           <Form.Item
//               name="email"
//               rules={[{ required: true, message: 'Please input your email!' }]}
//               className="flex-1"
//             >
//               <Input placeholder="Email" className="w-full p-2 border rounded" />
//             </Form.Item>
           
             
//           </div>

          
//           {/* Password */}
//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password
//               placeholder="Password"
//               className="w-full p-2 border rounded"
//             />
//           </Form.Item>

//           {/* Confirm Password (not logged to console) */}
//           <Form.Item
//             name="confirmPassword"
//             dependencies={['password']}
//             rules={[
//               { required: true, message: 'Please confirm your password!' },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(new Error('The two passwords do not match!'));
//                 },
//               }),
//             ]}
//           >
//             <Input.Password
//               placeholder="Confirm Password"
//               className="w-full p-2 border rounded"
//             />
//           </Form.Item>

//           {/* Role Selection */}
//           <Form.Item
//             name="role"
//             rules={[{ required: true, message: 'Please select your role!' }]}
//           >
//             <Radio.Group>
//               <Radio value="user">User</Radio>
//               <Radio value="landlord">Landlord</Radio>
//             </Radio.Group>
//           </Form.Item>

//           {/* Agreement Checkbox */}
//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[
//               { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
//             ]}
//           >
//             <Checkbox>
//             Have read & agreed to Peared's Terms of Use and Privacy Policy.
//             </Checkbox>
//           </Form.Item>

//           {/* Submit Button */}
//           <Form.Item>
//             <Button
           
//               htmlType="submit"
//             className="w-full !bg-[#2E7D32] text-white p-3 rounded "
//             >
//               Create Account
//             </Button>
//           </Form.Item>

//           {/* Already have an account? Log in */}
//           <div className="text-center">
//             <h1>
//             Already have an account?  
//             <Link href="/auth/login" className="text-blue-500 hover:underline">
//              Log in
//             </Link>
//             </h1>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import moment from "moment";
import Link from "next/link";

const { Option } = Select;

export default function SignUpPage() {
  const [role, setRole] = useState("influencer");

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const onFinish = (values) => {
    // Include role manually
    values.role = role;
 

    console.log("Selected Role:", role);
    console.log("Form values:", values);
    message.success(`Account created successfully as ${role}!`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side: Signup form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
        <div className="max-w-[700px] w-full">
          <div className="flex items-center gap-2">
          <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png" // Replace with your logo URL
              alt="Logo"
              className="w-10 h-10"
            />
              <Link href="/"> 
            <img
              src="/images/logo.png" // Replace with your logo URL
              alt="Logo"
              className=""
            />
            </Link>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Create an Account</h2>
          <p className="text-xs text-gray-400 mb-6">
            Hello there, Collaborate, Grow, and Earn as an Influencer!
          </p>

          <Radio.Group
            onChange={onRoleChange}
            value={role}
            className="mb-6"
            name="roleRadioGroup"
          >
            <Radio value="influencer">Influencer</Radio>
            <Radio value="brandOwner" className="ml-6">
              Brand Owner
            </Radio>
          </Radio.Group>

          <Form
            name="signup_form"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            key={role} // reset form fields on role change
          >
            {/* Influencer Fields */}
            {role === "influencer" && (
              <>
              <div className="md:flex gap-4">

                <Form.Item
                  label="Full Name"
                  className=" w-full"
                  name="fullName"
                  rules={[{ required: true, message: "Please enter full name!" }]}
                >
                  <Input
                    placeholder="Enter full name"
                    prefix={<UserOutlined />}
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  label="User Name"
                  className=" w-full"
                  name="userName"
                  rules={[{ required: true, message: "Please enter user name!" }]}
                >
                  <Input
                    placeholder="Enter user name"
                    prefix={<UserOutlined />}
                    className="rounded-md"
                  />
                </Form.Item>
              </div>

              <div className="md:flex gap-4">


                <Form.Item
                  label="Email"
                  className=" w-full"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter Email" prefix={<MailOutlined />} className="rounded-md" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  className=" w-full"
                  name="phoneNumber"
                  rules={[{ required: true, message: "Please enter phone number!" }]}
                >
                  <Input placeholder="Enter Phone number" prefix={<PhoneOutlined />} className="rounded-md" />
                </Form.Item>
              </div>

              <div className="md:flex gap-4">

                <Form.Item
                  label="Date of Birth"
                  className=" w-full"
                  name="dob"
                  rules={[{ required: true, message: "Please enter date of birth!" }]}
                >
                  <DatePicker
                    className="w-full rounded-md"
                    placeholder="Enter DoB"
                    disabledDate={(current) => current && current > moment().endOf("day")}
                  />
                </Form.Item>

                <Form.Item
                  label="Social Media"
                  className=" w-full"
                  name="socialMedia"
                  rules={[{ required: true, message: "Please select social media!" }]}
                >
                  <Select placeholder="Add Social Media Group" className="rounded-md">
                    <Option value="instagram">Instagram</Option>
                    <Option value="facebook">Facebook</Option>
                    <Option value="tiktok">TikTok</Option>
                    <Option value="youtube">YouTube</Option>
                    <Option value="twitter">Twitter</Option>
                  </Select>
                </Form.Item>
              </div>



                {/* <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: "Please enter address!" }]}
                >
                  <Input
                    placeholder="Enter Location"
                    prefix={<EnvironmentOutlined />}
                    className="rounded-md"
                  />
                </Form.Item> */}
              </>
            )}


            {/* Brand Owner Fields */}
            {role === "brandOwner" && (
              <>
               <div className="md:flex gap-4">

<Form.Item
  label="Full Name"
  className=" w-full"
  name="fullName"
  rules={[{ required: true, message: "Please enter full name!" }]}
>
  <Input
    placeholder="Enter full name"
    prefix={<UserOutlined />}
    className="rounded-md"
  />
</Form.Item>

<Form.Item
  label="User Name"
  className=" w-full"
  name="userName"
  rules={[{ required: true, message: "Please enter user name!" }]}
>
  <Input
    placeholder="Enter user name"
    prefix={<UserOutlined />}
    className="rounded-md"
  />
</Form.Item>
</div>

<div className="md:flex gap-4">


<Form.Item
  label="Email"
  className=" w-full"
  name="email"
  rules={[
    { required: true, message: "Please enter your email!" },
    { type: "email", message: "Please enter a valid email!" },
  ]}
>
  <Input placeholder="Enter Email" prefix={<MailOutlined />} className="rounded-md" />
</Form.Item>

<Form.Item
  label="Phone Number"
  className=" w-full"
  name="phoneNumber"
  rules={[{ required: true, message: "Please enter phone number!" }]}
>
  <Input placeholder="Enter Phone number" prefix={<PhoneOutlined />} className="rounded-md" />
</Form.Item>
</div>
 
 
              </>
            )}

            {/* Common Passwords and Terms */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter password!" },
                { min: 6, message: "Password must be at least 6 characters." },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter password"
                prefix={<LockOutlined />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                prefix={<LockOutlined />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              name="acceptTerms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms")),
                },
              ]}
            >
              <Checkbox>
                I accept the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service and Privacy Policy
                </a>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full bg-black hover:bg-black">
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <a href="/auth/login" className="font-semibold text-black hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png"
          alt="Signup Banner"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
}
