import React, { useEffect, useState } from "react";
import "../../css/admin/subject.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

function Subject() {
  const [subject, setSubject] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/admin/subject"
        );
        const filtered = res.data.filter((item) => {
          const sid = item.subject_id?.trim();
          const name = item.thai_subject?.trim();

          return (
            sid !== "------" &&
            name !== "วิชาเลือกเสรี" &&
            name !== "วิชาเลือกในหมวดวิชาเฉพาะ" &&
            sid !== "SUxxx" &&
            sid !== "SUXXX"
          );
        });
        setSubject(filtered);
      } catch (err) {
        console.error("Error fetching subject", err);
      }
    };

    fetchSubject();
  }, []);

  const filteredSubjects = subject.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.subject_id.toLowerCase().includes(term) ||
      item.thai_subject.toLowerCase().includes(term)
    );
  });

  const groupedByCourse = subject.reduce((acc, item) => {
    const courseId = item.course_id;
    if (!acc[courseId]) {
      acc[courseId] = [];
    }
    acc[courseId].push(item);
    return acc;
  }, {});

  const handleSelect = (id) => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/admin/subject/${id}`);
  };

  return (
    <>
      <div>
        <Headers />
        <Navbar />
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-4">
              <Menu />
            </div>
            <div className="col-sm-8 ">
              <div className="row">
                <div className="col-md-4" id="subject-all">
                  รายวิชาทั้งหมด
                </div>
                <div className="col-md-4 offset-md-4">
                  <Link
                    to="/admin/addsubject"
                    className="list-group-item"
                    id="btn-addsubject"
                  >
                    เพิ่มรายวิชาใหม่
                  </Link>
                </div>
              </div>
              <div
                className="searchbox-subject"
                style={{
                  position: "relative",
                  maxWidth: "400px",
                  marginBottom: "1rem",
                }}
              >
                <input
                  type="text"
                  placeholder="ค้นหารหัสวิชา หรือ ชื่อวิชา..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => setShowDropdown(false), 150);
                  }}
                  onFocus={() => {
                    if (searchTerm.length > 0) setShowDropdown(true);
                  }}
                  className="form-control"
                  style={{ width: "100%", maxWidth: "400px" }}
                />
                {showDropdown && searchTerm && filteredSubjects.length > 0 && (
                  <ul
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      maxHeight: "200px",
                      overflowY: "auto",
                      zIndex: 1000,
                    }}
                  >
                    {filteredSubjects.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="dropdown-item"
                          onMouseDown={() => handleSelect(item.id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            border: "none",
                            background: "none",
                            padding: "0.25rem 1.5rem",
                            cursor: "pointer",
                          }}
                        >
                          {item.subject_id} - {item.thai_subject}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {showDropdown &&
                  searchTerm &&
                  filteredSubjects.length === 0 && (
                    <ul
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                      }}
                    >
                      <li className="dropdown-item disabled">ไม่พบผลลัพธ์</li>
                    </ul>
                  )}
              </div>

              {/* ตารางรายวิชาแบ่งตาม course_id */}
              {Object.keys(groupedByCourse).map((courseId) => (
                <div key={courseId} style={{ marginBottom: "30px" }}>
                  <h5 className="text-start mt-4">หลักสูตร: {courseId}</h5>
                  <table className="table table-bordered text-start">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "15%" }}>รหัสวิชา</th>
                        <th>ชื่อวิชา</th>
                        <th style={{ width: "20%" }}>หน่วยกิต</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedByCourse[courseId].map((subj) => (
                        <tr key={subj.id}>
                          <td>
                            <Link to={`/admin/subject/${subj.id}`}>
                              {subj.subject_id}
                            </Link>
                          </td>
                          <td>{subj.thai_subject}</td>
                          <td>{subj.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Subject;
