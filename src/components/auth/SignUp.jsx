


// import { useEffect, useState } from "react";
// import {
//   LockOutlined,
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
// } from "@ant-design/icons";
// import {
//   Button,
//   Checkbox,
//   DatePicker,
//   Form,
//   Input,
//   Radio,
//   Select,
//   message,
// } from "antd";
// import moment from "moment";
// import { useSignUpMutation } from "@/redux/fetures/auth/signUp";
// import toast, { Toaster } from "react-hot-toast";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const { Option } = Select;

// export default function SignUpPage() {
//   const router = useRouter()
//   const [role, setRole] = useState("influencer");
//   const [signUpUser] = useSignUpMutation()
//   const onRoleChange = (e) => {
//     setRole(e.target.value);
//   };

//   const [pathName, setPathName] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setPathName(window.location.pathname);
//     }
//   }, []);

//   const onFinish = async(values) => {
//     // Prepare final data object with same keys you want

//   const finalData = {
//   fullName: values.fullName,
//   userName: values.userName,
//   email: values.email,
//   password: values.password,
//   role: role,
//   // Only add these if role is influencer
//   ...(role === 'influencer' && {
//     dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : "",
//     socialMedia: values.socialMedia || "",
//   }),
// };

//       console.log(finalData)
//     try{
//       const res = await signUpUser(finalData).unwrap();
//        console.log(res)
//        if(res.code == 201){
//         toast.success(res.message)
//        }
//        setTimeout(() => {
//         router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`)
//        }, 1000);
//      }catch(error){
//       toast.error(error.data.message)
//       console.log(error.data)
//      }

 
    
//   };

//   return (
//     <div className="min-h-screen flex">
//       <Toaster />
//       {/* Left side: Signup form */}
//       <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
//         <div className="max-w-[700px] w-full">
//           <div className="flex items-center gap-2">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
//               alt="Logo"
//               className="w-10 h-10"
//             />
//              <Link href="/"> 
//             <img
//               src="/images/logo.png" // Replace with your logo URL
//               alt="Logo"
//               className=""
//             />
//             </Link>
//             {/* Your Next.js Link if you want here */}
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
//             <Radio value="brand" className="ml-6">
//               Brand Owner
//             </Radio>
//           </Radio.Group>

//           <Form
//             name="signup_form"
//             layout="vertical"
//             onFinish={onFinish}
//             size="large"
//             key={role} // reset form on role change
//           >
//             {/* Influencer Fields */}
//             {role === "influencer" && (
//               <>
//                 <div className="md:flex gap-4">
//                   <Form.Item
//                     label="Full Name"
//                     className="w-full"
//                     name="fullName"
//                     rules={[{ required: true, message: "Please enter full name!" }]}
//                   >
//                     <Input
//                       placeholder="Enter full name"
//                       prefix={<UserOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label="User Name"
//                     className="w-full"
//                     name="userName"
//                     rules={[{ required: true, message: "Please enter user name!" }]}
//                   >
//                     <Input
//                       placeholder="Enter user name"
//                       prefix={<UserOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>
//                 </div>

//                 <div className="md:flex gap-4">
//                   <Form.Item
//                     label="Email"
//                     className="w-full"
//                     name="email"
//                     rules={[
//                       { required: true, message: "Please enter your email!" },
//                       { type: "email", message: "Please enter a valid email!" },
//                     ]}
//                   >
//                     <Input
//                       placeholder="Enter Email"
//                       prefix={<MailOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label="Phone Number"
//                     className="w-full"
//                     name="phoneNumber"
//                     rules={[{ required: true, message: "Please enter phone number!" }]}
//                   >
//                     <Input
//                       placeholder="Enter Phone number"
//                       prefix={<PhoneOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>
//                 </div>

//                 <div className="md:flex gap-4">
//                   <Form.Item
//                     label="Date of Birth"
//                     className="w-full"
//                     name="dob"
//                     rules={[{ required: true, message: "Please enter date of birth!" }]}
//                   >
//                     <DatePicker
//                       className="w-full rounded-md"
//                       placeholder="Enter DoB"
//                       disabledDate={(current) =>
//                         current && current > moment().endOf("day")
//                       }
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label="Social Media"
//                     className="w-full"
//                     name="socialMedia"
//                     rules={[{ required: true, message: "Please select social media!" }]}
//                   >
//                     <Select placeholder="Add Social Media Group" className="rounded-md">
//                       <Option value="instagram">Instagram</Option>
//                       <Option value="facebook">Facebook</Option>
//                       <Option value="tiktok">TikTok</Option>
//                       <Option value="youtube">YouTube</Option>
//                       <Option value="twitter">Twitter</Option>
//                     </Select>
//                   </Form.Item>
//                 </div>
//               </>
//             )}

//             {/* Brand Owner Fields */}
//             {role === "brand" && (
//               <>
//                 <div className="md:flex gap-4">
//                   <Form.Item
//                     label="Full Name"
//                     className="w-full"
//                     name="fullName"
//                     rules={[{ required: true, message: "Please enter full name!" }]}
//                   >
//                     <Input
//                       placeholder="Enter full name"
//                       prefix={<UserOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>

//                   <Form.Item
//                     label="User Name"
//                     className="w-full"
//                     name="userName"
//                     rules={[{ required: true, message: "Please enter user name!" }]}
//                   >
//                     <Input
//                       placeholder="Enter user name"
//                       prefix={<UserOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>
//                 </div>

//                 <div className="md:flex gap-4">
//                   <Form.Item
//                     label="Email"
//                     className="w-full"
//                     name="email"
//                     rules={[
//                       { required: true, message: "Please enter your email!" },
//                       { type: "email", message: "Please enter a valid email!" },
//                     ]}
//                   >
//                     <Input
//                       placeholder="Enter Email"
//                       prefix={<MailOutlined />}
//                       className="rounded-md"
//                     />
//                   </Form.Item>
//                 </div>
//               </>
//             )}

//             {/* Common Password and Terms */}
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
//                 placeholder="Confirm password"
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


"use client"
import { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ShopOutlined,
  GlobalOutlined,
  DollarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Space,
  InputNumber,
} from "antd";
import moment from "moment";
import { useSignUpMutation } from "@/redux/fetures/auth/signUp";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Option } = Select;
const { TextArea } = Input;

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState("influencer");
  const [signUpUser] = useSignUpMutation();

  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location.pathname);
    }
  }, []);

  // Influencer states
  const [socialMediaList, setSocialMediaList] = useState([
    { platform: "facebook", url: "", followers: "" },
  ]);
  const [interestsList, setInterestsList] = useState([""]);

  // Brand states - removed targetAudienceList and productCategoriesList

  // Helper functions for influencer
  function updateSocialMedia(index, key, value) {
    const newList = [...socialMediaList];
    newList[index][key] = value;
    setSocialMediaList(newList);
  }

  function removeSocialMedia(index) {
    const newList = [...socialMediaList];
    newList.splice(index, 1);
    setSocialMediaList(newList);
  }

  function addSocialMedia() {
    setSocialMediaList([...socialMediaList, { platform: "facebook", url: "" }]);
  }

  function updateInterest(index, value) {
    const newList = [...interestsList];
    newList[index] = value;
    setInterestsList(newList);
  }

  function removeInterest(index) {
    const newList = [...interestsList];
    newList.splice(index, 1);
    setInterestsList(newList);
  }

  function addInterest() {
    setInterestsList([...interestsList, ""]);
  }

  // Helper functions for brand - removed unused functions

  const onRoleChange = (e) => {
    setRole(e.target.value);
    // Reset all dynamic lists
    setSocialMediaList([{ platform: "facebook", url: "" }]);
    setInterestsList([""]);
  };

  const onFinish = async (values) => {
 const { confirmPassword, acceptTerms, ...valuess } = values;

    let finalData = {
      ...valuess,
      role,
    };

    // Add role-specific data
    if (role === "influencer") {
      finalData = {
        ...finalData,
        dateOfBirth: values.dob ? values.dob.format("YYYY-MM-DD") : null,
        socialMedia: socialMediaList.filter((item) => item.url.trim() !== ""),
        interests: interestsList.filter((i) => i.trim() !== ""),
      };
      
      // Remove dob from finalData, keep only dateOfBirth
      delete finalData.dob;
      
      console.log("Influencer Final form data:", finalData);
    } else if (role === "brand") {
      finalData = {
        ...finalData,
        // Only include brand-specific fields that exist in the form
      };
      console.log("Brand Final form data:", finalData);
    }

    try {
      const res = await signUpUser(finalData).unwrap();
      if (res.code === 201) {
        toast.success(res.message);
        setTimeout(() => {
          router.push(`/auth/sendOtp?email=${values.email}&path=${pathName}`);
        }, 1000);
      }
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
      console.error(error.data);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster />
      <div className="flex-1 flex flex-col justify-center items-center bg-blue-50 px-8">
        <div className="max-w-[700px] w-full">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Logo"
              className="w-10 h-10"
            />
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          <h2 className="text-2xl font-semibold mb-1">Create an Account</h2>
          <p className="text-xs text-gray-400 mb-6">
            {role === "influencer" 
              ? "Hello there, Collaborate, Grow, and Earn as an Influencer!"
              : "Welcome Brand Owner, Connect with Influencers and Grow Your Business!"
            }
          </p>

          <Radio.Group
            onChange={onRoleChange}
            value={role}
            className="mb-6"
            name="roleRadioGroup"
          >
            <Radio value="influencer">Influencer</Radio>
            <Radio value="brand" className="ml-6">
              Brand Owner
            </Radio>
          </Radio.Group>

          <Form
            name="signup_form"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            key={role}
            className=""
          >
            {/* Common fields */}
            <div className="md:flex gap-4">
              <Form.Item
                label="Full Name"
                className="md:w-full"
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
                rules={[
                  { required: true, message: "Please enter phone number!" },
                ]}
              >
                <Input
                  placeholder="Enter Phone number"
                  prefix={<PhoneOutlined />}
                  className="rounded-md"
                />
              </Form.Item>
            </div>

            {/* Influencer specific fields */}
            {role === "influencer" && (
              <>
                <div className="md:flex gap-4">
                  <Form.Item
                    label="Date of Birth"
                    className="w-full"
                    name="dob"
                    rules={[
                      { required: true, message: "Please enter date of birth!" },
                    ]}
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
                    label="Location/City"
                    className="w-full"
                    name="location"
                    rules={[
                      { required: true, message: "Please enter your location!" },
                    ]}
                  >
                    <Input
                      placeholder="Enter your city/location"
                      prefix={<GlobalOutlined />}
                      className="rounded-md"
                    />
                  </Form.Item>
                </div>

                <div className="md:flex gap-4">
{/* 
                  <div className="w-full">
                    <label className="block mb-1 font-medium text-gray-700">
                      Social Media Profiles
                    </label>
                    {socialMediaList.map((item, idx) => (
                      <Space
                        key={idx}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="start"
                      >
                        <Select
                          value={item.platform}
                          onChange={(val) =>
                            updateSocialMedia(idx, "platform", val)
                          }
                          style={{ width: 120 }}
                        >
                          <Option value="facebook">Facebook</Option>
                          <Option value="instagram">Instagram</Option>
                          <Option value="tiktok">TikTok</Option>
                          <Option value="youtube">YouTube</Option>
                          <Option value="twitter">Twitter</Option>
                          <Option value="linkedin">LinkedIn</Option>
                          <Option value="snapchat">Snapchat</Option>
                        </Select>
                        <Input
                          placeholder="Enter profile URL"
                          value={item.url}
                          onChange={(e) =>
                            updateSocialMedia(idx, "url", e.target.value)
                          }
                          // style={{ width: "280px" }}
                          className=" md:w-[570px] w-[280px]"

                        />
                        {socialMediaList.length > 1 && (
                          <Button
                            danger
                            onClick={() => removeSocialMedia(idx)}
                            type="text"
                          >
                            Remove
                          </Button>
                        )}
                      </Space>
                    ))}
                    <Button
                      type="dashed"
                      onClick={addSocialMedia}
                      className=""
                    >
                      + Add Social Media Profile
                    </Button>
                  </div> */}

                  <div className="w-full">
  <label className="block mb-1 font-medium text-gray-700">
    Social Media Profiles
  </label>
  {socialMediaList.map((item, idx) => (
    <Space
      key={idx}
      style={{ display: "flex", marginBottom: 8 }}
      align="start"
      wrap
    >
      <Select
        value={item.platform}
        onChange={(val) => updateSocialMedia(idx, "platform", val)}
        style={{ width: 140 }}
        options={[
          { label: "Facebook", value: "Facebook" },
          { label: "Instagram", value: "Instagram" },
          { label: "TikTok", value: "TikTok" },
          { label: "YouTube", value: "YouTube" },
          { label: "Twitter", value: "Twitter" }, 
          { label: "Snapchat", value: "Snapchat" },
        ]}
      />
      <Input
        placeholder="Enter profile URL"
        value={item.url}
        onChange={(e) => updateSocialMedia(idx, "url", e.target.value)}
        className="md:w-[350px] w-[160px]"
        allowClear
      />
      <Input
        placeholder="Followers"
        value={item.followers}
        onChange={(e) => updateSocialMedia(idx, "followers", e.target.value)}
        className="md:w-[150px] w-[100px]"
        allowClear
        type="text"
        min={0}
      />
      {socialMediaList.length > 1 && (
        <Button danger onClick={() => removeSocialMedia(idx)} type="text">
          Remove
        </Button>
      )}
    </Space>
  ))}
  <Button type="dashed" onClick={addSocialMedia} className="mt-2 w-full">
    + Add Social Media Profile
  </Button>
</div>



                </div>

                <div className="mt-6">
                  <label className="block mb-1 font-medium text-gray-700">
                    Content Categories/Interests
                  </label>
                  {interestsList.map((interest, idx) => (
                    <Space key={idx} style={{ marginBottom: 8 }}>
                      <Select
                        placeholder="Select or type category"
                        value={interest}
                        onChange={(value) => updateInterest(idx, value)}
                        style={{ width: 400 }}
                        showSearch
                        allowClear
                      >
                        <Option value="Fashion & Style">Fashion & Style</Option>
                        <Option value="Beauty & Cosmetics">Beauty & Cosmetics</Option>
                        <Option value="Food & Cooking">Food & Cooking</Option>
                        <Option value="Travel & Adventure">Travel & Adventure</Option>
                        <Option value="Fitness & Health">Fitness & Health</Option>
                        <Option value="Technology & Gadgets">Technology & Gadgets</Option>
                        <Option value="Gaming">Gaming</Option>
                        <Option value="Music & Entertainment">Music & Entertainment</Option>
                        <Option value="Art & Design">Art & Design</Option>
                        <Option value="Business & Finance">Business & Finance</Option>
                        <Option value="Education & Learning">Education & Learning</Option>
                        <Option value="Parenting & Family">Parenting & Family</Option>
                        <Option value="Sports">Sports</Option>
                        <Option value="Home & Garden">Home & Garden</Option>
                        <Option value="Photography">Photography</Option>
                      </Select>
                      {interestsList.length > 1 && (
                        <Button
                          danger
                          onClick={() => removeInterest(idx)}
                          type="text"
                        >
                          Remove
                        </Button>
                      )}
                    </Space>
                  ))}
                  <Button type="dashed" onClick={addInterest} className="mt-2">
                    + Add Interest
                  </Button>
                </div>

                <Form.Item
                  label="Bio/Description"
                  name="bio"
                  rules={[
                    { max: 500, message: "Bio must be less than 500 characters!" },
                  ]}
                >
                  <TextArea
                    placeholder="Tell us about yourself and your content style..."
                    rows={3}
                    className="rounded-md"
                  />
                </Form.Item>
              </>
            )}

            {/* Brand specific fields */}
            {role === "brand" && (
              <>
                <div className="md:flex gap-4">
                  <Form.Item
                    label="Company/Brand Name"
                    className="w-full"
                    name="companyName"
                    rules={[
                      { required: true, message: "Please enter company name!" },
                    ]}
                  >
                    <Input
                      placeholder="Enter company/brand name"
                      prefix={<ShopOutlined />}
                      className="rounded-md"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Industry"
                    className="w-full"
                    name="industry"
                    rules={[
                      { required: true, message: "Please select industry!" },
                    ]}
                  >
                    <Select placeholder="Select industry" className="rounded-md">
                      <Option value="Fashion & Apparel">Fashion & Apparel</Option>
                      <Option value="Beauty & Cosmetics">Beauty & Cosmetics</Option>
                      <Option value="Food & Beverage">Food & Beverage</Option>
                      <Option value="Technology">Technology</Option>
                      <Option value="Health & Wellness">Health & Wellness</Option>
                      <Option value="Travel & Tourism">Travel & Tourism</Option>
                      <Option value="Automotive">Automotive</Option>
                      <Option value="Home & Garden">Home & Garden</Option>
                      <Option value="Sports & Recreation">Sports & Recreation</Option>
                      <Option value="Entertainment & Media">Entertainment & Media</Option>
                      <Option value="Education">Education</Option>
                      <Option value="Finance & Insurance">Finance & Insurance</Option>
                      <Option value="Real Estate">Real Estate</Option>
                      <Option value="E-commerce">E-commerce</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  label="Website URL"
                  name="website"
                  rules={[
                    { type: "url", message: "Please enter a valid URL!" },
                  ]}
                >
                  <Input
                    placeholder="https://yourwebsite.com"
                    prefix={<GlobalOutlined />}
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  label="Company Description"
                  name="companyDescription"
                  rules={[
                    { required: true, message: "Please describe your company!" },
                    { max: 1000, message: "Description must be less than 1000 characters!" },
                  ]}
                >
                  <TextArea
                    placeholder="Describe your company, products/services, and what makes you unique..."
                    rows={4}
                    className="rounded-md"
                  />
                </Form.Item>



                <Form.Item
                  label="Previous Influencer Marketing Experience"
                  name="previousExperience"
                >
                  <Radio.Group>
                    <Radio value="none">No previous experience</Radio>
                    <Radio value="limited">Limited experience (1-5 campaigns)</Radio>
                    <Radio value="moderate">Moderate experience (6-20 campaigns)</Radio>
                    <Radio value="extensive">Extensive experience (20+ campaigns)</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}

            {/* Password and terms */}
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
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error("You must accept the terms")),
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
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-black hover:bg-black"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <p className="text-xs text-center text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" legacyBehavior>
              <a className="font-semibold text-black hover:underline">Login</a>
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png"
          alt="Signup Banner"
          className="object-cover w-full h-[1300px]"
        />
      </div>
    </div>
  );
}