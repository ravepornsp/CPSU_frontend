import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import "../css/people_teacher_detail.css";
import Breadcrumb from "../component/Breadcrumb";

const TeacherDetail = () => {
  const { id } = useParams();

  const [person, setPerson] = useState(null);
  const [researches, setResearches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [researchLoading, setResearchLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  // ===== Fetch Personnel =====
  useEffect(() => {
    let isMounted = true;

    const fetchPerson = async () => {
      try {
        const res = await api.get(`/personnel/${id}`);
        if (isMounted) {
          setPerson(res.data?.personnel || null);
        }
      } catch (err) {
        console.error("Error fetching personnel detail:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPerson();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    let isMounted = true;

    const fetchResearch = async () => {
      try {
        const res = await api.get(`/personnel/research`);

        const filtered = res.data?.filter(
          (item) => item.personnel_id === Number(id),
        );

        if (isMounted) {
          setResearches(filtered || []);
        }
      } catch (err) {
        console.error("Error fetching research:", err);
      } finally {
        if (isMounted) setResearchLoading(false);
      }
    };

    fetchResearch();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCopyEmail = () => {
    if (!person?.email) return;
    navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Headers />
        <Navbar />
        <div className="container text-center my-5">
          <div className="spinner-border text-primary" />
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
            ไม่สามารถโหลดข้อมูลได้
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

      <Breadcrumb
        items={[
          { label: "บุคลากร", path: "/personnel" },
          { label: "บุคลากรสายวิชาการ" },
          { label: person.thai_name },
        ]}
      />

      <div className="container my-5">
        <h3>บุคลากร</h3>

        <div className="teacher-card mx-auto bg-white shadow rounded p-4">
          <div className="row">
            {/* LEFT */}
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <img
                src={person.file_image || "/images/default-profile.png"}
                alt={person.thai_name}
                className="img-fluid img-profile"
              />

              {person.email && (
                <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                  <span className="mb-0">{person.email}</span>

                  <button
                    className="btn btn-outline-primary btn-sm p-2 d-flex align-items-center justify-content-center"
                    onClick={handleCopyEmail}
                    // style={{ fontSize: "12px", outlineColor: "#ffffff" }}
                  >
                    <i
                      className={`bi ${copied ? "bi-check-lg text-success" : "bi-files text-primary"}`}
                    ></i>{" "}
                  </button>
                </div>
              )}

              {copied && (
                <small className="text-primary d-block mt-1">คัดลอกแล้ว!</small>
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

              <p className="text-muted">
                {person.eng_academic_position} {person.eng_name}
              </p>

              <hr />

              {person.education && (
                <>
                  <h5>ประวัติการศึกษา</h5>
                  <ul>
                    {person.education
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                  <hr />
                </>
              )}

              {person.related_fields && (
                <>
                  <h5>สาขาที่เชี่ยวชาญ</h5>
                  <ul>
                    {person.related_fields
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                  <hr />
                </>
              )}

              {person.website && (
                <p>
                  <strong>เว็บไซต์ :</strong>{" "}
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
        <div className="teacher-research container bg-white shadow-sm rounded p-4 mt-4 mb-5">
          <h5 className="mb-3">ผลงานวิจัย (Scopus)</h5>

          {researchLoading ? (
            <p>กำลังโหลดผลงานวิจัย...</p>
          ) : (
            <ul className="research-list">
              {researches.map((research, index) => (
                <li key={index} className="mb-3">
                  {research.authors?.length > 0 && (
                    <>{research.authors.join(", ")}, </>
                  )}
                  <span>"{research.title},"</span>{" "}
                  {research.journal && <em>{research.journal}</em>}
                  {research.year && `, ${research.year}`}
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

export default TeacherDetail;
