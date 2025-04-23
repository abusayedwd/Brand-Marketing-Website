"use client";

import React from "react";
import { Modal, Button } from "antd";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center gap-4">
          <Button
            type="primary"
            className="bg-green-600 hover:bg-green-500 text-white"
            onClick={onLogout}
          >
            Yes
          </Button>
          <Button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
            onClick={onClose}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;