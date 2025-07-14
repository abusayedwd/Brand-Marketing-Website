// pages/submit-draft.js
'use client'; // For app directory

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Card, Typography, message, Space, Select } from 'antd';
import { InboxOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { useSubmitDraftMutation } from '@/redux/fetures/draftSubmit/submitdraft';
import toast from 'react-hot-toast';
import BackButton from '@/components/customComponent/BackButton';
import { useRouter } from 'next/navigation'; // Add this import

const { Title, Text } = Typography;
const { Dragger } = Upload;

const SubmitDraftPage = () => {
  const router = useRouter(); // Use router hook
  const [id, setId] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get('id') || '');
  }, []); // Empty array ensures this runs only once on mount
  
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [socialMediaList, setSocialMediaList] = useState([
    { platform: 'Instagram', url: '' }
  ]);

  const addSocialMedia = () => {
    setSocialMediaList([...socialMediaList, { platform: 'Facebook', url: '' }]);
  };

  const removeSocialMedia = (index) => {
    if (socialMediaList.length > 1) {
      setSocialMediaList(socialMediaList.filter((_, idx) => idx !== index));
    }
  };

  const updateSocialMedia = (index, field, value) => {
    const updatedList = [...socialMediaList];
    updatedList[index][field] = value;
    setSocialMediaList(updatedList);
  };

  const [submitdraft] = useSubmitDraftMutation();
 
  const handleSubmit = async (values) => { 
    setLoading(true);
    
    try {
      const socialPlatformData = socialMediaList.filter(item => item.platform && item.url);
   console.log(fileList[0]?.originFileObj)
      const formData = new FormData();
      formData.append('draftContent', values?.draftContent);
      
      // Convert socialPlatformData to JSON string before appending
      formData.append('socialPlatform', JSON.stringify(socialPlatformData));

      // Make sure to append the actual file object
      if(fileList){
          formData.append('image', fileList[0]?.originFileObj); 
      }

      // Debug: Log FormData contents
      console.log('=== FORMDATA CONTENTS ===');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await submitdraft({ id, formData }).unwrap();
      console.log(res);

      if (res?.code === 200) {
        toast.success(res?.message);
        setTimeout(() => {
          router.push(`/dashboard/campaigns/details?id=${id}`);
        }, 1000);
      }
    } catch (error) {
      console.log('Submit error:', error);
      toast.error(error?.data?.message || 'Failed to submit draft');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'image',
    multiple: false,
    fileList,
    accept: 'image/*',
    beforeUpload: (file) => {
      console.log('Before upload - file:', file);
      
      // Validate file type
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      
      // Validate file size (5MB limit)
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }
      
      return false; // Prevent auto upload
    },
    onChange: (info) => {
      console.log('onChange - info:', info);
      const { fileList: newFileList } = info;
      
      // Keep only the last file and ensure it has the original file object
      const processedFileList = newFileList.slice(-1).map(file => {
        // Make sure we preserve the original file object
        if (file.originFileObj) {
          return file;
        } else if (file.file) {
          return { ...file, originFileObj: file.file };
        } else {
          return { ...file, originFileObj: file };
        }
      });
      
      setFileList(processedFileList);
    },
    onDrop: (e) => {
      console.log('Dropped files:', e.dataTransfer.files);
    },
    customRequest: ({ file, onSuccess }) => {
      // Custom request to handle file without uploading
      console.log('Custom request - file:', file);
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    },
  };

  const handleReset = () => {
    form.resetFields();
    setFileList([]);
    setSocialMediaList([{ platform: 'Instagram', url: '' }]);
    message.info('Form has been reset');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <BackButton />
        <div className="text-center mb-8">
          <Title level={1} className="!text-slate-800 !mb-2">
            Submit Campaign Draft
          </Title>
          <Text className="text-slate-600 text-lg">
            Create and submit your campaign draft with content and media
          </Text>
        </div>

        {/* Main Form Card */}
        <Card 
          className="shadow-xl border-0 !bg-white/80 backdrop-blur-sm"
          style={{ borderRadius: '16px' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            className="space-y-6"
          >
            {/* Draft Content */}
            <Form.Item
              name="draftContent"
              label={
                <span className="text-slate-700 font-semibold text-base">
                  Draft Content
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your draft content' },
                { min: 10, message: 'Content must be at least 10 characters' }
              ]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Enter your campaign content here..."
                className="!resize-none !border-slate-300 !rounded-lg focus:!border-blue-500 focus:!shadow-lg transition-all duration-200"
                showCount
                maxLength={500}
              />
            </Form.Item>

            {/* Social Platform */}
            <Form.Item
              label={
                <span className="text-slate-700 font-semibold text-base">
                  Social Media Profiles
                </span>
              }
              rules={[
                {
                  validator: () => {
                    const hasValidProfile = socialMediaList.some(item => item.platform && item.url);
                    return hasValidProfile 
                      ? Promise.resolve() 
                      : Promise.reject('Please add at least one social media profile');
                  }
                }
              ]}
            >
              <div className="w-full">
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
                      className="!border-slate-300 !rounded-lg focus:!border-blue-500"
                      options={[
                        { label: "Facebook", value: "Facebook" },
                        { label: "Instagram", value: "Instagram" },
                        { label: "TikTok", value: "TikTok" },
                        { label: "YouTube", value: "YouTube" },
                        { label: "Twitter", value: "Twitter" },
                        { label: "Snapchat", value: "Snapchat" },
                        { label: "LinkedIn", value: "LinkedIn" },
                        { label: "Pinterest", value: "Pinterest" },
                      ]}
                    />
                    <Input
                      placeholder="Enter profile URL"
                      value={item.url}
                      onChange={(e) => updateSocialMedia(idx, "url", e.target.value)}
                      className="md:w-[350px] w-[200px] !border-slate-300 !rounded-lg focus:!border-blue-500 focus:!shadow-lg transition-all duration-200"
                      allowClear
                    />
                    {socialMediaList.length > 1 && (
                      <Button 
                        danger 
                        onClick={() => removeSocialMedia(idx)}
                        type="text"
                        className="!text-red-500 hover:!text-red-600 hover:!bg-red-50 !rounded-lg transition-all duration-200"
                      >
                        Remove
                      </Button>
                    )}
                  </Space>
                ))}
                <Button 
                  type="dashed" 
                  onClick={addSocialMedia}
                  className="mt-2 w-full !border-slate-300 !text-slate-600 hover:!border-blue-400 hover:!text-blue-600 !rounded-lg transition-all duration-200"
                >
                  + Add Social Media Profile
                </Button>
              </div>
            </Form.Item>

            {/* Image Upload */}
            <Form.Item
              name="image"
              label={
                <span className="text-slate-700 font-semibold text-base">
                  Campaign Image
                </span>
              }
              rules={[
                {
                  validator: () => {
                    if (fileList.length === 0) {
                      return Promise.reject('Please upload an image');
                    }
                    const file = fileList[0];
                    const actualFile = file.originFileObj || file.file || file;
                    if (!actualFile || !actualFile.type || !actualFile.type.startsWith('image/')) {
                      return Promise.reject('Please upload a valid image file');
                    }
                    return Promise.resolve();
                  }
                }
              ]}
            >
              <Dragger 
                {...uploadProps} 
                className="!bg-slate-50/50 !border-2 !border-dashed !border-slate-300 !rounded-xl hover:!border-blue-400 hover:!bg-blue-50/30 transition-all duration-300"
              >
                <div className="py-8">
                  <InboxOutlined className="!text-4xl !text-slate-400 mb-4" />
                  <p className="text-xl font-medium text-slate-700 mb-2">
                    Click or drag image to upload
                  </p>
                  <p className="text-slate-500">
                    Support for single image upload • Max file size: 5MB
                  </p>
                  <p className="text-slate-400 text-sm mt-2">
                    Supported formats: JPG, PNG, GIF, WebP
                  </p>
                </div>
              </Dragger>
            </Form.Item>

            {/* Action Buttons */}
            <Form.Item className="!mb-0 !pt-4">
              <div className="flex justify-center gap-4">
                <Button
                  type="default"
                  size="large"
                  onClick={handleReset}
                  disabled={loading}
                  className="!min-w-32 !h-12 !rounded-lg !border-slate-300 hover:!border-slate-400 hover:!bg-slate-50 transition-all duration-200"
                >
                  Reset Form
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  className="!min-w-40 !h-12 !bg-gradient-to-r !from-blue-600 !to-blue-700 hover:!from-blue-700 hover:!to-blue-800 !border-0 !rounded-lg !shadow-lg hover:!shadow-xl transition-all duration-200"
                >
                  {loading ? 'Submitting...' : 'Submit Draft'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card> 
      </div>
    </div>
  );
};

export default SubmitDraftPage;