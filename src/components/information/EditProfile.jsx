'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, DatePicker, Space } from "antd";
import { useRouter } from "next/navigation";
import { useLogedUserQuery } from "@/redux/fetures/user/logedUser";
import url from "@/redux/api/baseUrl";

const EditProfile = () => {
  const router = useRouter();
  const { data: profile } = useLogedUserQuery();
  const user = profile?.data?.attributes?.user;

  const [form] = Form.useForm();

  useEffect(() => {
    // Pre-fill form fields with current user data
    form.setFieldsValue({
      fullName: user?.fullName,
      email: user?.email,
      company: user?.company,
      address: user?.address,
      phoneNumber: user?.phoneNumber,
      dateOfBirth: user?.dateOfBirth ? moment(user?.dateOfBirth) : null,
      socialPlatforms: user?.socialPlatforms?.join(", "),
    });
  }, [form, user]);

  const handleSave = (values) => {
    // Handle save logic, e.g., make API request to update user data
    console.log("Updated Profile Data:", values);
    // Navigate back to profile page after saving
    // router.push("/profile");
  };

  return (
    <div className="md:w-[70%] mx-auto md:py-24 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl mt-5 font-bold text-green-700 text-center mb-8">
        Edit Profile
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        className="bg-white shadow-md py-10 rounded-lg p-6"
      >
        <Form.Item label="Full Name" name="fullName">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Company" name="company">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item label="Date of Birth" name="dateOfBirth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Social Platforms" name="socialPlatforms">
          <Input />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" className="!bg-green-500">
            Save Changes
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProfile;
