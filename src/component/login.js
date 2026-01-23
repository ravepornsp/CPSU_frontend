import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../css/login.css";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔐 ถ้า login แล้ว ไม่ให้เข้าหน้า login
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        email: email,
        password: password,
      });

      const { access_token, refresh_token, user } = res.data;

      // 1️⃣ เก็บ token
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Login success:", user);

      // 2️⃣ redirect
      if (user?.roles?.includes("admin") || user?.roles?.includes("staff")) {
        navigate("/admin/dashboard");
      } else {
        navigate("/teacher/information", {
          state: { userId: user.user_id },
        });
      }
    } catch (err) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
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
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
