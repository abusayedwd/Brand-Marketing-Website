// "use client";
// import React, { useState } from "react";
// import { Button, Input, Modal, Form, Image, Space, Upload } from "antd";
// import { LuImagePlus } from "react-icons/lu";
// import { useRouter } from "next/navigation";
 
// import url from "@/redux/api/baseUrl";
// import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";


// const Profile = () => {
//   const [fileList, setFileList] = useState([]);
//   const [imageUrl, setImageUrl] = useState();
//   const router = useRouter();

//   const profileImage = "/images/user4.jpg";

//   const { data: profile } = useLogedUserQuery();
//   const user = profile?.data?.attributes;
//   console.log(user)
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [form] = Form.useForm();

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleFormSubmit = (values) => {
//     console.log("Updated Profile Data:", values);
//     closeModal();
//   };

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     if (newFileList[0]?.originFileObj) {
//       const reader = new FileReader();
//       reader.readAsDataURL(newFileList[0].originFileObj);
//       reader.onload = () => setImageUrl(reader.result);
//     }
//   };

//   const handleEditProfile = () => {
//     router.push("/dashboard/profile/editProfile");
//   };

//   return (
//     <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
//       <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
//         My Profile
//       </h1>

//       <div className="bg-white shadow-md py-10 rounded-lg p-6">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <Space size={12}>
//             <Image
//               width={200}
//               src={profileImage}
//               placeholder={
//                 <Image preview={false} src="/images/user4.jpg" width={200} />
//               }
//             />
//           </Space>

//           <div className="flex-1">
//             <h2 className="text-xl font-semibold text-gray-800">{user?.fullName}</h2>
//             <p className="text-gray-600">{user?.email}</p>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//               <div>
//                 <label className="text-sm text-gray-500">Company</label>
//                 <Input
//                   value={user?.company}
//                   readOnly
//                   className="bg-gray-100 border-gray-300 rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Address</label>
//                 <Input
//                   value={user?.address}
//                   readOnly
//                   className="bg-gray-100 border-gray-300 rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Phone Number</label>
//                 <Input
//                   value={user?.phoneNumber}
//                   readOnly
//                   className="bg-gray-100 border-gray-300 rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Date of Birth</label>
//                 <Input
//                   value={user?.dateOfBirth}
//                   readOnly
//                   className="bg-gray-100 border-gray-300 rounded-md"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm text-gray-500">Social Platforms</label>
//                 <Input
//                   value={user?.socialPlatforms?.join(", ")}
//                   readOnly
//                   className="bg-gray-100 border-gray-300 rounded-md"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="text-right">
//             <Button
//               type="primary"
//               className="!bg-green-500 mt-6 hover:!bg-green-400 text-white"
//               onClick={handleEditProfile}
//             >
//               Edit profile
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;



"use client";
import React, { useState } from "react";
import { Button, Input, Image, Space, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import url from "@/redux/api/baseUrl";
 

const Profile = () => {
  const router = useRouter();
  const { data: profile } = useLogedUserQuery();
  const user = profile?.data?.attributes;

  // const profileImage = user?.image?.url 
  //   ? `${url + user.image.url}` 
  //   : "/images/user4.jpg";

  const handleEditProfile = () => {
    router.push("/dashboard/profile/editProfile");
  };

  // Render influencer-specific fields
  const renderInfluencerFields = () => (
    <>
      <div>
        <label className="text-sm text-gray-500">Bio</label>
        <Input.TextArea
          value={user?.bio || 'N/A'}
          readOnly
          rows={3}
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500">Interests</label>
        <div className="mt-1">
          {user?.interests?.length > 0 ? (
            <Space wrap>
              {user.interests.map((interest, index) => (
                <Tag key={index} color="green">{interest}</Tag>
              ))}
            </Space>
          ) : (
            <Input value="No interests added" readOnly className="bg-gray-100 border-gray-300 rounded-md" />
          )}
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500">Social Media</label>
        <div className="space-y-2 mt-1">
          {user?.socialMedia?.length > 0 ? (
            user.socialMedia.map((social, index) => (
              <div key={index} className="flex items-center gap-2">
                <Tag color="blue">{social.platform}</Tag>
                <span className="text-sm text-gray-600">{social.followers} followers</span>
                <a href={social.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                  View Profile
                </a>
              </div>
            ))
          ) : (
            <Input value="No social media added" readOnly className="bg-gray-100 border-gray-300 rounded-md" />
          )}
        </div>
      </div>
    </>
  );

  // Render brand-specific fields
  const renderBrandFields = () => (
    <>
      <div>
        <label className="text-sm text-gray-500">Company Name</label>
        <Input
          value={user?.companyName || 'N/A'}
          readOnly
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500">Industry</label>
        <Input
          value={user?.industry || 'N/A'}
          readOnly
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500">Website</label>
        <Input
          value={user?.website || 'N/A'}
          readOnly
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500">Company Description</label>
        <Input.TextArea
          value={user?.companyDescription || 'N/A'}
          readOnly
          rows={3}
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="text-sm text-gray-500">Previous Experience</label>
        <Input
          value={user?.previousExperience || 'N/A'}
          readOnly
          className="bg-gray-100 border-gray-300 rounded-md"
        />
      </div>
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
        My Profile
      </h1>

      <div className="bg-white shadow-md py-10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col items-center">
            <Space size={12}>
              <Image
                width={200}
                height={200}
                src={url + user?.image?.url}
                className="rounded-full object-cover"
                placeholder={
                  <Image 
                    preview={false} 
                    src="/images/user4.jpg" 
                    width={200} 
                    height={200}
                    className="rounded-full object-cover"
                  />
                }
              />
            </Space>
            <Tag color={user?.role === 'brand' ? 'blue' : 'green'} className="mt-2">
              {user?.role?.toUpperCase()}
            </Tag>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{user?.fullName}</h2>
            <p className="text-gray-600 mb-4">{user?.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <Input
                  value={user?.userName || 'N/A'}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <Input
                  value={user?.phoneNumber || 'N/A'}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <Input
                  value={user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'N/A'}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <Input
                  value={user?.address || 'N/A'}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Role-specific fields */}
            <div className="grid grid-cols-1 gap-4">
              {user?.role === 'influencer' ? renderInfluencerFields() : renderBrandFields()}
            </div>
          </div>

          <div className="text-right">
            <Button
              type="primary"
              className="!bg-green-500 mt-6 hover:!bg-green-400 text-white"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;