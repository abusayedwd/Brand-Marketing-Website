




// "use client";
// import React, { useState, useEffect } from "react";
// import { 
//   Button, 
//   Input, 
//   Form, 
//   Image, 
//   Upload, 
//   DatePicker, 
//   Select, 
//   Tag,
//   message,
//   Space
// } from "antd";
// import { LuImagePlus, LuX } from "react-icons/lu";
// import { useRouter } from "next/navigation";
// import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
// import url from "@/redux/api/baseUrl";
// import dayjs from "dayjs";
// import { useUpdateUserMutation } from "@/redux/fetures/user/updateUser";

// const { Option } = Select;
// const { TextArea } = Input;

// const EditProfile = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState([]);
//   const [imageUrl, setImageUrl] = useState("");
//   const [socialMediaInputs, setSocialMediaInputs] = useState([]);
//   const [interestTags, setInterestTags] = useState([]);
//   const [newInterest, setNewInterest] = useState("");
  
//   const router = useRouter();
//   const { data: profile } = useLogedUserQuery();
//   const user = profile?.data?.attributes;

//   const [updateUser, {isLoading}] = useUpdateUserMutation()

//   useEffect(() => {
//     if (user) {
//       // Set initial form values
//       form.setFieldsValue({
//         fullName: user.fullName,
//         userName: user.userName,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
//         // Influencer fields
//         bio: user.bio || "",
//         // Brand fields
//         companyName: user.companyName || "",
//         industry: user.industry || "",
//         website: user.website || "",
//         companyDescription: user.companyDescription || "",
//         previousExperience: user.previousExperience || "",
//       });

//       // Set profile image
//       if (user.image?.url) {
//         setImageUrl(`${url}${user.image.url}`);
//       }

//       // Set social media
//       if (user.socialMedia?.length > 0) {
//         setSocialMediaInputs(user.socialMedia);
//       }

//       // Set interests for influencers
//       if (user.interests?.length > 0) {
//         setInterestTags(user.interests);
//       }
//     }
//   }, [user, form]);

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     if (newFileList[0]?.originFileObj) {
//       const reader = new FileReader();
//       reader.readAsDataURL(newFileList[0].originFileObj);
//       reader.onload = () => setImageUrl(reader.result);
//     }
//   };

//   const addSocialMedia = () => {
//     setSocialMediaInputs([...socialMediaInputs, { platform: "", url: "", followers: "" }]);
//   };

//   const removeSocialMedia = (index) => {
//     const newInputs = socialMediaInputs.filter((_, i) => i !== index);
//     setSocialMediaInputs(newInputs);
//   };

//   const updateSocialMedia = (index, field, value) => {
//     const newInputs = [...socialMediaInputs];
//     newInputs[index][field] = value;
//     setSocialMediaInputs(newInputs);
//   };

//   const addInterest = () => {
//     if (newInterest.trim() && !interestTags.includes(newInterest.trim())) {
//       setInterestTags([...interestTags, newInterest.trim()]);
//       setNewInterest("");
//     }
//   };

//   const removeInterest = (tagToRemove) => {
//     setInterestTags(interestTags.filter(tag => tag !== tagToRemove));
//   };

//   const handleFormSubmit = (values) => {
//     const formData = {
//       ...values,
//       dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : null,
//       socialMedia: socialMediaInputs.filter(social => social.platform && social.url),
//       interests: interestTags,
//       image: fileList[0]?.originFileObj || null,
//     };
    
//     console.log("Updated Profile Data:", formData);
//     message.success("Profile updated successfully!");
//     // Here you would typically make an API call to update the profile
//     // router.push("/dashboard/profile");
//   };

//   const renderInfluencerFields = () => (
//     <>
//       <Form.Item
//         label="Bio"
//         name="bio"
//         rules={[{ required: false }]}
//       >
//         <TextArea 
//           rows={4} 
//           placeholder="Tell us about yourself..."
//           className="rounded-md"
//         />
//       </Form.Item>

//       <Form.Item label="Interests">
//         <div className="space-y-3">
//           <div className="flex gap-2">
//             <Input
//               value={newInterest}
//               onChange={(e) => setNewInterest(e.target.value)}
//               placeholder="Add an interest"
//               onPressEnter={addInterest}
//               className="flex-1"
//             />
//             <Button onClick={addInterest} type="dashed">
//               Add
//             </Button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {interestTags.map((tag, index) => (
//               <Tag
//                 key={index}
//                 closable
//                 onClose={() => removeInterest(tag)}
//                 color="green"
//               >
//                 {tag}
//               </Tag>
//             ))}
//           </div>
//         </div>
//       </Form.Item>

//       <Form.Item label="Social Media Platforms">
//         <div className="space-y-3">
//           {socialMediaInputs.map((social, index) => (
//             <div key={index} className="flex gap-2 items-end">
//               <div className="flex-1">
//                 <Select
//                   placeholder="Platform"
//                   value={social.platform}
//                   onChange={(value) => updateSocialMedia(index, 'platform', value)}
//                   className="w-full"
//                 >
//                   <Option value="facebook">Facebook</Option>
//                   <Option value="instagram">Instagram</Option>
//                   <Option value="twitter">Twitter</Option>
//                   <Option value="youtube">YouTube</Option>
//                   <Option value="tiktok">TikTok</Option>
//                   <Option value="linkedin">LinkedIn</Option>
//                 </Select>
//               </div>
//               <div className="flex-1">
//                 <Input
//                   placeholder="Profile URL"
//                   value={social.url}
//                   onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
//                 />
//               </div>
//               <div className="flex-1">
//                 <Input
//                   placeholder="Followers (e.g., 10k)"
//                   value={social.followers}
//                   onChange={(e) => updateSocialMedia(index, 'followers', e.target.value)}
//                 />
//               </div>
//               <Button
//                 type="text"
//                 danger
//                 icon={<LuX />}
//                 onClick={() => removeSocialMedia(index)}
//               />
//             </div>
//           ))}
//           <Button type="dashed" onClick={addSocialMedia} block>
//             Add Social Media Platform
//           </Button>
//         </div>
//       </Form.Item>
//     </>
//   );

//   const renderBrandFields = () => (
//     <>
//       <Form.Item
//         label="Company Name"
//         name="companyName"
//         rules={[{ required: true, message: "Please enter company name" }]}
//       >
//         <Input placeholder="Enter company name" className="rounded-md" />
//       </Form.Item>

//       <Form.Item
//         label="Industry"
//         name="industry"
//         rules={[{ required: true, message: "Please select industry" }]}
//       >
//         <Select placeholder="Select industry" className="rounded-md">
//           <Option value="Technology">Technology</Option>
//           <Option value="Healthcare">Healthcare</Option>
//           <Option value="Finance">Finance</Option>
//           <Option value="Education">Education</Option>
//           <Option value="Food & Beverage">Food & Beverage</Option>
//           <Option value="Fashion">Fashion</Option>
//           <Option value="Travel">Travel</Option>
//           <Option value="Entertainment">Entertainment</Option>
//           <Option value="Other">Other</Option>
//         </Select>
//       </Form.Item>

//       <Form.Item
//         label="Website"
//         name="website"
//         rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
//       >
//         <Input placeholder="https://yourwebsite.com" className="rounded-md" />
//       </Form.Item>

//       <Form.Item
//         label="Company Description"
//         name="companyDescription"
//         rules={[{ required: true, message: "Please enter company description" }]}
//       >
//         <TextArea 
//           rows={4} 
//           placeholder="Describe your company and what you do..."
//           className="rounded-md"
//         />
//       </Form.Item>

//       <Form.Item
//         label="Previous Experience with Influencer Marketing"
//         name="previousExperience"
//         rules={[{ required: true, message: "Please select your experience level" }]}
//       >
//         <Select placeholder="Select experience level" className="rounded-md">
//           <Option value="none">No previous experience</Option>
//           <Option value="limited">Limited experience (1-5 campaigns)</Option>
//           <Option value="moderate">Moderate experience (6-20 campaigns)</Option>
//           <Option value="extensive">Extensive experience (20+ campaigns)</Option>
//         </Select>
//       </Form.Item>
//     </>
//   );

//   if (!user) {
//     return (
//       <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
//         <div className="text-center">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
//       <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
//         Edit Profile
//       </h1>

//       <div className="bg-white shadow-md py-10 rounded-lg p-6">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFormSubmit}
//           className="space-y-4"
//         >
//           {/* Profile Image Upload */}
//           <Form.Item label="Profile Picture">
//             <div className="flex items-center gap-4">
//               <Image
//                 width={120}
//                 height={120}
//                 src={imageUrl || "/images/user4.jpg"}
//                 className="rounded-full object-cover"
//                 alt="Profile"
//               />
//               <Upload
//                 listType="picture"
//                 fileList={fileList}
//                 onChange={handleUploadChange}
//                 beforeUpload={() => false}
//                 maxCount={1}
//                 accept="image/*"
//               >
//                 <Button icon={<LuImagePlus />}>Upload New Photo</Button>
//               </Upload>
//             </div>
//           </Form.Item>

//           {/* Common Fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Form.Item
//               label="Full Name"
//               name="fullName"
//               rules={[{ required: true, message: "Please enter your full name" }]}
//             >
//               <Input placeholder="Enter full name" className="rounded-md" />
//             </Form.Item>

//             <Form.Item
//               label="Username"
//               name="userName"
//               rules={[{ required: true, message: "Please enter username" }]}
//             >
//               <Input placeholder="Enter username" className="rounded-md" />
//             </Form.Item>

//             <Form.Item
//               label="Email"
//               name="email"
//               rules={[
//                 { required: true, message: "Please enter email" },
//                 { type: "email", message: "Please enter valid email" }
//               ]}
//             >
//               <Input placeholder="Enter email" className="rounded-md" disabled />
//             </Form.Item>

//             <Form.Item
//               label="Phone Number"
//               name="phoneNumber"
//               rules={[{ required: true, message: "Please enter phone number" }]}
//             >
//               <Input placeholder="Enter phone number" className="rounded-md" />
//             </Form.Item>

//             <Form.Item
//               label="Address"
//               name="address"
//             >
//               <Input placeholder="Enter address" className="rounded-md" />
//             </Form.Item>

//             <Form.Item
//               label="Date of Birth"
//               name="dateOfBirth"
//             >
//               <DatePicker
//                 className="w-full rounded-md"
//                 placeholder="Select date of birth"
//                 format="DD/MM/YYYY"
//               />
//             </Form.Item>
//           </div>

//           {/* Role-specific fields */}
//           {user?.role === 'influencer' ? renderInfluencerFields() : renderBrandFields()}

//           {/* Action Buttons */}
//           <div className="flex gap-4 justify-end pt-6">
//             <Button 
//               onClick={() => router.push("/dashboard/profile")}
//               className="px-8"
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="primary" 
//               htmlType="submit"
//               className="!bg-green-500 hover:!bg-green-400 px-8"
//             >
//               Save Changes
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


"use client";
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Input, 
  Form, 
  Image, 
  Upload, 
  DatePicker, 
  Select, 
  Tag,
  message,
  Space
} from "antd";
import { LuImagePlus, LuX } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import url from "@/redux/api/baseUrl";
import dayjs from "dayjs";
import { useUpdateUserMutation } from "@/redux/fetures/user/updateUser";

const { Option } = Select;
const { TextArea } = Input;

const EditProfile = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [socialMediaInputs, setSocialMediaInputs] = useState([]);
  const [interestTags, setInterestTags] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  
  const router = useRouter();
  const { data: profile } = useLogedUserQuery();
  const user = profile?.data?.attributes;

  const [updateUser, {isLoading}] = useUpdateUserMutation()

  useEffect(() => {
    if (user) {
      // Set initial form values
      form.setFieldsValue({
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        // Influencer fields
        bio: user.bio || "",
        // Brand fields
        companyName: user.companyName || "",
        industry: user.industry || "",
        website: user.website || "",
        companyDescription: user.companyDescription || "",
        previousExperience: user.previousExperience || "",
      });

      // Set profile image
      if (user.image?.url) {
        setImageUrl(`${url}${user.image.url}`);
      }

      // Set social media for influencers
      if (user.role === 'influencer' && user.socialMedia?.length > 0) {
        setSocialMediaInputs(user.socialMedia.map(social => ({
          platform: social.platform,
          url: social.url,
          followers: social.followers || ""
        })));
      }

      // Set interests for influencers
      if (user.role === 'influencer' && user.interests?.length > 0) {
        setInterestTags(user.interests);
      }
    }
  }, [user, form]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };

  const addSocialMedia = () => {
    setSocialMediaInputs([...socialMediaInputs, { platform: "", url: "", followers: "" }]);
  };

  const removeSocialMedia = (index) => {
    const newInputs = socialMediaInputs.filter((_, i) => i !== index);
    setSocialMediaInputs(newInputs);
  };

  const updateSocialMedia = (index, field, value) => {
    const newInputs = [...socialMediaInputs];
    newInputs[index][field] = value;
    setSocialMediaInputs(newInputs);
  };

  const addInterest = () => {
    if (newInterest.trim() && !interestTags.includes(newInterest.trim())) {
      setInterestTags([...interestTags, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (tagToRemove) => {
    setInterestTags(interestTags.filter(tag => tag !== tagToRemove));
  };

  const handleFormSubmit = async (values) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Common fields for both roles
      const commonFields = ['fullName', 'userName', 'email', 'phoneNumber', 'address'];
      
      // Role-specific fields
      const influencerFields = ['bio'];
      const brandFields = ['companyName', 'industry', 'website', 'companyDescription', 'previousExperience'];
      
      // Add common fields
      commonFields.forEach(key => {
        if (values[key] !== undefined && values[key] !== null && values[key] !== '') {
          formData.append(key, values[key]);
        }
      });

      // Add date of birth if exists
      if (values.dateOfBirth) {
        formData.append('dateOfBirth', values.dateOfBirth.toISOString());
      }

      // Add role-specific fields
      if (user?.role === 'influencer') {
        // Add influencer-specific fields
        influencerFields.forEach(key => {
          if (values[key] !== undefined && values[key] !== null) {
            formData.append(key, values[key]);
          }
        });

        // Add social media for influencers
        if (socialMediaInputs.length > 0) {
          const validSocialMedia = socialMediaInputs.filter(social => 
            social.platform && social.url && social.platform.trim() && social.url.trim()
          );
          if (validSocialMedia.length > 0) {
            formData.append('socialMedia', JSON.stringify(validSocialMedia));
          }
        }

        // Add interests for influencers
        if (interestTags.length > 0) {
          formData.append('interests', JSON.stringify(interestTags));
        }
      } else if (user?.role === 'brand') {
        // Add brand-specific fields
        brandFields.forEach(key => {
          if (values[key] !== undefined && values[key] !== null) {
            formData.append(key, values[key]);
          }
        });

        // Clear influencer-specific fields for brands
        formData.append('bio', '');
        formData.append('socialMedia', JSON.stringify([]));
        formData.append('interests', JSON.stringify([]));
      }

      // Add image file if exists
      if (fileList[0]?.originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      // Call the update mutation
      const response = await updateUser(formData).unwrap();
      console.log('Update response:', response);
      
      message.success("Profile updated successfully!");
      
      // Redirect to profile page after successful update
      router.push("/dashboard/profile");
      
    } catch (error) {
      console.error("Update failed:", error);
      message.error(error?.data?.message || "Failed to update profile. Please try again.");
    }
  };

  const renderInfluencerFields = () => (
    <>
      <Form.Item
        label="Bio"
        name="bio"
        rules={[{ required: false }]}
      >
        <TextArea 
          rows={4} 
          placeholder="Tell us about yourself..."
          className="rounded-md"
        />
      </Form.Item>

      <Form.Item label="Interests">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add an interest"
              onPressEnter={addInterest}
              className="flex-1"
            />
            <Button onClick={addInterest} type="dashed">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {interestTags.map((tag, index) => (
              <Tag
                key={index}
                closable
                onClose={() => removeInterest(tag)}
                color="green"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </Form.Item>

      <Form.Item label="Social Media Platforms">
        <div className="space-y-3">
          {socialMediaInputs.map((social, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <Select
                  placeholder="Platform"
                  value={social.platform}
                  onChange={(value) => updateSocialMedia(index, 'platform', value)}
                  className="w-full"
                >
                  <Option value="facebook">Facebook</Option>
                  <Option value="instagram">Instagram</Option>
                  <Option value="twitter">Twitter</Option>
                  <Option value="youtube">YouTube</Option>
                  <Option value="tiktok">TikTok</Option>
                  <Option value="linkedin">LinkedIn</Option>
                </Select>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Profile URL"
                  value={social.url}
                  onChange={(e) => updateSocialMedia(index, 'url', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Followers (e.g., 10k)"
                  value={social.followers}
                  onChange={(e) => updateSocialMedia(index, 'followers', e.target.value)}
                />
              </div>
              <Button
                type="text"
                danger
                icon={<LuX />}
                onClick={() => removeSocialMedia(index)}
              />
            </div>
          ))}
          <Button type="dashed" onClick={addSocialMedia} block>
            Add Social Media Platform
          </Button>
        </div>
      </Form.Item>
    </>
  );

  const renderBrandFields = () => (
    <>
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: "Please enter company name" }]}
      >
        <Input placeholder="Enter company name" className="rounded-md" />
      </Form.Item>

      <Form.Item
        label="Industry"
        name="industry"
        rules={[{ required: true, message: "Please select industry" }]}
      >
        <Select placeholder="Select industry" className="rounded-md">
          <Option value="Technology">Technology</Option>
          <Option value="Healthcare">Healthcare</Option>
          <Option value="Finance">Finance</Option>
          <Option value="Education">Education</Option>
          <Option value="Food & Beverage">Food & Beverage</Option>
          <Option value="Fashion">Fashion</Option>
          <Option value="Travel">Travel</Option>
          <Option value="Entertainment">Entertainment</Option>
          <Option value="Other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Website"
        name="website"
        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
      >
        <Input placeholder="https://yourwebsite.com" className="rounded-md" />
      </Form.Item>

      <Form.Item
        label="Company Description"
        name="companyDescription"
        rules={[{ required: true, message: "Please enter company description" }]}
      >
        <TextArea 
          rows={4} 
          placeholder="Describe your company and what you do..."
          className="rounded-md"
        />
      </Form.Item>

      <Form.Item
        label="Previous Experience with Influencer Marketing"
        name="previousExperience"
        rules={[{ required: true, message: "Please select your experience level" }]}
      >
        <Select placeholder="Select experience level" className="rounded-md">
          <Option value="none">No previous experience</Option>
          <Option value="limited">Limited experience (1-5 campaigns)</Option>
          <Option value="moderate">Moderate experience (6-20 campaigns)</Option>
          <Option value="extensive">Extensive experience (20+ campaigns)</Option>
        </Select>
      </Form.Item>
    </>
  );

  if (!user) {
    return (
      <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
        Edit {user?.role === 'influencer' ? 'Influencer' : 'Brand'} Profile
      </h1>

      <div className="bg-white shadow-md py-10 rounded-lg p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          className="space-y-4"
        >
          {/* Profile Image Upload */}
          <Form.Item label="Profile Picture">
            <div className="flex items-center gap-4">
              <Image
                width={120}
                height={120}
                src={imageUrl || "/images/user4.jpg"}
                className="rounded-full object-cover"
                alt="Profile"
              />
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
                maxCount={1}
                accept="image/*"
              >
                <Button icon={<LuImagePlus />}>Upload New Photo</Button>
              </Upload>
            </div>
          </Form.Item>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input placeholder="Enter full name" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="userName"
              rules={[{ required: true, message: "Please enter username" }]}
            >
              <Input placeholder="Enter username" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter valid email" }
              ]}
            >
              <Input placeholder="Enter email" className="rounded-md" disabled />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input placeholder="Enter phone number" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
            >
              <Input placeholder="Enter address" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
            >
              <DatePicker
                className="w-full rounded-md"
                placeholder="Select date of birth"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </div>

          {/* Role-specific fields */}
          {user?.role === 'influencer' ? renderInfluencerFields() : renderBrandFields()}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-6">
            <Button 
              onClick={() => router.push("/dashboard/profile")}
              className="px-8"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isLoading}
              className="!bg-green-500 hover:!bg-green-400 px-8"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;