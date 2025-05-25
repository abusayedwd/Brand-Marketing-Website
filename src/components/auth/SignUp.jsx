



// import { useState } from "react";
// import {
//   LockOutlined,
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   EnvironmentOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import {
//   Button,
//   Checkbox,
//   DatePicker,
//   Form,
//   Input,
//   Radio,
//   Select,
//   Upload,
//   message,
// } from "antd";
// import moment from "moment";
// import Link from "next/link";

// const { Option } = Select;

// export default function SignUpPage() {
//   const [role, setRole] = useState("influencer");

//   const onRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   const onFinish = (values) => {
//     // Include role manually
//     values.role = role;
//     const dobString = values.dob.format("YYYY-MM-DD");
//     console.log("Date of Birth string:", dobString);

//     console.log("Selected Role:", role);
//     console.log("Form values:", values);
//     message.success(`Account created successfully as ${role}!`);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side: Signup form */}
//       <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
//         <div className="max-w-[700px] w-full">
//           <div className="flex items-center gap-2">
//           <img
//               src="https://cdn-icons-png.flaticon.com/512/906/906175.png" // Replace with your logo URL
//               alt="Logo"
//               className="w-10 h-10"
//             />
//               <Link href="/"> 
//             <img
//               src="/images/logo.png" // Replace with your logo URL
//               alt="Logo"
//               className=""
//             />
//             </Link>
//           </div>

//           <h2 className="text-2xl font-semibold mb-1">Create an Account</h2>
//           <p className="text-xs text-gray-400 mb-6">
//             Hello there, Collaborate, Grow, and Earn as an Influencer!
//           </p>

//           <Radio.Group
//             onChange={onRoleChange}
//             value={role}
//             className="mb-6"
//             name="roleRadioGroup"
//           >
//             <Radio value="influencer">Influencer</Radio>
//             <Radio value="brandOwner" className="ml-6">
//               Brand Owner
//             </Radio>
//           </Radio.Group>

//           <Form
//             name="signup_form"
//             layout="vertical"
//             onFinish={onFinish}
//             size="large"
//             key={role} // reset form fields on role change
//           >
//             {/* Influencer Fields */}
//             {role === "influencer" && (
//               <>
//               <div className="md:flex gap-4">

//                 <Form.Item
//                   label="Full Name"
//                   className=" w-full"
//                   name="fullName"
//                   rules={[{ required: true, message: "Please enter full name!" }]}
//                 >
//                   <Input
//                     placeholder="Enter full name"
//                     prefix={<UserOutlined />}
//                     className="rounded-md"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label="User Name"
//                   className=" w-full"
//                   name="userName"
//                   rules={[{ required: true, message: "Please enter user name!" }]}
//                 >
//                   <Input
//                     placeholder="Enter user name"
//                     prefix={<UserOutlined />}
//                     className="rounded-md"
//                   />
//                 </Form.Item>
//               </div>

//               <div className="md:flex gap-4">


//                 <Form.Item
//                   label="Email"
//                   className=" w-full"
//                   name="email"
//                   rules={[
//                     { required: true, message: "Please enter your email!" },
//                     { type: "email", message: "Please enter a valid email!" },
//                   ]}
//                 >
//                   <Input placeholder="Enter Email" prefix={<MailOutlined />} className="rounded-md" />
//                 </Form.Item>

//                 <Form.Item
//                   label="Phone Number"
//                   className=" w-full"
//                   name="phoneNumber"
//                   rules={[{ required: true, message: "Please enter phone number!" }]}
//                 >
//                   <Input placeholder="Enter Phone number" prefix={<PhoneOutlined />} className="rounded-md" />
//                 </Form.Item>
//               </div>

//               <div className="md:flex gap-4">

//                 <Form.Item
//                   label="Date of Birth"
//                   className=" w-full"
//                   name="dob"
//                   rules={[{ required: true, message: "Please enter date of birth!" }]}
//                 >
//                   <DatePicker
//                     className="w-full rounded-md"
//                     placeholder="Enter DoB"
//                     disabledDate={(current) => current && current > moment().endOf("day")}
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   label="Social Media"
//                   className=" w-full"
//                   name="socialMedia"
//                   rules={[{ required: true, message: "Please select social media!" }]}
//                 >
//                   <Select placeholder="Add Social Media Group" className="rounded-md">
//                     <Option value="instagram">Instagram</Option>
//                     <Option value="facebook">Facebook</Option>
//                     <Option value="tiktok">TikTok</Option>
//                     <Option value="youtube">YouTube</Option>
//                     <Option value="twitter">Twitter</Option>
//                   </Select>
//                 </Form.Item>
//               </div>



//                 {/* <Form.Item
//                   label="Address"
//                   name="address"
//                   rules={[{ required: true, message: "Please enter address!" }]}
//                 >
//                   <Input
//                     placeholder="Enter Location"
//                     prefix={<EnvironmentOutlined />}
//                     className="rounded-md"
//                   />
//                 </Form.Item> */}
//               </>
//             )}


//             {/* Brand Owner Fields */}
//             {role === "brandOwner" && (
//               <>
//                <div className="md:flex gap-4">

// <Form.Item
//   label="Full Name"
//   className=" w-full"
//   name="fullName"
//   rules={[{ required: true, message: "Please enter full name!" }]}
// >
//   <Input
//     placeholder="Enter full name"
//     prefix={<UserOutlined />}
//     className="rounded-md"
//   />
// </Form.Item>

// <Form.Item
//   label="User Name"
//   className=" w-full"
//   name="userName"
//   rules={[{ required: true, message: "Please enter user name!" }]}
// >
//   <Input
//     placeholder="Enter user name"
//     prefix={<UserOutlined />}
//     className="rounded-md"
//   />
// </Form.Item>
// </div>

// <div className="md:flex gap-4">


// <Form.Item
//   label="Email"
//   className=" w-full"
//   name="email"
//   rules={[
//     { required: true, message: "Please enter your email!" },
//     { type: "email", message: "Please enter a valid email!" },
//   ]}
// >
//   <Input placeholder="Enter Email" prefix={<MailOutlined />} className="rounded-md" />
// </Form.Item>

// <Form.Item
//   label="Phone Number"
//   className=" w-full"
//   name="phoneNumber"
//   rules={[{ required: true, message: "Please enter phone number!" }]}
// >
//   <Input placeholder="Enter Phone number" prefix={<PhoneOutlined />} className="rounded-md" />
// </Form.Item>
// </div>
 
 
//               </>
//             )}

//             {/* Common Passwords and Terms */}
//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 { required: true, message: "Please enter password!" },
//                 { min: 6, message: "Password must be at least 6 characters." },
//               ]}
//               hasFeedback
//             >
//               <Input.Password
//                 placeholder="Enter password"
//                 prefix={<LockOutlined />}
//                 className="rounded-md"
//               />
//             </Form.Item>

//             <Form.Item
//               label="Confirm Password"
//               name="confirmPassword"
//               dependencies={["password"]}
//               hasFeedback
//               rules={[
//                 { required: true, message: "Please confirm your password!" },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(new Error("Passwords do not match!"));
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Enter password"
//                 prefix={<LockOutlined />}
//                 className="rounded-md"
//               />
//             </Form.Item>

//             <Form.Item
//               name="acceptTerms"
//               valuePropName="checked"
//               rules={[
//                 {
//                   validator: (_, value) =>
//                     value ? Promise.resolve() : Promise.reject(new Error("You must accept the terms")),
//                 },
//               ]}
//             >
//               <Checkbox>
//                 I accept the{" "}
//                 <a href="#" className="text-blue-600 hover:underline">
//                   Terms of Service and Privacy Policy
//                 </a>
//               </Checkbox>
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" className="w-full bg-black hover:bg-black">
//                 Sign Up
//               </Button>
//             </Form.Item>
//           </Form>

//           <p className="text-xs text-center text-gray-500">
//             Already have an account?{" "}
//             <a href="/auth/login" className="font-semibold text-black hover:underline">
//               Login
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Right side: Image */}
//       <div className="hidden md:flex flex-1">
//         <img
//           src="/images/login.png"
//           alt="Signup Banner"
//           className="object-cover w-full h-screen"
//         />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  message,
} from "antd";
import moment from "moment";
import { useSignUpMutation } from "@/redux/fetures/auth/signUp";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function SignUpPage() {
  const router = useRouter()
  const [role, setRole] = useState("influencer");
  const [signUpUser] = useSignUpMutation()
  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.pathname);
    }
  }, []);

  const onFinish = async(values) => {
    // Prepare final data object with same keys you want
    const finalData = {
      fullName: values.fullName,
      userName: values.userName,
      email: values.email,
      password: values.password,
      role: role,
      dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      socialMedia: values.socialMedia || null,
    };

    try{
      const res = await signUpUser(finalData).unwrap();
       console.log(res)
       if(res.code == 201){
        toast.success(res.message)
       }
       setTimeout(() => {
        router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`)
       }, 1000);
     }catch(error){
      toast.error(error.data.message)
      console.log(error.data)
     }

 
    
  };

  return (
    <div className="min-h-screen flex">
      <Toaster />
      {/* Left side: Signup form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
        <div className="max-w-[700px] w-full">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
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
            {/* Your Next.js Link if you want here */}
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
            key={role} // reset form on role change
          >
            {/* Influencer Fields */}
            {role === "influencer" && (
              <>
                <div className="md:flex gap-4">
                  <Form.Item
                    label="Full Name"
                    className="w-full"
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
                    className="w-full"
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
                    className="w-full"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      placeholder="Enter Email"
                      prefix={<MailOutlined />}
                      className="rounded-md"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    className="w-full"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please enter phone number!" }]}
                  >
                    <Input
                      placeholder="Enter Phone number"
                      prefix={<PhoneOutlined />}
                      className="rounded-md"
                    />
                  </Form.Item>
                </div>

                <div className="md:flex gap-4">
                  <Form.Item
                    label="Date of Birth"
                    className="w-full"
                    name="dob"
                    rules={[{ required: true, message: "Please enter date of birth!" }]}
                  >
                    <DatePicker
                      className="w-full rounded-md"
                      placeholder="Enter DoB"
                      disabledDate={(current) =>
                        current && current > moment().endOf("day")
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    label="Social Media"
                    className="w-full"
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
              </>
            )}

            {/* Brand Owner Fields */}
            {role === "brandOwner" && (
              <>
                <div className="md:flex gap-4">
                  <Form.Item
                    label="Full Name"
                    className="w-full"
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
                    className="w-full"
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
                    className="w-full"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input
                      placeholder="Enter Email"
                      prefix={<MailOutlined />}
                      className="rounded-md"
                    />
                  </Form.Item>
                </div>
              </>
            )}

            {/* Common Password and Terms */}
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
                placeholder="Confirm password"
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
