"use client";

import { LeftOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/fetures/auth/forgotPassword";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      const res = await forgotPassword(values).unwrap();
      message.success(res?.message || "Reset code sent to your email.");
      router.push(`/auth/sendOtp?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      message.error(error?.data?.message || "Failed to send reset email.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col items-center justify-center bg-emerald-50/60 px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>

          <h2 className="mb-1 text-2xl font-semibold text-slate-900">
            <LeftOutlined
              onClick={() => router.push("/auth/login")}
              className="mr-2 cursor-pointer"
            />
            Forgot Password
          </h2>
          <p className="mb-6 text-xs text-slate-500">
            Enter your email and we will send a one-time code to reset your password.
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
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
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
                loading={isLoading}
                className="!h-11 w-full !bg-emerald-700 hover:!bg-emerald-600"
              >
                Send reset code
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="hidden flex-1 md:flex">
        <img
          src="/images/login.png"
          alt="Forgot Password Banner"
          className="h-screen w-full object-cover"
        />
      </div>
    </div>
  );
}
