
 
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
//   Badge,
//   Spin
// } from 'antd';
// import { 
//   UploadOutlined, 
//   UserOutlined, 
//   DollarOutlined,
//   CalendarOutlined,
//   TeamOutlined,
//   PictureOutlined,
//   DeleteOutlined,
//   StarOutlined,
//   CheckCircleOutlined,
//   EditOutlined
// } from '@ant-design/icons';
 
// import toast, { Toaster } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import dayjs from 'dayjs';
// import { useUpdateCampaignMutation } from '@/redux/fetures/campaign/updateCampaign';
// import { useGetSingleCampaignQuery } from '@/redux/fetures/campaign/getSingleCampaign';
// import url from '@/redux/api/baseUrl';

// const { TextArea } = Input;
// const { Title, Text } = Typography;
// const { Option } = Select;

// const EditCampaign = () => {

//      const [id, setId] = useState('');
//       console.log(id)
 
//     useEffect(() => {
//       const params = new URLSearchParams(window.location.search);
//       setId(params.get('id') || '');
//     }, []); 

//    const {data: campaign} = useGetSingleCampaignQuery(id)
 

// const campaignData = campaign?.data?.attributes;

//   const router = useRouter();

//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     campaignName: '',
//     description: '',
//     budget: 0,
//     startDate: null,
//     endDate: null,
//     selectedPlatforms: [],
//     influencerCount: 1,
//     image: null,
//     uploadedImageName: null,
//     uploadedImagePreview: null,
//     uploadedImageFile: null
//   });

//   const [totalAmount, setTotalAmount] = useState(0);
//   const [fileList, setFileList] = useState([]);

//   const [updateCampaign, { isLoading }] = useUpdateCampaignMutation();

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

//   // Initialize form with existing campaign data
//   useEffect(() => {
//     if (campaignData) {
//       const defaultFormData = {
//         campaignName: campaignData.campaignName || '',
//         description: campaignData.description || '',
//         budget: campaignData.budget || 0,
//         startDate: campaignData.startDate ? dayjs(campaignData.startDate) : null,
//         endDate: campaignData.endDate ? dayjs(campaignData.endDate) : null,
//         selectedPlatforms: campaignData.selectedPlatforms || [],
//         influencerCount: campaignData.influencerCount || 1,
//         image:url + campaignData.image || null,
//         uploadedImageName: campaignData.imageName || null,
//         uploadedImagePreview: campaignData.imageUrl || null,
//         uploadedImageFile: null
//       };

//       setFormData(defaultFormData);

//       // Set form fields
//       form.setFieldsValue({
//         campaignName: defaultFormData.campaignName,
//         description: defaultFormData.description,
//         budget: defaultFormData.budget,
//         startDate: defaultFormData.startDate,
//         endDate: defaultFormData.endDate,
//         influencerCount: defaultFormData.influencerCount,
//       });

//       // Set existing image in fileList if available
//       if (campaignData.image) {
//         setFileList([{
//           uid: '-1',
//           name: campaignData.imageName || 'campaign-image',
//           status: 'done',
//           url: url + campaignData.image,
//         }]);
//       }
//     }
//   }, [campaignData, form]);

//   // Calculate total amount when budget or influencer count changes
//   useEffect(() => {
//     const budget = parseFloat(formData.budget) || 0;
//     const influencerCount = formData.influencerCount || 1;
//     const total = budget * influencerCount;
//     setTotalAmount(total);
    
//     console.log('Total Amount:', total);
//   }, [formData.budget, formData.influencerCount]);

//   // Log to console whenever form data changes
//   useEffect(() => {
//     console.log('Edit Campaign Form Data:', formData);
//     console.log('Total Amount:', totalAmount);
//     console.log('Influencer Count:', formData.influencerCount);
//     console.log('Selected Platforms:', formData.selectedPlatforms);
    
//     // Log date strings when they change
//     if (formData.startDate || formData.endDate) {
//       console.log('=== CURRENT DATE VALUES ===');
//       console.log('Start Date String:', formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null);
//       console.log('End Date String:', formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null);
//     }
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

//   const handleInfluencerCountChange = (value) => {
//     setFormData(prev => ({
//       ...prev,
//       influencerCount: value || 1
//     }));
//   };

//   const handleUploadChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//     if (newFileList.length > 0) {
//       const file = newFileList[0];
//       if (file.originFileObj) {
//         // Store the actual file object for FormData
//         setFormData(prev => ({
//           ...prev,
//           uploadedImageFile: file.originFileObj,
//           uploadedImageName: file.name
//         }));
        
//         // Also create preview URL
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           setFormData(prev => ({
//             ...prev,
//             uploadedImagePreview: e.target.result
//           }));
//         };
//         reader.readAsDataURL(file.originFileObj);
        
//         console.log('File uploaded:', {
//           name: file.name,
//           size: file.size,
//           type: file.type,
//           file: file.originFileObj
//         });
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         uploadedImageFile: null,
//         uploadedImageName: null,
//         uploadedImagePreview: null
//       }));
//     }
//   }; 

//   const handleUpdateCampaign = async () => {
//     if (!formData.campaignName || formData.influencerCount < 1) {
//       toast.error('Please fill in campaign name and select at least one influencer');
//       return;
//     }

//     console.log('Updating campaign with data:', formData);
    
//     try {
//       setLoading(true);
      
//       // Create FormData for file upload
//       const backendFormData = new FormData();
      
//       // Add campaign ID
      
      
//       // Add all form fields to FormData
//       backendFormData.append('campaignName', formData.campaignName);
//       backendFormData.append('description', formData.description || '');
//       backendFormData.append('budget', formData.budget.toString());
//       backendFormData.append('influencerCount', formData.influencerCount.toString());
//       backendFormData.append('totalAmount', totalAmount.toString());
//       backendFormData.append('selectedPlatforms', JSON.stringify(formData.selectedPlatforms));
      
//       // Add dates if they exist (convert to string format)
//       const startDateString = formData.startDate ? formData.startDate.format('YYYY-MM-DD') : null;
//       const endDateString = formData.endDate ? formData.endDate.format('YYYY-MM-DD') : null;
      
//       if (startDateString) {
//         backendFormData.append('startDate', startDateString);
//       }
//       if (endDateString) {
//         backendFormData.append('endDate', endDateString);
//       }
      
//       // Add image file if a new one was uploaded
//       if (formData.uploadedImageFile) {
//         backendFormData.append('image', formData.uploadedImageFile);
//       }
      
//       const res = await updateCampaign({backendFormData, id}).unwrap();
//       console.log('Update response:', res);
      
//       if (res.success === true) {
//         toast.success(res?.message);
//         setTimeout(() => {
//           router.push("/dashboard/campaigns");
//         }, 2000);
//       } else {
//         toast.error(res.message || "Failed to update campaign");
//       }
      
//     } catch (error) {
//       console.error('Update error:', error);
//       toast.error(error?.data?.message || "An error occurred while updating the campaign");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     if (campaignData) {
//       const defaultFormData = {
//         campaignName: campaignData.campaignName || '',
//         description: campaignData.description || '',
//         budget: campaignData.budget || 0,
//         startDate: campaignData.startDate ? dayjs(campaignData.startDate) : null,
//         endDate: campaignData.endDate ? dayjs(campaignData.endDate) : null,
//         selectedPlatforms: campaignData.selectedPlatforms || [],
//         influencerCount: campaignData.influencerCount || 1,
//         uploadedImageFile: null,
//         uploadedImageName: campaignData.imageName || null,
//         uploadedImagePreview: campaignData.imageUrl || null
//       };
      
//       setFormData(defaultFormData);
//       form.setFieldsValue(defaultFormData);
      
//       // Reset file list
//       if (campaignData.imageUrl) {
//         setFileList([{
//           uid: '-1',
//           name: campaignData.imageName || 'campaign-image',
//           status: 'done',
//           url: campaignData.imageUrl,
//         }]);
//       } else {
//         setFileList([]);
//       }
//     }
//   };

//   const uploadProps = {
//     fileList,
//     onChange: handleUploadChange,
//     beforeUpload: () => false,
//     accept: 'image/*',
//     maxCount: 1,
//     listType: 'picture-card',
//     className: 'w-full'
//   };

//   const getPlatformIcon = (platformId) => {
//     const platform = socialPlatforms.find(p => p.id === platformId);
//     return platform ? platform.icon : '📱';
//   };

//   if (!campaignData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <Toaster />
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <Title level={2} className="!mb-2">
//             <EditOutlined className="text-blue-600 mr-2" />
//             Edit Campaign
//           </Title>
//           <Text type="secondary" className="text-base">
//             Update your influencer marketing campaign details
//           </Text>
//         </div>

//         <Row gutter={[24, 24]}>
//           {/* Main Form Column */}
//           <Col xs={24} lg={16}>
//             <div className="space-y-6">
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
//                           ({formData.influencerCount} influencer{formData.influencerCount !== 1 ? 's' : ''})
//                         </Text>
//                       </div>
//                     </div>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
//                       <DatePicker
//                         size="large"
//                         className="w-full rounded-lg"
//                         placeholder="Select start date"
//                         value={formData.startDate}
//                         onChange={(dateString) => setFormData(prev => ({...prev, startDate: dateString}))}
//                       />
//                     </div>
//                   </Col>

//                   <Col xs={24} md={12}>
//                     <div className="mb-6">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
//                       <DatePicker
//                         size="large"
//                         className="w-full rounded-lg"
//                         placeholder="Select end date"
//                         value={formData.endDate}
//                         onChange={(dateString) => setFormData(prev => ({...prev, endDate: dateString}))}
//                       />
//                     </div>
//                   </Col>
//                 </Row>
//               </Card>

//               {/* Platform Selection Card */}
//               <Card 
//                 title={
//                   <Space>
//                     <PictureOutlined className="text-green-600" />
//                     Select Platforms
//                   </Space>
//                 }
//                 className="shadow-sm"
//               >
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                   {socialPlatforms.map(platform => (
//                     <div key={platform.id} className="flex items-center space-x-2">
//                       <Checkbox
//                         value={platform.id}
//                         checked={formData.selectedPlatforms.includes(platform.id)}
//                         onChange={() => {
//                           const isSelected = formData.selectedPlatforms.includes(platform.id);
//                           const newPlatforms = isSelected
//                             ? formData.selectedPlatforms.filter(p => p !== platform.id)
//                             : [...formData.selectedPlatforms, platform.id];
//                           handlePlatformChange(newPlatforms);
//                         }}
//                       >
//                         <Space>
//                           <span className="text-lg">{platform.icon}</span>
//                           <span>{platform.name}</span>
//                         </Space>
//                       </Checkbox>
//                     </div>
//                   ))}
//                 </div>
//               </Card>

//               {/* Influencer Count Selection Card */}
//               <Card 
//                 title={
//                   <Space>
//                     <UserOutlined className="text-purple-600" />
//                     Select Number of Influencers
//                     <Badge count={formData.influencerCount} className="ml-2" />
//                   </Space>
//                 }
//                 className="shadow-sm"
//               >
//                 <div className="flex flex-col items-center space-y-6">
//                   {/* Number Input */}
//                   <div className="w-full max-w-md">
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
//                       How many influencers do you want to hire?
//                     </label>
//                     <InputNumber
//                       min={1}
//                       max={5}
//                       size="large"
//                       className="w-full rounded-lg text-center"
//                       value={formData.influencerCount}
//                       onChange={handleInfluencerCountChange}
//                       style={{ textAlign: 'center', fontSize: '18px' }}
//                     />
//                     <Text type="secondary" className="block text-center mt-2">
//                       Minimum: 1 influencer | Maximum: 5 influencers
//                     </Text>
//                   </div>

//                   {/* Visual Counter */}
//                   <div className="flex items-center space-x-3">
//                     {[1, 2, 3, 4, 5].map((num) => (
//                       <div
//                         key={num}
//                         className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all cursor-pointer ${
//                           num <= formData.influencerCount
//                             ? 'bg-blue-500 text-white border-blue-500'
//                             : 'bg-gray-100 text-gray-400 border-gray-300'
//                         }`}
//                         onClick={() => handleInfluencerCountChange(num)}
//                       >
//                         {num}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Cost Breakdown */}
//                   <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg">
//                     <div className="flex justify-between items-center mb-2">
//                       <Text>Cost per influencer:</Text>
//                       <Text strong>${formData.budget.toFixed(2)}</Text>
//                     </div>
//                     <div className="flex justify-between items-center mb-2">
//                       <Text>Number of influencers:</Text>
//                       <Text strong>{formData.influencerCount}</Text>
//                     </div>
//                     <Divider className="my-2" />
//                     <div className="flex justify-between items-center">
//                       <Text strong>Total cost:</Text>
//                       <Text strong className="text-blue-600 text-lg">
//                         ${totalAmount.toFixed(2)}
//                       </Text>
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               {/* Image Upload Card */}
//               <Card 
//                 title={
//                   <Space>
//                     <PictureOutlined className="text-orange-600" />
//                     Campaign Image
//                   </Space>
//                 }
//                 className="shadow-sm"
//               >
//                 <Upload {...uploadProps}>
//                   <div className="text-center">
//                     <PictureOutlined className="text-4xl text-gray-400 mb-2" />
//                     <div className="ant-upload-text">Click or drag file to upload</div>
//                     <div className="ant-upload-hint">Support for single image upload (JPG, PNG, GIF)</div>
//                   </div>
//                 </Upload>
                
//                 {/* Show uploaded file info */}
//                 {formData.uploadedImageFile && (
//                   <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                     <div className="flex items-center space-x-2">
//                       <CheckCircleOutlined className="text-green-500" />
//                       <div>
//                         <Text strong className="text-green-700">New File Ready for Upload</Text>
//                         <div className="text-sm text-gray-600">
//                           <div>Name: {formData.uploadedImageName}</div>
//                           <div>Size: {(formData.uploadedImageFile.size / 1024 / 1024).toFixed(2)} MB</div>
//                           <div>Type: {formData.uploadedImageFile.type}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </Card>

//               {/* Update Campaign Buttons */}
//               <div className="flex justify-between">
//                 <Button 
//                   size="large"
//                   onClick={resetForm}
//                   className="px-8"
//                 >
//                   Reset to Original
//                 </Button>
//                 <div className="space-x-4">
//                   <Button 
//                     size="large"
//                     onClick={() => router.push("/dashboard/campaigns")}
//                     className="px-8"
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     type="primary" 
//                     size="large"
//                     onClick={handleUpdateCampaign}
//                     loading={isLoading || loading}
//                     className="px-8"
//                     disabled={!formData.campaignName || formData.influencerCount < 1}
//                   >
//                     Update Campaign
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Col>

//           {/* Sidebar */}
//           <Col xs={24} lg={8}>
//             <div className="sticky top-6">
//               <Card 
//                 title="Campaign Summary"
//                 className="shadow-sm"
//               >
//                 <div className="space-y-4">
//                   <div className="flex justify-between">
//                     <Text type="secondary">Number of Influencers:</Text>
//                     <Text strong>{formData.influencerCount}</Text>
//                   </div>
//                   <div className="flex justify-between">
//                     <Text type="secondary">Budget per Influencer:</Text>
//                     <Text strong>${formData.budget.toFixed(2)}</Text>
//                   </div>
//                   <Divider className="my-3" />
//                   <div className="flex justify-between text-lg">
//                     <Text strong>Total Campaign Cost:</Text>
//                     <Text strong className="text-blue-600">${totalAmount.toFixed(2)}</Text>
//                   </div>
                  
//                   {formData.selectedPlatforms.length > 0 && (
//                     <>
//                       <Divider className="my-3" />
//                       <div>
//                         <Text strong className="block mb-2">Selected Platforms:</Text>
//                         <div className="flex flex-wrap gap-2">
//                           {formData.selectedPlatforms.map(platformId => (
//                             <Tag key={platformId} color="blue">
//                               <Space>
//                                 <span>{getPlatformIcon(platformId)}</span>
//                                 <span>{socialPlatforms.find(p => p.id === platformId)?.name}</span>
//                               </Space>
//                             </Tag>
//                           ))}
//                         </div>
//                       </div>
//                     </>
//                   )}
                  
//                   {(formData.uploadedImageFile || formData.uploadedImagePreview) && (
//                     <>
//                       <Divider className="my-3" />
//                       <div>
//                         <Text strong className="block mb-2">Campaign Image:</Text>
//                         <div className="flex items-center space-x-2">
//                           <PictureOutlined className="text-blue-500" />
//                           <Text className="text-sm">
//                             {formData.uploadedImageFile ? formData.uploadedImageName : (formData.uploadedImageName || 'Current Image')}
//                           </Text>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </Card>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default EditCampaign;



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
  Badge,
  Spin
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
  CheckCircleOutlined,
  EditOutlined
} from '@ant-design/icons';
 
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useUpdateCampaignMutation } from '@/redux/fetures/campaign/updateCampaign';
import { useGetSingleCampaignQuery } from '@/redux/fetures/campaign/getSingleCampaign';
import getMediaUrl from '@/utils/getMediaUrl';
import BackButton from '@/components/customComponent/BackButton';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const EditCampaign = () => {
  const [id, setId] = useState('');
  console.log(id)
 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get('id') || '');
  }, []); 

  const {data: campaign} = useGetSingleCampaignQuery(id)
  const campaignData = campaign?.data?.attributes;

  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: '',
    description: '',
    budget: 0,
    startDate: null,
    endDate: null,
    selectedPlatforms: [],
    influencerCount: 1,
    image: null,
    uploadedImageName: null,
    uploadedImagePreview: null,
    uploadedImageFile: null
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [updateCampaign, { isLoading }] = useUpdateCampaignMutation();

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

  // Initialize form with existing campaign data
  useEffect(() => {
    if (campaignData) {
      const defaultFormData = {
        campaignName: campaignData.campaignName || '',
        description: campaignData.description || '',
        budget: campaignData.budget || 0,
        startDate: campaignData.startDate ? dayjs(campaignData.startDate) : null,
        endDate: campaignData.endDate ? dayjs(campaignData.endDate) : null,
        selectedPlatforms: campaignData.selectedPlatforms || [],
        influencerCount: campaignData.influencerCount || 1,
        image: getMediaUrl(campaignData.image) || null,
        uploadedImageName: campaignData.imageName || null,
        uploadedImagePreview: campaignData.imageUrl || null,
        uploadedImageFile: null
      };

      setFormData(defaultFormData);

      // Set form fields
      form.setFieldsValue({
        campaignName: defaultFormData.campaignName,
        description: defaultFormData.description,
        budget: defaultFormData.budget,
        startDate: defaultFormData.startDate,
        endDate: defaultFormData.endDate,
        influencerCount: defaultFormData.influencerCount,
      });

      // Set existing image in fileList if available
      if (campaignData.image) {
        setFileList([{
          uid: '-1',
          name: campaignData.imageName || 'campaign-image',
          status: 'done',
          url: getMediaUrl(campaignData.image),
        }]);
      }
    }
  }, [campaignData, form]);

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
    console.log('Edit Campaign Form Data:', formData);
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

  const handleUpdateCampaign = async () => {
    if (!formData.campaignName || formData.influencerCount < 1) {
      toast.error('Please fill in campaign name and select at least one influencer');
      return;
    }

    console.log('Updating campaign with data:', formData);
    
    try {
      setLoading(true);
      
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
      
      // Add image file if a new one was uploaded
      if (formData.uploadedImageFile) {
        backendFormData.append('image', formData.uploadedImageFile);
      }
      
      // Debug: Log FormData contents
      console.log('FormData being sent:');
      for (let [key, value] of backendFormData.entries()) {
        console.log(`${key}:`, value);
      }
      
      // FIXED: Pass the correct structure to the mutation
      const res = await updateCampaign({
        id: id,
        data: backendFormData
      }).unwrap();
      
      console.log('Update response:', res);
      
      if (res.success === true) {
        toast.success(res?.message);
        setTimeout(() => {
          router.push("/dashboard/campaigns");
        }, 2000);
      } else {
        toast.error(res.message || "Failed to update campaign");
      }
      
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error?.data?.message || "An error occurred while updating the campaign");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (campaignData) {
      const defaultFormData = {
        campaignName: campaignData.campaignName || '',
        description: campaignData.description || '',
        budget: campaignData.budget || 0,
        startDate: campaignData.startDate ? dayjs(campaignData.startDate) : null,
        endDate: campaignData.endDate ? dayjs(campaignData.endDate) : null,
        selectedPlatforms: campaignData.selectedPlatforms || [],
        influencerCount: campaignData.influencerCount || 1,
        uploadedImageFile: null,
        uploadedImageName: campaignData.imageName || null,
        uploadedImagePreview: campaignData.imageUrl || null
      };
      
      setFormData(defaultFormData);
      form.setFieldsValue(defaultFormData);
      
      // Reset file list
      if (campaignData.imageUrl) {
        setFileList([{
          uid: '-1',
          name: campaignData.imageName || 'campaign-image',
          status: 'done',
          url: campaignData.imageUrl,
        }]);
      } else {
        setFileList([]);
      }
    }
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

  if (!campaignData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Title level={2} className="!mb-2">
            <EditOutlined className="text-blue-600 mr-2" />
            Edit Campaign
          </Title>
          <BackButton />
          <Text type="secondary" className="text-base">
            Update your influencer marketing campaign details
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
                <Form
                  form={form}
                  layout="vertical"
                  onValuesChange={handleFormChange}
                >
                  <Row gutter={16}>
                    <Col xs={24}>
                      <Form.Item
                        label="Campaign Name"
                        name="campaignName"
                        rules={[{ required: true, message: 'Please enter campaign name' }]}
                      >
                        <Input 
                          placeholder="Enter Campaign Name"
                          size="large"
                          className="rounded-lg"
                          value={formData.campaignName}
                          onChange={(e) => setFormData(prev => ({...prev, campaignName: e.target.value}))}
                        />
                      </Form.Item>
                    </Col>
                    
                    <Col xs={24}>
                      <Form.Item
                        label="Event Description"
                        name="description"
                      >
                        <TextArea
                          placeholder="Describe your campaign goals, target audience, and requirements"
                          rows={4}
                          className="rounded-lg"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="Budget per Influencer ($)"
                        name="budget"
                        rules={[{ required: true, message: 'Please enter budget' }]}
                      >
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
                      </Form.Item>
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
                      <Form.Item
                        label="Start Date"
                        name="startDate"
                      >
                        <DatePicker
                          size="large"
                          className="w-full rounded-lg"
                          placeholder="Select start date"
                          value={formData.startDate}
                          onChange={(dateString) => setFormData(prev => ({...prev, startDate: dateString}))}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item
                        label="End Date"
                        name="endDate"
                      >
                        <DatePicker
                          size="large"
                          className="w-full rounded-lg"
                          placeholder="Select end date"
                          value={formData.endDate}
                          onChange={(dateString) => setFormData(prev => ({...prev, endDate: dateString}))}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
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
                        <Text strong className="text-green-700">New File Ready for Upload</Text>
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

              {/* Update Campaign Buttons */}
              <div className="flex justify-between">
                <Button 
                  size="large"
                  onClick={resetForm}
                  className="px-8"
                >
                  Reset to Original
                </Button>
                <div className="space-x-4">
                  <Button 
                    size="large"
                    onClick={() => router.push("/dashboard/campaigns")}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={handleUpdateCampaign}
                    loading={isLoading || loading}
                    className="px-8"
                    disabled={!formData.campaignName || formData.influencerCount < 1}
                  >
                    Update Campaign
                  </Button>
                </div>
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
                  
                  {(formData.uploadedImageFile || formData.uploadedImagePreview) && (
                    <>
                      <Divider className="my-3" />
                      <div>
                        <Text strong className="block mb-2">Campaign Image:</Text>
                        <div className="flex items-center space-x-2">
                          <PictureOutlined className="text-blue-500" />
                          <Text className="text-sm">
                            {formData.uploadedImageFile ? formData.uploadedImageName : (formData.uploadedImageName || 'Current Image')}
                          </Text>
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

export default EditCampaign;