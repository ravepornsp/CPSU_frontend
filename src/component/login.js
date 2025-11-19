import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 ตรวจสอบ username และ password
    if (username === "test" && password === "test") {
      console.log("Login success!");
      navigate("/teacher/information");

      const userId = 13;
      navigate("/teacher/information", { state: { userId } });
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container login-container">
        <div className="login-box">
          <h2>เข้าสู่ระบบ</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>อีเมล</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกอีเมล"
                required
              />
            </div>

            <div className="form-group">
              <label>รหัสผ่าน</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่าน"
                required
              />
            </div>

            <button type="submit" className="btn-login">
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
