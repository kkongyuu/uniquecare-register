import React, { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../api";

const FormPageMB = ({ onSubmitSuccess }) => {
  // รับ prop เข้ามา
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    tel: "",
    dob: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    // ตรวจสอบรูปแบบอีเมล และอนุญาตเฉพาะ .com, .net, .org, .edu, .gov ฯลฯ
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|info|co\.th|ac\.th)$/;
    return emailRegex.test(email);
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    !errors.password &&
    !errors.confirmPassword &&
    !errors.email && // ตรวจสอบว่าไม่มี error ของ email
    validateEmail(formData.email); // ตรวจสอบว่า email ถูกต้อง

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // ตรวจสอบรหัสผ่านตรงกัน
      setErrors((prevErrors) => {
        let newErrors = { ...prevErrors };

        if (name === "email") {
          newErrors.email = validateEmail(value)
            ? ""
            : "รูปแบบอีเมลไม่ถูกต้อง!";
        }

        if (name === "password" || name === "confirmPassword") {
          if (
            newData.password !== newData.confirmPassword &&
            newData.confirmPassword !== ""
          ) {
            newErrors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
          } else {
            newErrors.confirmPassword = "";
          }
        }

        return newErrors;
      });

      return newData;
    });

    if (name === "password" || name === "confirmPassword") {
      validatePasswords(name, value);
    }
  }, []);

  const validatePasswords = (name, value) => {
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (name === "password") {
        if (value.length < 8) {
          newErrors.password = "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = "รหัสผ่านต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว";
        } else if (!/[0-9]/.test(value)) {
          newErrors.password = "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว";
        } else if (!/[!@#$%^&*]/.test(value)) {
          newErrors.password =
            "รหัสผ่านต้องมีอักขระพิเศษอย่างน้อย 1 ตัว (!@#$%^&*)";
        } else if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(value)) {
          newErrors.password =
            "รหัสผ่านต้องเป็นตัวอักษรภาษาอังกฤษ ตัวเลข หรืออักขระพิเศษเท่านั้น";
        } else {
          newErrors.password = "";
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.password || errors.confirmPassword) {
      console.error("กรุณาแก้ไขข้อผิดพลาดก่อนส่งฟอร์ม");
      return;
    }

    console.log("Submitted Data:", formData);
    onSubmitSuccess(); // เรียกฟังก์ชันเพื่อเปลี่ยนไปที่ CompletePage
  };

  const setDataRegister = async () => {
    try {
      // Validate form data
      if (
        !formData.firstname ||
        !formData.lastname ||
        !formData.email ||
        !formData.password
      ) {
        console.error("Please fill in all required fields");
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        console.error("Invalid email format");
        return;
      }

      // Password strength check (at least 8 characters, 1 number, 1 special character)
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        console.error(
          "Password must be at least 8 characters long and contain a number and a special character"
        );
        return;
      }

      // Send data to API
      const response = await api.post("/users/register", formData);

      if (response.status === 200) {
        onSubmitSuccess(); // เรียกฟังก์ชันเพื่อเปลี่ยนไปที่ CompletePage
        console.log("Registration successful");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container  p-4">
      <div
        className=" p-4 rounded "
        style={{ backgroundColor: "#FFBFC9" }}
      >
        <h2 className="mb-4 text-center">Unique Care Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ชื่อ</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">นามสกุล</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <small className="text-danger">{errors.confirmPassword}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">เบอร์โทร</label>
            <input
              type="tel"
              className="form-control"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">วันเดือนปีเกิด</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">เพศ</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">เลือกเพศ</option>
              <option value="m">ชาย</option>
              <option value="f">หญิง</option>
              <option value="other">อื่น ๆ</option>
            </select>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#FF1493", // สีชมพูเข้ม (DeepPink)
                color: "white", // เปลี่ยนตัวอักษรเป็นสีขาว
                border: "none", // เอาขอบออก
              }}
              disabled={!isFormValid}
            >
              ส่งข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPageMB;
