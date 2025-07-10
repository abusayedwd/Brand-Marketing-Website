"use client"

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd"; 

const BackButton = () => {  
 const handleBack = () => {
    window.history.back();
  };

  

  return (
    <Button type="default" icon={<ArrowLeftOutlined />} onClick={handleBack}>
      Back
    </Button>
  );
};

export default BackButton;