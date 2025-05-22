"use client";
import React, { useState } from "react";
import { Button, Input, Modal, Form, Image, Space, Upload } from "antd";
import { LuImagePlus } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import url from "@/redux/api/baseUrl";


const Profile = () => {
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const router = useRouter();

  const profileImage = "/images/user4.jpg";

  const { data: profile } = useLogedUserQuery();
  const user = profile?.data?.attributes?.user;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (values) => {
    console.log("Updated Profile Data:", values);
    closeModal();
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList[0]?.originFileObj) {
      const reader = new FileReader();
      reader.readAsDataURL(newFileList[0].originFileObj);
      reader.onload = () => setImageUrl(reader.result);
    }
  };

  const handleEditProfile = () => {
    router.push("/dashboard/profile/editProfile");
  };

  return (
    <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center md:mb-8">
        My Profile
      </h1>

      <div className="bg-white shadow-md py-10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Space size={12}>
            <Image
              width={200}
              src={profileImage}
              placeholder={
                <Image preview={false} src="/images/user4.jpg" width={200} />
              }
            />
          </Space>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">{user?.fullName}</h2>
            <p className="text-gray-600">{user?.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm text-gray-500">Company</label>
                <Input
                  value={user?.company}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Address</label>
                <Input
                  value={user?.address}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                <Input
                  value={user?.phoneNumber}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <Input
                  value={user?.dateOfBirth}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Social Platforms</label>
                <Input
                  value={user?.socialPlatforms?.join(", ")}
                  readOnly
                  className="bg-gray-100 border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="text-right">
            <Button
              type="primary"
              className="!bg-green-500 mt-6 hover:!bg-green-400 text-white"
              onClick={handleEditProfile}
            >
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
