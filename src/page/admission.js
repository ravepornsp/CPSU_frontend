import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import axios from "axios";
import "../css/admission.css";
import Breadcrumb from "../component/Breadcrumb";

const Admission = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/admission")
      .then((res) => {
        setAdmissions(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลการรับสมัครได้");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="m-4">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

  return (
    <>
      <Headers />
      <Navbar />
      <Breadcrumb items={[{ label: "การรับสมัคร", path: "/admission" }]} />
      <div className="container py-5">
        {/* <h2 className="text-center mb-4">ข้อมูลการรับสมัคร</h2> */}

        {admissions.map((item) => {
          return (
            <div key={item.admission_id} className="mb-5 border-bottom pb-4">
              {/* หัวข้อ + ปุ่ม */}
              <h2>{item.round}</h2>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="mb-0">{item.title}</h4>{" "}
                {/* แสดงข้อความจาก back office */}
                <div></div>
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
                {item.file_image && (
                  <div style={{ flex: "0 0 auto" }}>
                    <img
                      src={item.file_image}
                      alt={item.title}
                      style={{
                        maxWidth: "500px",
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                )}

                <div style={{ flex: "1 1 0", minWidth: "200px" }}>
                  <div
                    className="admission-detail"
                    style={{ textAlign: "left" }}
                    dangerouslySetInnerHTML={{ __html: item.detail }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default Admission;
