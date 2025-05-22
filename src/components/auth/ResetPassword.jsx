"use client"
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useResetPasswordMutation } from '@/redux/fetures/auth/resetPassword';
import toast, { Toaster } from 'react-hot-toast';
import { LeftOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
 


const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
 const router = useRouter()
  const [email, setEmail] = useState('')
 
 const [resetPassword, {isLoading}] = useResetPasswordMutation()
  useEffect(() => {
    // Extract query parameters on client-side
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get('email') || ''); 
  }, []);


  const onFinish = async (values) => {
    setLoading(true);
    router.push('/auth/login')
    try {
      console.log('New password:', values.newPassword);
      // TODO: Add API call to reset password here 
      message.success('Password reset successfully!');
    } catch (error) {
      message.error('Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };
  
const Back = () => {
  router.push('/auth/sendOtp')
}
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
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

          <h2 className="text-2xl font-semibold mb-1"> <LeftOutlined onClick={Back} className=' cursor-pointer' /> Reset Password</h2>
          <p className="text-xs text-gray-400 mb-6">
            Your password must be 8-10 characters long.
          </p>

          <Form
            name="reset_password"
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please enter new password!' },
                { min: 6, max: 20, message: 'Password must be 6-20 characters!' },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter new password"
                prefix={<LockOutlined />}
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm new password"
                prefix={<LockOutlined />}
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
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex flex-1">
        <img
          src="/images/login.png" // Place your banner image in public/login-banner.png
          alt="Reset Password Banner"
          className="object-cover w-full h-screen"
        />
      </div>
    </div>
  );
};

export default ResetPassword;