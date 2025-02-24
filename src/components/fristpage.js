import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormPage from "./frompage"; // ตรวจสอบว่าชื่อไฟล์ถูกต้อง
import CompletePage from "./complete"; // ตรวจสอบว่าชื่อไฟล์ถูกต้อง
import banner_pc from "../img/Banner_PC.png";
import banner_mb from "../img/Banner_MB.png";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // เพิ่ม state เพื่อตรวจสอบสถานะ

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Pink Banner */}
      <img
        src={isMobile ? banner_mb : banner_pc}
        alt="Logo"
        className="img-fluid"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />

      {/* Main Content */}
      <div className="flex-grow-1">
        {!isFormSubmitted ? (
          <FormPage onSubmitSuccess={() => setIsFormSubmitted(true)} /> // ส่งฟังก์ชันไปให้ FormPage
        ) : (
          <CompletePage />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-light p-3 text-center mt-4">
        <p>&copy; 2025 Unique Care Station. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
