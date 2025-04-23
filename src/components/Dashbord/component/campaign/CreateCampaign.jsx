'use client';

import { useState } from 'react';
import { Input, DatePicker, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { MdArrowBackIosNew } from 'react-icons/md';
 

const { TextArea } = Input;

const CreateCampaign = () => {
  const [campaignName, setCampaignName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [file, setFile] = useState(null);
 
  const router = useRouter();

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setFile(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleSubmit = () => {
    // Logic for submitting form data
    console.log({ campaignName, eventDescription, budget, startDate, endDate, influencers, file });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl flex items-center gap-2 font-semibold mb-4">
           <MdArrowBackIosNew
             onClick={() => router.push('/dashboard/campaigns')}
             className="cursor-pointer"
           />
        Create New Campaign
         </h1>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <label className="w-1/3">Campaign Name:</label>
          <Input
            className="w-2/3"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Enter Campaign Name"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Event Description:</label>
          <TextArea
            className="w-2/3"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Description"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Budget:</label>
          <Input
            className="w-2/3"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="$1,200"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Target Starting Date:</label>
          <DatePicker
            className="w-2/3"
            value={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Target Ending Date:</label>
          <DatePicker
            className="w-2/3"
            value={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Assign Influencers:</label>
          <Input
            className="w-2/3"
            value={influencers.join(', ')}
            onChange={(e) => setInfluencers(e.target.value.split(','))}
            placeholder="Search influencers"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="w-1/3">Upload Album Image:</label>
          <Upload
            className="w-2/3"
            customRequest={handleUploadChange}
            showUploadList={false}
            accept=".jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </div>

        <div className="flex justify-between">
          <div className="w-1/2">
            <label className="block">Add Influencers by Their Social Group:</label>
            <div className="flex space-x-4">
              <input type="checkbox" id="youtube" />
              <label htmlFor="youtube">YouTube</label>
              <input type="checkbox" id="tiktok" />
              <label htmlFor="tiktok">TikTok</label>
              <input type="checkbox" id="instagram" />
              <label htmlFor="instagram">Instagram</label>
              <input type="checkbox" id="twitter" />
              <label htmlFor="twitter">Twitter</label>
            </div>
          </div>

          <div className="w-1/2">
            <div className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold">Payment Summary</h2>
              <p className="text-sm">Influencer Selected: {influencers.length}</p>
              <p className="text-sm">Total Amount: ${budget}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="bg-blue-600 text-white"
            onClick={handleSubmit}
          >
            Create Campaign
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
