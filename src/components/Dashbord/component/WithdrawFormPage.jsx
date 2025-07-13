"use client"
import React, { useState } from 'react';
import { Button, Input, Typography, Card, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useWithdreawRequestMutation } from '@/redux/fetures/wallet/withdrawRequest';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const { Title } = Typography;

const WithdrawFormPage = () => {
    const router  = useRouter()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    bankDetails: {
      accountNumber: '', 
      holderName: '',
      bankName: ''
    },
    reason: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field.startsWith('bankDetails.')) {
      const bankField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [bankField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.bankDetails.accountNumber) {
      newErrors.accountNumber = 'Please enter your account number';
    } else if (!/^\d+$/.test(formData.bankDetails.accountNumber)) {
      newErrors.accountNumber = 'Account number must contain only numbers';
    }
    
    if (!formData.bankDetails.holderName) {
      newErrors.holderName = 'Please enter account holder name';
    } else if (formData.bankDetails.holderName.length < 2) {
      newErrors.holderName = 'Name must be at least 2 characters';
    }
    
    if (!formData.bankDetails.bankName) {
      newErrors.bankName = 'Please enter bank name';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Please enter withdrawal amount';
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (parseFloat(formData.amount) > 1200) {
      newErrors.amount = 'Amount cannot exceed available balance';
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Please provide a reason for withdrawal';
    }
    
    return newErrors;
  };
const [withdraw] = useWithdreawRequestMutation()

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      // Format data according to your API structure
      const withdrawalData = {
        amount: parseFloat(formData.amount),
        bankDetails: {
          bankName: formData.bankDetails.bankName,
          accountNumber: formData.bankDetails.accountNumber,
          holderName: formData.bankDetails.holderName
        },
        reason: formData.reason
      };
      
      console.log('Withdrawal data:', withdrawalData);
      
      const res = await withdraw(withdrawalData).unwrap();
      if(res?.code === 200){
          toast.success(res?.message);
         setTimeout(() => {
             router.push("/dashboard/my-wallet") 
         }, 1000);

         setFormData({
        amount: '',
        bankDetails: {
          accountNumber: '',
          holderName: '',
          bankName: ''
        },
        reason: ''
      });
      
      }
     
      
    } catch (error) {
      console.error('Withdrawal error:', error);
      message.error('Failed to submit withdrawal request');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    // Add navigation logic here
    console.log('Navigate back');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <Toaster />
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-700 p-0 h-auto mb-4"
          >
            <span className="ml-2 text-blue-600 font-medium">Choose payment method</span>
          </Button>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <Title level={3} className="text-gray-800 mb-8 text-center">
            Choose payment method
          </Title>

          <div className="space-y-4">
            {/* Amount */}
            <div>
              <Input
                placeholder="Amount"
                size="large"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                className="bg-blue-100 border-0 rounded-lg h-14 placeholder-gray-600"
                prefix="$"
                status={errors.amount ? 'error' : ''}
              />
              {errors.amount && (
                <div className="text-red-500 text-sm mt-1">{errors.amount}</div>
              )}
            </div>

            {/* Account Number */}
            <div>
              <Input
                placeholder="Account number"
                size="large"
                value={formData.bankDetails.accountNumber}
                onChange={(e) => handleInputChange('bankDetails.accountNumber', e.target.value)}
                className="bg-blue-100 border-0 rounded-lg h-14 placeholder-gray-600"
                status={errors.accountNumber ? 'error' : ''}
              />
              {errors.accountNumber && (
                <div className="text-red-500 text-sm mt-1">{errors.accountNumber}</div>
              )}
            </div>

            {/* Account Holder Name */}
            <div>
              <Input
                placeholder="Account holder name"
                size="large"
                value={formData.bankDetails.holderName}
                onChange={(e) => handleInputChange('bankDetails.holderName', e.target.value)}
                className="bg-blue-100 border-0 rounded-lg h-14 placeholder-gray-600"
                status={errors.holderName ? 'error' : ''}
              />
              {errors.holderName && (
                <div className="text-red-500 text-sm mt-1">{errors.holderName}</div>
              )}
            </div>

            {/* Bank Name */}
            <div>
              <Input
                placeholder="Bank name"
                size="large"
                value={formData.bankDetails.bankName}
                onChange={(e) => handleInputChange('bankDetails.bankName', e.target.value)}
                className="bg-blue-100 border-0 rounded-lg h-14 placeholder-gray-600"
                status={errors.bankName ? 'error' : ''}
              />
              {errors.bankName && (
                <div className="text-red-500 text-sm mt-1">{errors.bankName}</div>
              )}
            </div>

            {/* Reason */}
            <div>
              <Input.TextArea
                placeholder="Reason for withdrawal"
                size="large"
                value={formData.reason}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                className="bg-blue-100 border-0 rounded-lg placeholder-gray-600"
                rows={3}
                status={errors.reason ? 'error' : ''}
              />
              {errors.reason && (
                <div className="text-red-500 text-sm mt-1">{errors.reason}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button
                type="primary"
                size="large"
                block
                loading={loading}
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 h-14 text-white font-semibold text-base rounded-lg"
              >
                PROCEED TO WITHDRAW
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawFormPage;