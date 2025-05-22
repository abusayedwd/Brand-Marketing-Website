"use client"

import { LeftOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const onFinish =   (values) => {
    setLoading(true);
    try {
      // Simulate API call to send reset link
      console.log('Email to reset password:', values);
      // TODO: replace with your API integration

      message.success('If the email exists, you will receive a reset link shortly.');
      router.push(`/auth/sendOtp?email=${values.email}`)
    } catch (error) {
      message.error('Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  const Back = () => {
    router.push('/auth/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
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

          <h2 className="text-2xl font-semibold mb-1"><LeftOutlined onClick={Back} className=' cursor-pointer' /> Forgot Password</h2>
          <p className="text-xs text-gray-400 mb-6">
            Please enter your Email to reset your password.
          </p>

          <Form
            name="forgot_password"
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter Email"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-black hover:bg-black"
              >
                Verify
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png" // Place your banner image in public/login-banner.png
          alt="Forgot Password Banner"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
}
