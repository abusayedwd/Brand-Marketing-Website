"use client";

import React from "react";
import Link from "next/link";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const { Content } = Layout;

const MainContent = ({ 
  children, 
  isMobileMenuOpen, 
  toggleMobileMenu, 
  menuItems, 
  pathname, 
  openLogoutModal 
}) => {
  return (
    <>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#222F55] text-white p-4 absolute w-full z-50">
          <div className="flex justify-between items-center mb-4">
            <img src="/images/logo.png" alt="Logo" className="w-32" />
            <button 
              type="button" 
              onClick={toggleMobileMenu}
              className="text-white" 
            >
              <LogoutOutlined />
            </button>
          </div>
          <div className="flex flex-col space-y-3">
            {menuItems.map((item) => (
              <Link 
                key={item.key} 
                href={item.path}
                className={`flex items-center py-2 px-4 hover:bg-[#1a243f] rounded ${
                  pathname === item.path ? "bg-[#1a243f] text-green-400" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <div 
              className="flex items-center py-2 px-4 hover:bg-[#1a243f] rounded cursor-pointer"
              onClick={openLogoutModal}
            >
              <LogoutOutlined className="mr-3" />
              Logout
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <Content
        className="p-6 bg-gray-100 md:ml-0 ml-2"
        style={{ 
          minHeight: 'calc(100vh - 64px)',
          paddingTop: isMobileMenuOpen ? '0' : '16px'
        }}
      >
        {children}
      </Content>
    </>
  );
};

export default MainContent;