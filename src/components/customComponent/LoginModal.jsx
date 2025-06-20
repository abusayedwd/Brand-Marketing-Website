import { useState } from 'react';
import { Modal, Button } from 'antd';
import Link from 'next/link';
import './loginModal.css'; // Custom CSS file
import { CustomButton } from './Button';

// Custom Login Modal Component
export const LoginModal = ({ isVisible, onClose, onLogin }) => {
  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      centered
      width={420}
      footer={null}
      className="custom-login-modal"
      closeIcon={
        <div className="custom-close-icon">×</div>
      }
    >
      <div className="login-modal-content">
        <div className="modal-header">
          <div className="lock-icon">🔐</div>
          <h2 className="modal-title">Login Required</h2>
        </div>
        
        <div className="modal-body">
          <div className="rocket-icon">🚀</div>
          <h3 className="main-heading">Access Premium Content</h3>
          <p className="description">
            Please login to view detailed influencer profiles and connect with amazing creators.
          </p>
        </div>
        
        <div className="modal-footer">
          <CustomButton 
            variant="secondary" 
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          
            <Link href="/auth/login" className="login-link">
          <CustomButton 
            variant="primary" 
            onClick={onLogin}
          >
            🔑 Login Now
          </CustomButton>
            </Link>
        </div>
      </div>
    </Modal>
  );
};
