import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormPage from "./frompage"; // ตรวจสอบว่าชื่อไฟล์ถูกต้อง
import FormPageMB from "./frompageMB";
import CompletePage from "./complete"; // ตรวจสอบว่าชื่อไฟล์ถูกต้อง
import banner_pc from "../img/Banner_PC.jpg";
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
        src={isMobile ? banner_pc : banner_pc}
        alt="Logo"
        className="img-fluid"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      {/* Navigation */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          // backgroundColor: "#FF779F",
          padding: "0.5rem 2rem", // Make padding uniform
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Add subtle shadow
        }}
      >
        <div>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <button
              className="btn btn-pink mx-2"
              style={{
                backgroundColor: "#FF1493", // สีชมพูเข้ม (DeepPink)
                color: "white", // เปลี่ยนตัวอักษรเป็นสีขาว
                border: "none", // เอาขอบออก
                padding: "10px 20px",
                borderRadius: "30px",
                transition: "background-color 0.3s ease",
              }}
              onClick={() =>
                window.open("https://uniquecarestation.com/", "_blank")
              }
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Scale effect on hover
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Reset scale on hover out
            >
              เว็บไซต์หลัก
            </button>
            <button
              className="btn btn-pink mx-2"
              style={{
                backgroundColor: "#FF1493", // สีชมพูเข้ม (DeepPink)
                color: "white", // เปลี่ยนตัวอักษรเป็นสีขาว
                border: "none", // เอาขอบออก
                padding: "10px 20px",
                borderRadius: "30px",
                transition: "background-color 0.3s ease, transform 0.2s ease", // Added transform for a little scaling effect
              }}
              onClick={() =>
                window.open(
                  "https://360healthyshop.com/?srsltid=AfmBOoqP76flB_I6m5cpUUrya-RdzjXVlfwRgI2nQrh_UncJoCUAA2GB",
                  "_blank"
                )
              }
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Scale effect on hover
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Reset scale on hover out
            >
              360shopping
            </button>
          </div>
        </div>
      </nav>
      {/* https://360healthyshop.com/?srsltid=AfmBOoqP76flB_I6m5cpUUrya-RdzjXVlfwRgI2nQrh_UncJoCUAA2GB */}

      {/* Main Content */}
      <div className="flex-grow-1">
        {isMobile ? (
          !isFormSubmitted ? (
            <FormPageMB onSubmitSuccess={() => setIsFormSubmitted(true)} />
          ) : (
            <CompletePage />
          )
        ) : !isFormSubmitted ? (
          <FormPage onSubmitSuccess={() => setIsFormSubmitted(true)} />
        ) : (
          <CompletePage />
        )}
      </div>

      <footer
        className="p-3 text-center "
        style={{
          backgroundColor: "#FF779F", // สีชมพูเข้ม (DeepPink)
          color: "white", // ตัวอักษรสีขาว
        }}
      >
        <p>&copy; 2025 Unique Care Station. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
