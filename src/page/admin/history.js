import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";

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

  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h3>ประวัติการเข้าใช้งานระบบ</h3>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
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
                        <td>{formatDateTime(h.createdAt)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default History;
