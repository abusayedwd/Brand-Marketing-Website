// // 'use client';

// // import { useState } from 'react';
// // import { Input, DatePicker, Button, Upload, message } from 'antd';
// // import { UploadOutlined } from '@ant-design/icons';
// // import { useRouter } from 'next/navigation';
// // import { MdArrowBackIosNew } from 'react-icons/md';
 

// // const { TextArea } = Input;

// // const CreateCampaign = () => {
// //   const [campaignName, setCampaignName] = useState('');
// //   const [eventDescription, setEventDescription] = useState('');
// //   const [budget, setBudget] = useState('');
// //   const [startDate, setStartDate] = useState(null);
// //   const [endDate, setEndDate] = useState(null);
// //   const [Influencers, setInfluencers] = useState([]);
// //   const [file, setFile] = useState(null);
 
// //   const router = useRouter();

// //   const handleUploadChange = (info) => {
// //     if (info.file.status === 'done') {
// //       message.success(`${info.file.name} file uploaded successfully`);
// //       setFile(info.file.originFileObj);
// //     } else if (info.file.status === 'error') {
// //       message.error(`${info.file.name} file upload failed.`);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     // Logic for submitting form data
// //     console.log({ campaignName, eventDescription, budget, startDate, endDate, Influencers, file });
// //   };

// //   return (
// //     <div className="p-8 max-w-4xl mx-auto">
// //       <h1 className="text-3xl flex items-center gap-2 font-semibold mb-4">
// //            <MdArrowBackIosNew
// //              onClick={() => router.push('/dashboard/campaigns')}
// //              className="cursor-pointer"
// //            />
// //         Create New Campaign
// //          </h1>

// //       <div className="space-y-6">
// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Campaign Name:</label>
// //           <Input
// //             className="w-2/3"
// //             value={campaignName}
// //             onChange={(e) => setCampaignName(e.target.value)}
// //             placeholder="Enter Campaign Name"
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Event Description:</label>
// //           <TextArea
// //             className="w-2/3"
// //             value={eventDescription}
// //             onChange={(e) => setEventDescription(e.target.value)}
// //             placeholder="Description"
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Budget:</label>
// //           <Input
// //             className="w-2/3"
// //             value={budget}
// //             onChange={(e) => setBudget(e.target.value)}
// //             placeholder="$1,200"
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Target Starting Date:</label>
// //           <DatePicker
// //             className="w-2/3"
// //             value={startDate}
// //             onChange={(date) => setStartDate(date)}
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Target Ending Date:</label>
// //           <DatePicker
// //             className="w-2/3"
// //             value={endDate}
// //             onChange={(date) => setEndDate(date)}
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Assign Influencers:</label>
// //           <Input
// //             className="w-2/3"
// //             value={Influencers.join(', ')}
// //             onChange={(e) => setInfluencers(e.target.value.split(','))}
// //             placeholder="Search Influencers"
// //           />
// //         </div>

// //         <div className="flex items-center space-x-4">
// //           <label className="w-1/3">Upload Album Image:</label>
// //           <Upload
// //             className="w-2/3"
// //             customRequest={handleUploadChange}
// //             showUploadList={false}
// //             accept=".jpg,.jpeg,.png"
// //           >
// //             <Button icon={<UploadOutlined />}>Upload Image</Button>
// //           </Upload>
// //         </div>

// //         <div className="flex justify-between">
// //           <div className="w-1/2">
// //             <label className="block">Add Influencersby Their Social Group:</label>
// //             <div className="flex space-x-4">
// //               <input type="checkbox" id="youtube" />
// //               <label htmlFor="youtube">YouTube</label>
// //               <input type="checkbox" id="tiktok" />
// //               <label htmlFor="tiktok">TikTok</label>
// //               <input type="checkbox" id="instagram" />
// //               <label htmlFor="instagram">Instagram</label>
// //               <input type="checkbox" id="twitter" />
// //               <label htmlFor="twitter">Twitter</label>
// //             </div>
// //           </div>

// //           <div className="w-1/2">
// //             <div className="border p-4 rounded-md">
// //               <h2 className="text-xl font-semibold">Payment Summary</h2>
// //               <p className="text-sm">Influencer Selected: {Influencers.length}</p>
// //               <p className="text-sm">Total Amount: ${budget}</p>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="flex justify-end mt-4">
// //           <Button
// //             className="bg-blue-600 text-white"
// //             onClick={handleSubmit}
// //           >
// //             Create Campaign
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateCampaign;


// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   Form, 
//   Input, 
//   DatePicker, 
//   Upload, 
//   Button, 
//   Card, 
//   Select, 
//   Checkbox, 
//   Avatar, 
//   Tag, 
//   Typography, 
//   Row, 
//   Col, 
//   Divider,
//   InputNumber,
//   Space,
//   List,
//   Badge
// } from 'antd';
// import { 
//   UploadOutlined, 
 
//   UserOutlined, 
//   DollarOutlined,
//   CalendarOutlined,
//   TeamOutlined,
//   PictureOutlined,
//   DeleteOutlined
// } from '@ant-design/icons';

// const { TextArea } = Input;
// const { Title, Text } = Typography;
// const { Option } = Select;

// const CampaignCreator = () => {
//   const [form] = Form.useForm();
//   const [formData, setFormData] = useState({
//     campaignName: '',
//     description: '',
//     budget: 0,
//     startDate: null,
//     endDate: null,
//     selectedPlatforms: [],
//     selectedInfluencers: [],
//     uploadedImage: null
//   });

 
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [fileList, setFileList] = useState([]);

//   const socialPlatforms = [
//     { 
//       id: 'tiktok', 
//       name: 'TikTok', 
//       color: '#000000',
//       icon: '🎵'
//     },
//     { 
//       id: 'facebook', 
//       name: 'Facebook', 
//       color: '#1877F2',
//       icon: '📘'
//     },
//     { 
//       id: 'instagram', 
//       name: 'Instagram', 
//       color: '#E4405F',
//       icon: '📸'
//     },
//     { 
//       id: 'youtube', 
//       name: 'YouTube', 
//       color: '#FF0000',
//       icon: '🎥'
//     },
//     { 
//       id: 'snapchat', 
//       name: 'Snapchat', 
//       color: '#FFFC00',
//       icon: '👻'
//     },
//     { 
//       id: 'twitter', 
//       name: 'Twitter', 
//       color: '#1DA1F2',
//       icon: '🐦'
//     }
//   ];

 

//   // Calculate total amount when budget or selected influencers change
//   useEffect(() => {
//     const budget = parseFloat(formData.budget) || 0;
//     const influencerCount = formData.selectedInfluencers.length;
//     const total = budget * influencerCount;
//     setTotalAmount(total);
//   }, [formData.budget, formData.selectedInfluencers]);

//   // Log to console whenever form data changes
//   useEffect(() => {
//     console.log('Campaign Form Data:', formData);
//     console.log('Total Amount:', totalAmount);
//     console.log('Selected Influencers Count:', formData.selectedInfluencers.length);
//     console.log('Selected Platforms:', formData.selectedPlatforms);
//   }, [formData, totalAmount]);

//   const handleFormChange = (changedValues, allValues) => {
//     setFormData(prev => ({
//       ...prev,
//       ...allValues
//     }));
//   };

//   const handlePlatformChange = (checkedValues) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedPlatforms: checkedValues
//     }));
//   };

//   const handleInfluencerToggle = (influencer) => {
//     setFormData(prev => {
//       const isSelected = prev.selectedInfluencers.some(inf => inf.id === influencer.id);
//       const newSelectedInfluencers = isSelected
//         ? prev.selectedInfluencers.filter(inf => inf.id !== influencer.id)
//         : [...prev.selectedInfluencers, influencer];
      
//       return {
//         ...prev,
//         selectedInfluencers: newSelectedInfluencers
//       };
//     });
//   };

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     if (newFileList.length > 0) {
//       const file = newFileList[0];
//       if (file.originFileObj) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setFormData(prev => ({
//             ...prev,
//             uploadedImage: e.target.result
//           }));
//         };
//         reader.readAsDataURL(file.originFileObj);
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         uploadedImage: null
//       }));
//     }
//   };

//   const handleCreateCampaign = () => {
//     form.validateFields()
//       .then(() => {
//         const campaignData = {
//           ...formData,
//           totalAmount,
//           influencerCount: formData.selectedInfluencers.length,
//           createdAt: new Date().toISOString()
//         };
        
//         console.log('Creating Campaign with Final Data:', campaignData);
        
//         // Show success message
//         alert('Campaign created successfully! Check console for details.');
        
//         // Reset form
//         form.resetFields();
//         setFormData({
//           campaignName: '',
//           description: '',
//           budget: 0,
//           startDate: null,
//           endDate: null,
//           selectedPlatforms: [],
//           selectedInfluencers: [],
//           uploadedImage: null
//         });
//         setFileList([]);
//       })
//       .catch((errorInfo) => {
//         console.log('Validation Failed:', errorInfo);
//       });
//   };

//   const uploadProps = {
//     fileList,
//     onChange: handleUploadChange,
//     beforeUpload: () => false, // Prevent auto upload
//     accept: 'image/*',
//     maxCount: 1,
//     listType: 'picture-card',
//     className: 'w-full'
//   };

//   const getPlatformColor = (platformId) => {
//     const platform = socialPlatforms.find(p => p.id === platformId);
//     return platform ? platform.color : '#1890ff';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <Title level={2} className="!mb-2">
//             Create New Campaign
//           </Title>
//           <Text type="secondary" className="text-base">
//             Set up your influencer marketing campaign with detailed targeting and budget planning
//           </Text>
//         </div>

//         <Row gutter={[24, 24]}>
//           {/* Main Form Column */}
//           <Col xs={24} lg={16}>
//             <Form
//               form={form}
//               layout="vertical"
//               onValuesChange={handleFormChange}
//               className="space-y-6"
//             >
//               {/* Campaign Details Card */}
//               <Card 
//                 title={
//                   <Space>
//                     <TeamOutlined className="text-blue-600" />
//                     Campaign Details
//                   </Space>
//                 }
//                 className="shadow-sm"
//               >
//                 <Row gutter={16}>
//                   <Col xs={24}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
//                       <Input 
//                         placeholder="Enter Campaign Name"
//                         size="large"
//                         className="rounded-lg"
//                         value={formData.campaignName}
//                         onChange={(e) => setFormData(prev => ({...prev, campaignName: e.target.value}))}
//                       />
//                     </div>
//                   </Col>
                  
//                   <Col xs={24}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
//                       <TextArea
//                         placeholder="Describe your campaign goals, target audience, and requirements"
//                         rows={4}
//                         className="rounded-lg"
//                         value={formData.description}
//                         onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
//                       />
//                     </div>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Budget per Influencer ($)</label>
//                       <InputNumber
//                         placeholder="0.00"
//                         min={0}
//                         step={0.01}
//                         size="large"
//                         className="w-full rounded-lg"
//                         prefix={<DollarOutlined />}
//                         value={formData.budget}
//                         onChange={(value) => setFormData(prev => ({...prev, budget: value || 0}))}
//                       />
//                     </div>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
//                       <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
//                         <Text strong className="text-lg text-blue-700">
//                           ${totalAmount.toFixed(2)}
//                         </Text>
//                         <Text type="secondary" className="ml-2">
//                           ({formData.selectedInfluencers.length} influencer{formData.selectedInfluencers.length !== 1 ? 's' : ''})
//                         </Text>
//                       </div>
//                     </div>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Target Starting Date"
//                       name="startDate"
//                       rules={[{ required: true, message: 'Please select start date' }]}
//                     >
//                       <DatePicker 
//                         size="large"
//                         className="w-full rounded-lg"
//                         suffixIcon={<CalendarOutlined />}
//                       />
//                     </Form.Item>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <Form.Item
//                       label="Target Ending Date"
//                       name="endDate"
//                       rules={[{ required: true, message: 'Please select end date' }]}
//                     >
//                       <DatePicker 
//                         size="large"
//                         className="w-full rounded-lg"
//                         suffixIcon={<CalendarOutlined />}
//                       />
//                     </Form.Item>
//                   </Col>
//                 </Row>
//               </Card>

//               {/* Image Upload Card */}
//               <Card 
//                 title={
//                   <Space>
//                     <PictureOutlined className="text-blue-600" />
//                     Upload Album Image
//                   </Space>
//                 }
//                 className="shadow-sm"
//               >
//                 <Upload {...uploadProps}>
//                   {fileList.length === 0 && (
//                     <div className="text-center p-8">
//                       <UploadOutlined className="text-4xl text-gray-400 mb-4" />
//                       <div className="text-gray-600 mb-2">
//                         Choose a file or drag & drop it here
//                       </div>
//                       <div className="text-sm text-gray-400 mb-4">
//                         JPG, PNG, or GIF, up to 10MB
//                       </div>
//                     </div>
//                   )}
//                 </Upload>
//               </Card>

//               {/* Social Media Platforms */}
//               <Card 
//                 title="Social Media Platforms"
//                 className="shadow-sm"
//               >
//                 <Checkbox.Group 
//                   value={formData.selectedPlatforms}
//                   onChange={handlePlatformChange}
//                   className="w-full"
//                 >
//                   <Row gutter={[16, 16]}>
//                     {socialPlatforms.map((platform) => (
//                       <Col xs={12} sm={8} md={6} key={platform.id}>
//                         <Checkbox value={platform.id} className="w-full">
//                           <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
//                             <span className="text-lg">{platform.icon}</span>
//                             <span className="font-medium">{platform.name}</span>
//                           </div>
//                         </Checkbox>
//                       </Col>
//                     ))}
//                   </Row>
//                 </Checkbox.Group>
//               </Card>
 
//             </Form>
//           </Col>

//           {/* Payment Summary Sidebar */}
//           <Col xs={24} lg={8}>
//             <div className="sticky top-6">
//               <Card 
//                 title="Payment Summary"
//                 className="shadow-sm"
//               >
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <Text type="secondary">Influencers Selected</Text>
//                     <Text strong>{formData.selectedInfluencers.length}</Text>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <Text type="secondary">Budget per Influencer</Text>
//                     <Text strong>${formData.budget || '0.00'}</Text>
//                   </div>
                  
//                   <div className="flex justify-between items-center">
//                     <Text type="secondary">Platforms Selected</Text>
//                     <Text strong>{formData.selectedPlatforms.length}</Text>
//                   </div>
                  
//                   <Divider />
                  
//                   <div className="flex justify-between items-center">
//                     <Title level={4} className="!mb-0">Total Amount</Title>
//                     <Title level={4} className="!mb-0 !text-blue-600">
//                       ${totalAmount.toFixed(2)}
//                     </Title>
//                   </div>

//                   {formData.selectedInfluencers.length > 0 && (
//                     <div className="mt-4">
//                       <Text type="secondary" className="block mb-2">Selected Influencers:</Text>
//                       <div className="space-y-2 max-h-32 overflow-y-auto">
//                         {formData.selectedInfluencers.map((influencer) => (
//                           <div key={influencer.id} className="flex items-center justify-between text-sm">
//                             <span>{influencer.name}</span>
//                             <Button
//                               type="text"
//                               size="small"
//                               icon={<DeleteOutlined />}
//                               onClick={() => handleInfluencerToggle(influencer)}
//                               className="text-red-500 hover:text-red-700"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <Button
//                     type="primary"
//                     size="large"
//                     block
//                     onClick={handleCreateCampaign}
//                     className="mt-6 h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 rounded-lg"
//                   >
//                     Create Campaign
//                   </Button>
//                 </div>
//               </Card>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default CampaignCreator;




"use client";

import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  DatePicker, 
  Upload, 
  Button, 
  Card, 
  Select, 
  Checkbox, 
  Avatar, 
  Tag, 
  Typography, 
  Row, 
  Col, 
  Divider,
  InputNumber,
  Space,
  List,
  Badge
} from 'antd';
import { 
  UploadOutlined, 
  UserOutlined, 
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined,
  PictureOutlined,
  DeleteOutlined,
  StarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useCreateCampaignMutation } from '@/redux/fetures/campaign/createCampaign';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const CampaignCreator = () => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    campaignName: '',
    description: '',
    budget: 0,
    startDate: null,
    endDate: null,
    selectedPlatforms: [],
    influencerCount: 1,
    uploadedImageFile: null,
    uploadedImageName: null,
    uploadedImagePreview: null
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [fileList, setFileList] = useState([]);

 const [createCampaign, {isLoading}] = useCreateCampaignMutation()


  const socialPlatforms = [
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      color: '#000000',
      icon: '🎵'
    },
    { 
      id: 'facebook', 
      name: 'Facebook', 
      color: '#1877F2',
      icon: '📘'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      color: '#E4405F',
      icon: '📸'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      color: '#FF0000',
      icon: '🎥'
    },
    { 
      id: 'snapchat', 
      name: 'Snapchat', 
      color: '#FFFC00',
      icon: '👻'
    },
    { 
      id: 'twitter', 
      name: 'Twitter', 
      color: '#1DA1F2',
      icon: '🐦'
    }
  ];

  // Calculate total amount when budget or influencer count changes
  useEffect(() => {
    const budget = parseFloat(formData.budget) || 0;
    const influencerCount = formData.influencerCount || 1;
    const total = budget * influencerCount;
    setTotalAmount(total);
    
    console.log('Total Amount:', total);
  }, [formData.budget, formData.influencerCount]);

  // Log to console whenever form data changes
  useEffect(() => {
    console.log('Campaign Form Data:', formData);
    console.log('Total Amount:', totalAmount);
    console.log('Influencer Count:', formData.influencerCount);
    console.log('Selected Platforms:', formData.selectedPlatforms);
    
    // Log date strings when they change
    if (formData.startDate || formData.endDate) {
      console.log('=== CURRENT DATE VALUES ===');
      console.log('Start Date String:', formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null);
      console.log('End Date String:', formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null);
    }
  }, [formData, totalAmount]);

  const handleFormChange = (changedValues, allValues) => {
    setFormData(prev => ({
      ...prev,
      ...allValues
    }));
  };

  const handlePlatformChange = (checkedValues) => {
    setFormData(prev => ({
      ...prev,
      selectedPlatforms: checkedValues
    }));
  };

  const handleInfluencerCountChange = (value) => {
    setFormData(prev => ({
      ...prev,
      influencerCount: value || 1
    }));
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0];
      if (file.originFileObj) {
        // Store the actual file object for FormData
        setFormData(prev => ({
          ...prev,
          uploadedImageFile: file.originFileObj,
          uploadedImageName: file.name
        }));
        
        // Also create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            uploadedImagePreview: e.target.result
          }));
        };
        reader.readAsDataURL(file.originFileObj);
        
        console.log('File uploaded:', {
          name: file.name,
          size: file.size,
          type: file.type,
          file: file.originFileObj
        });
      }
    } else {
      setFormData(prev => ({
        ...prev,
        uploadedImageFile: null,
        uploadedImageName: null,
        uploadedImagePreview: null
      }));
    }
  };

  const startDate = (date, dateString) => {
    console.log('Start Date Selected:',dateString);
   setFormData(date, dateString);
};
  const endDate = (date, dateString) => {
    console.log('Start Date Selected:',dateString);
   setFormData(date, dateString);
};

  const handleCreateCampaign = async () => {
    if (!formData.campaignName || formData.influencerCount < 1) {
      alert('Please fill in campaign name and select at least one influencer');
      return;
    }
    
    try {
      // Create FormData for file upload
      const backendFormData = new FormData();
      
      // Add all form fields to FormData
      backendFormData.append('campaignName', formData.campaignName);
      backendFormData.append('description', formData.description || '');
      backendFormData.append('budget', formData.budget.toString());
      backendFormData.append('influencerCount', formData.influencerCount.toString());
      backendFormData.append('totalAmount', totalAmount.toString());
      backendFormData.append('selectedPlatforms', JSON.stringify(formData.selectedPlatforms));
      
      // Add dates if they exist (convert to string format)
      const startDateString = formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null;
      const endDateString = formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null;
      
      if (startDateString) {
        backendFormData.append('startDate', startDateString);
      }
      if (endDateString) {
        backendFormData.append('endDate', endDateString);
      }
      
      // Log date strings specifically
      console.log('=== DATE VALUES ===');
      console.log('Start Date String:', startDateString);
      console.log('End Date String:', endDateString);
      console.log('Start Date Object:', formData.startDate);
      console.log('End Date Object:', formData.endDate);
      
      // Add image file if uploaded
      if (formData.uploadedImageFile) {
        backendFormData.append('campaignImage', formData.uploadedImageFile);
      }
      
      // Add creation timestamp
      backendFormData.append('createdAt', new Date().toISOString());
      
      // Log FormData contents (for debugging)
      console.log('=== FORM DATA FOR BACKEND ===');
      for (let [key, value] of backendFormData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            name: value.name,
            size: value.size,
            type: value.type,
            lastModified: value.lastModified
          });
        } else {
          console.log(`${key}:`, value);
        }
      }
      
      // Log regular form data object (for reference)
      console.log('=== REGULAR FORM DATA ===', {
        ...formData,
        startDateString: formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null,
        endDateString: formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null,
        totalAmount,
        createdAt: new Date().toISOString()
      });
      
      // Send to backend API
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        body: backendFormData, // Don't set Content-Type header, let browser set it
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Campaign created successfully:', result);
        alert('Campaign created successfully!');
        
        // Reset form after successful submission
        resetForm();
      } else {
        const error = await response.text();
        console.error('Failed to create campaign:', error);
        alert('Failed to create campaign. Please try again.');
      }
      
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign. Please check your connection and try again.');
    }
  };
  
  const resetForm = () => {
    setFormData({
      campaignName: '',
      description: '',
      budget: 0,
      startDate: null,
      endDate: null,
      selectedPlatforms: [],
      influencerCount: 1,
      uploadedImageFile: null,
      uploadedImageName: null,
      uploadedImagePreview: null
    });
    setFileList([]);
    form.resetFields();
  };

  const uploadProps = {
    fileList,
    onChange: handleUploadChange,
    beforeUpload: () => false,
    accept: 'image/*',
    maxCount: 1,
    listType: 'picture-card',
    className: 'w-full'
  };

  const getPlatformIcon = (platformId) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    return platform ? platform.icon : '📱';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="!mb-2">
            Create New Campaign
          </Title>
          <Text type="secondary" className="text-base">
            Set up your influencer marketing campaign with detailed targeting and budget planning
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {/* Main Form Column */}
          <Col xs={24} lg={16}>
            <div className="space-y-6">
              {/* Campaign Details Card */}
              <Card 
                title={
                  <Space>
                    <TeamOutlined className="text-blue-600" />
                    Campaign Details
                  </Space>
                }
                className="shadow-sm"
              >
                <Row gutter={16}>
                  <Col xs={24}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                      <Input 
                        placeholder="Enter Campaign Name"
                        size="large"
                        className="rounded-lg"
                        value={formData.campaignName}
                        onChange={(e) => setFormData(prev => ({...prev, campaignName: e.target.value}))}
                      />
                    </div>
                  </Col>
                  
                  <Col xs={24}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Event Description</label>
                      <TextArea
                        placeholder="Describe your campaign goals, target audience, and requirements"
                        rows={4}
                        className="rounded-lg"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Budget per Influencer ($)</label>
                      <InputNumber
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                        size="large"
                        className="w-full rounded-lg"
                        prefix={<DollarOutlined />}
                        value={formData.budget}
                        onChange={(value) => setFormData(prev => ({...prev, budget: value || 0}))}
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</label>
                      <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                        <Text strong className="text-lg text-blue-700">
                          ${totalAmount.toFixed(2)}
                        </Text>
                        <Text type="secondary" className="ml-2">
                          ({formData.influencerCount} influencer{formData.influencerCount !== 1 ? 's' : ''})
                        </Text>
                      </div>
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <DatePicker
                        size="large"
                        className="w-full rounded-lg"
                        placeholder="Select start date"
                        value={formData.startDate}
                        onChange={(dateString) => setFormData(prev => ({...prev, startDate: dateString}))}
                      //  onChange={startDate}
                      />
                    </div>
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <DatePicker
                        size="large"
                        className="w-full rounded-lg"
                        placeholder="Select end date"
                        value={formData.endDate}
                        onChange={(dateString) => setFormData(prev => ({...prev, endDate: dateString}))}
                        //  onChange={endDate}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>

              {/* Platform Selection Card */}
              <Card 
                title={
                  <Space>
                    <PictureOutlined className="text-green-600" />
                    Select Platforms
                  </Space>
                }
                className="shadow-sm"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {socialPlatforms.map(platform => (
                    <div key={platform.id} className="flex items-center space-x-2">
                      <Checkbox
                        value={platform.id}
                        checked={formData.selectedPlatforms.includes(platform.id)}
                        onChange={() => {
                          const isSelected = formData.selectedPlatforms.includes(platform.id);
                          const newPlatforms = isSelected
                            ? formData.selectedPlatforms.filter(p => p !== platform.id)
                            : [...formData.selectedPlatforms, platform.id];
                          handlePlatformChange(newPlatforms);
                        }}
                      >
                        <Space>
                          <span className="text-lg">{platform.icon}</span>
                          <span>{platform.name}</span>
                        </Space>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Influencer Count Selection Card */}
              <Card 
                title={
                  <Space>
                    <UserOutlined className="text-purple-600" />
                    Select Number of Influencers
                    <Badge count={formData.influencerCount} className="ml-2" />
                  </Space>
                }
                className="shadow-sm"
              >
                <div className="flex flex-col items-center space-y-6">
                  {/* Number Input */}
                  <div className="w-full max-w-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                      How many influencers do you want to hire?
                    </label>
                    <InputNumber
                      min={1}
                      max={5}
                      size="large"
                      className="w-full rounded-lg text-center"
                      value={formData.influencerCount}
                      onChange={handleInfluencerCountChange}
                      style={{ textAlign: 'center', fontSize: '18px' }}
                    />
                    <Text type="secondary" className="block text-center mt-2">
                      Minimum: 1 influencer | Maximum: 5 influencers
                    </Text>
                  </div>

                  {/* Visual Counter */}
                  <div className="flex items-center space-x-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div
                        key={num}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all cursor-pointer ${
                          num <= formData.influencerCount
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-gray-100 text-gray-400 border-gray-300'
                        }`}
                        onClick={() => handleInfluencerCountChange(num)}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <Text>Cost per influencer:</Text>
                      <Text strong>${formData.budget.toFixed(2)}</Text>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <Text>Number of influencers:</Text>
                      <Text strong>{formData.influencerCount}</Text>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between items-center">
                      <Text strong>Total cost:</Text>
                      <Text strong className="text-blue-600 text-lg">
                        ${totalAmount.toFixed(2)}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Image Upload Card */}
              <Card 
                title={
                  <Space>
                    <PictureOutlined className="text-orange-600" />
                    Campaign Image
                  </Space>
                }
                className="shadow-sm"
              >
                <Upload {...uploadProps}>
                  <div className="text-center">
                    <PictureOutlined className="text-4xl text-gray-400 mb-2" />
                    <div className="ant-upload-text">Click or drag file to upload</div>
                    <div className="ant-upload-hint">Support for single image upload (JPG, PNG, GIF)</div>
                  </div>
                </Upload>
                
                {/* Show uploaded file info */}
                {formData.uploadedImageFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircleOutlined className="text-green-500" />
                      <div>
                        <Text strong className="text-green-700">File Ready for Upload</Text>
                        <div className="text-sm text-gray-600">
                          <div>Name: {formData.uploadedImageName}</div>
                          <div>Size: {(formData.uploadedImageFile.size / 1024 / 1024).toFixed(2)} MB</div>
                          <div>Type: {formData.uploadedImageFile.type}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Create Campaign Button */}
              <div className="flex justify-end">
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleCreateCampaign}
                  className="px-8"
                  disabled={!formData.campaignName || formData.influencerCount < 1}
                >
                  Create Campaign
                </Button>
              </div>
            </div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <div className="sticky top-6">
              <Card 
                title="Campaign Summary"
                className="shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Text type="secondary">Number of Influencers:</Text>
                    <Text strong>{formData.influencerCount}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text type="secondary">Budget per Influencer:</Text>
                    <Text strong>${formData.budget.toFixed(2)}</Text>
                  </div>
                  <Divider className="my-3" />
                  <div className="flex justify-between text-lg">
                    <Text strong>Total Campaign Cost:</Text>
                    <Text strong className="text-blue-600">${totalAmount.toFixed(2)}</Text>
                  </div>
                  
                  {formData.selectedPlatforms.length > 0 && (
                    <>
                      <Divider className="my-3" />
                      <div>
                        <Text strong className="block mb-2">Selected Platforms:</Text>
                        <div className="flex flex-wrap gap-2">
                          {formData.selectedPlatforms.map(platformId => (
                            <Tag key={platformId} color="blue">
                              <Space>
                                <span>{getPlatformIcon(platformId)}</span>
                                <span>{socialPlatforms.find(p => p.id === platformId)?.name}</span>
                              </Space>
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {formData.uploadedImageFile && (
                    <>
                      <Divider className="my-3" />
                      <div>
                        <Text strong className="block mb-2">Campaign Image:</Text>
                        <div className="flex items-center space-x-2">
                          <PictureOutlined className="text-blue-500" />
                          <Text className="text-sm">{formData.uploadedImageName}</Text>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CampaignCreator;