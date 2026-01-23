import React, { useEffect, useState } from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const Admission = () => {
  const [admission, setAdmission] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("http://localhost:8080/api/v1/admin/admission")
      .then((res) => {
        setAdmission(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("ไม่สามารถโหลดข้อมูลการรับสมัครได้");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("ต้องการลบข้อมูลรอบนี้ใช่หรือไม่?")) return;

    try {
      await api.delete(
        `http://localhost:8080/api/v1/admin/admission/${id}`
      );
      setAdmission((prev) =>
        prev.filter((item) => item.admission_id !== id)
      );
      alert("ลบข้อมูลสำเร็จ");
    } catch (error) {
      console.error(error);
      alert("ลบข้อมูลไม่สำเร็จ");
    }
  };

  return (
    <>
      <Headers />
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 id="course-title">การรับสมัคร</h3>
              <Link to="/admin/admission/add" className="btn-addcourse">
                เพิ่มข้อมูล
              </Link>
            </div>

            {loading && <p>กำลังโหลดข้อมูลการรับสมัคร...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && admission.length === 0 && (
              <p>ยังไม่มีข้อมูลการรับสมัคร</p>
            )}

            {admission.map((item) => (
              <div
                key={item.admission_id}
                className="mb-5 border-bottom pb-4"
              >
                {/* หัวข้อ */}
                <h2>{item.round}</h2>

                {/* ปุ่ม */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h4 className="mb-0">{item.title}</h4>
                  <div>
                    <Link
                      to={`/admin/admission/edit/${item.admission_id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      แก้ไข
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        handleDelete(item.admission_id)
                      }
                    >
                      ลบ
                    </button>
                  </div>
                </div>

                {/* เนื้อหา */}
                <div
                  className="d-flex align-items-start"
                  style={{
                    gap: "20px",
                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* รูป (รองรับ string และกันค่าว่าง) */}
                  {item.file_image && item.file_image !== "" && (
                    <div style={{ flex: "0 0 auto" }}>
                      <img
                        src={item.file_image}
                        alt={item.title || item.round}
                        style={{
                          maxWidth: "500px",
                          width: "100%",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}

                  {/* รายละเอียด */}
                  <div style={{ flex: "1 1 0", minWidth: "200px" }}>
                    <div
                      className="admission-detail"
                      style={{ textAlign: "left" }}
                      dangerouslySetInnerHTML={{
                        __html: item.detail,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Admission;
