import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import "../css/people_teacher_detail.css";

const TeacherDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/admin/personnel/${id}`
        );
        setPerson(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching personnel detail:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  const handleCopyEmail = () => {
    if (person?.email) {
      navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Headers />
        <Navbar />
        <div className="container text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">กำลังโหลดข้อมูล...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !person) {
    return (
      <>
        <Headers />
        <Navbar />
        <div className="container my-5">
          <div className="alert alert-danger text-center">
            <strong>เกิดข้อผิดพลาด:</strong> ไม่สามารถโหลดข้อมูลได้
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Headers />
      <Navbar />
    <h4>บุคลากร</h4>
      <div className="container my-5">
        <div className="teacher-card mx-auto bg-white shadow rounded p-4">
          <div className="row">
            {/* Left: Image and Email */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={person.file_image}
                alt={person.thai_name}
                className="img-fluid img-profile"
                onError={(e) => (e.target.src = "/images/default-profile.png")}
              />

              <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
                <div>
                  <strong>อีเมล</strong>
                  <br />
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </div>
                <button
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1 copy-btn"
                  onClick={handleCopyEmail}
                  title="คัดลอกอีเมล"
                >
                  <i className="bi bi-clipboard"></i> คัดลอก
                </button>
              </div>
              {copied && (
                <small className="text-success d-block mt-1">คัดลอกแล้ว!</small>
              )}
            </div>

            {/* Right: Info */}
            <div className="col-md-8 text-start">
              <h5 className="text-primary">
                {person.department_position_name}
              </h5>
              <hr></hr>
              <h4 className="fw-bold mt-2">
                {person.thai_academic_position} {person.thai_name}
              </h4>
              <p className="text-muted mb-1">
                {person.eng_academic_position} {person.eng_name}
              </p>
              <hr></hr>
              <h5 className="mt-4">ประวัติการศึกษา</h5>
              <ul>
                {person.education &&
                  person.education
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => <li key={index}>{line.trim()}</li>)}
              </ul>
              <hr></hr>
              <h5 className="mt-4">สาขาที่เชี่ยวชาญ</h5>
              <ul>
                {person.related_fields &&
                  person.related_fields
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => <li key={index}>{line.trim()}</li>)}
              </ul>
              <hr></hr>
              <p className="mt-3">
                <strong>เว็บไซต์ </strong>{" "}
                <a href={person.website} target="_blank" rel="noreferrer">
                  {person.website}
                </a>
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <hr className="my-4" />
          <h5 className="text-center mb-3">เวลาที่สะดวก (Office Hours)</h5>
          <div className="table-responsive">
            <table className="table table-bordered text-center office-hours">
              <thead className="table-light">
                <tr>
                  <th>จันทร์</th>
                  <th>อังคาร</th>
                  <th>พุธ</th>
                  <th>พฤหัสบดี</th>
                  <th>ศุกร์</th>
                  <th>เสาร์</th>
                  <th>อาทิตย์</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10:00 - 12:00</td>
                  <td>13:00 - 15:00</td>
                  <td>10:00 - 12:00</td>
                  <td>13:00 - 15:00</td>
                  <td>09:00 - 11:00</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="teacher-research mx-auto bg-white shadow-sm rounded p-4 mt-4">
        <h5 className="mb-3">ผลงานวิจัย (Research Publications)</h5>
        <ul className="research-list">
          <li>
            Suphachai Phawiakkharakun, Sunee Pongpinigpinyo, (2024).{" "}
            <em>
              Enhanced non-destructive of degree of pineapple juiciness using
              ensemble learning model based on tapping sound sensing
            </em>
            , International Journal of Applied Science and Engineering, Volume
            21, No. 1, March 2024.
          </li>
          <li className="mt-3">
            Zhang, Y., Li, X., Wang, J., & Chen, Q. (2023).{" "}
            <em>
              Deep learning-based method for early diagnosis of lung cancer
              using CT images
            </em>
            . Computers in Biology and Medicine, 153, 106388.{" "}
          </li>
          <li className="mt-3">
            Smith, A., Johnson, R., & Lee, M. (2022).{" "}
            <em>
              Optimization of photovoltaic panels using hybrid metaheuristic
              algorithms
            </em>
            . Renewable Energy, 185, 757-769.{" "}
          </li>
          <li className="mt-3">
            Garcia, L., Kumar, P., & Martinez, F. (2021).{" "}
            <em>
              A novel IoT-based smart irrigation system for precision
              agriculture
            </em>
            . Sensors, 21(18), 6200.{" "}
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default TeacherDetail;
