import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Menu from "../../component/menu";
import Footer from "../../component/footer";
import api from "../../api/axios";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.roles?.includes("admin");

  useEffect(() => {
    if (isAdmin) {
      fetchHistory();
    }
  }, [isAdmin]);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/admin/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("โหลดประวัติการใช้งานไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 redirect หลังจากเรียก hooks แล้ว (ถูกต้อง)
  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9">
            <h3 className="mb-4">ประวัติการเข้าใช้งานระบบ</h3>

            <table className="table table-bordered">
              <thead className="table-light text-center">
                <tr>
                  <th>ผู้ใช้งาน</th>
                  <th>สิทธิ์</th>
                  <th>การกระทำ</th>
                  <th>รายการที่เกี่ยวข้อง</th>
                  <th>วันเวลา</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      กำลังโหลด...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                ) : (
                  history.map((h) => (
                    <tr key={h.id}>
                      <td>{h.user}</td>
                      <td>{h.role}</td>
                      <td>{h.action}</td>
                      <td>{h.target}</td>
                      <td>{h.createdAt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default History;
