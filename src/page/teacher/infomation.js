import React, { useState, useEffect } from "react";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Navbar from "../../component/navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const TeacherInformation = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [researches, setResearches] = useState([]);
  const [researchLoading, setResearchLoading] = useState(true);
  const location = useLocation();
  const id = location.state?.userId;

  console.log("User ID from login:", id);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/admin/personnel/${id}`
        );
        setPerson(res.data.personnel);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching personnel detail:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/admin/personnel/research`
        );

        const filteredResearches = res.data?.filter(
          (item) => item.personnel_id === Number(id)
        );

        setResearches(filteredResearches || []);
      } catch (err) {
        console.error("Error fetching research data:", err);
      } finally {
        setResearchLoading(false);
      }
    };

    fetchResearch();
  }, [id]);

  const handleEdit = () => {
    navigate("/teacher/informationedit", { state: { userId: id } });
  };

  const handleCopyEmail = () => {
    if (!person?.email) return;
    navigator.clipboard.writeText(person.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <>
        <Header />
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
        <Header />
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
      <Header />
      <Navbar />
      <h4 className="text-center my-4">บุคลากร</h4>
      <div className="container my-5">
        <div className="teacher-card mx-auto bg-white shadow rounded p-4 position-relative">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary position-absolute top-0 end-0 m-3 d-flex align-items-center gap-1"
            title="แก้ไขข้อมูล"
            style={{ zIndex: 10 }}
          >
            <i className="bi bi-pencil"></i> แก้ไข
          </button>

          <div className="row">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={
                  person.file_image
                    ? person.file_image
                    : "/images/default-profile.png"
                }
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

            <div className="col-md-8 text-start">
              <h5 className="text-primary">
                {person.department_position_name}
              </h5>
              <hr />
              <h4 className="fw-bold mt-2">
                {person.thai_academic_position} {person.thai_name}
              </h4>
              <p className="text-muted mb-1">
                {person.eng_academic_position} {person.eng_name}
              </p>
              <hr />
              <h5 className="mt-4">ประวัติการศึกษา</h5>
              <ul>
                {person.education
                  ?.split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))}
              </ul>
              <hr />
              <h5 className="mt-4">สาขาที่เชี่ยวชาญ</h5>
              <ul>
                {person.related_fields
                  ?.split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((line, index) => (
                    <li key={index}>{line.trim()}</li>
                  ))}
              </ul>
              <hr />
              {person.website && (
                <p className="mt-3">
                  <strong>เว็บไซต์ </strong>{" "}
                  <a href={person.website} target="_blank" rel="noreferrer">
                    {person.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {researches.length > 0 && (
        <div className="teacher-research mx-auto bg-white shadow-sm rounded p-4 mt-4">
          <h5 className="mb-3">ผลงานวิจัย (Scopus)</h5>

          {researchLoading ? (
            <p>กำลังโหลดผลงานวิจัย...</p>
          ) : (
            <ul className="research-list">
              {researches.map((research, index) => (
                <li key={index} className="mb-3">
                  {research.authors && <strong>{research.authors}, </strong>}
                  {research.year && `(${research.year}). `}
                  <em>{research.title}</em>
                  {research.journal && `, ${research.journal}`}
                  {research.volume && `, Volume ${research.volume}`}
                  {research.pages && `, ${research.pages}`}
                  {research.doi && (
                    <>
                      . DOI:{" "}
                      <a
                        href={`https://doi.org/${research.doi}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {research.doi}
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default TeacherInformation;
