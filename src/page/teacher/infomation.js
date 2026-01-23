import React, { useState, useEffect } from "react";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Navbar from "../../component/navbar";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const TeacherInformation = () => {
  const navigate = useNavigate();

  const [person, setPerson] = useState(null);
  const [researches, setResearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [researchLoading, setResearchLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  /* 🔐 ดึง user จาก localStorage */
  const [user] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const roles = Array.isArray(user?.roles) ? user.roles : [];

  /* ❌ ถ้าไม่ใช่ teacher ออกทันที */
  useEffect(() => {
    if (!user || !user.roles?.includes("teacher")) {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  }, [navigate, user]);

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchPerson = async () => {
      try {
        const res = await api.get(`/personnel/${user.user_id}`);
        setPerson(res.data.personnel);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [user?.user_id]);


  const handleEdit = () => {
    navigate("/teacher/informationedit");
  };

  const handleCopyEmail = () => {
    if (!person?.email) return;
    navigator.clipboard.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Header />
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
        <Header />
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
      <Header />
      <Navbar />

      <h4 className="text-center my-4">ข้อมูลอาจารย์ของฉัน</h4>

      <div className="container my-5">
        <div className="teacher-card mx-auto bg-white shadow rounded p-4 position-relative">
          <button
            onClick={handleEdit}
            className="btn btn-outline-secondary position-absolute top-0 end-0 m-3"
          >
            <i className="bi bi-pencil"></i> แก้ไข
          </button>

          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={person.file_image || "/images/default-profile.png"}
                alt={person.thai_name}
                className="img-fluid img-profile"
              />

              <div className="mt-3">
                <strong>อีเมล</strong>
                <br />
                <a href={`mailto:${person.email}`}>{person.email}</a>
                <br />
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={handleCopyEmail}
                >
                  คัดลอกอีเมล
                </button>
                {copied && (
                  <small className="text-success d-block">คัดลอกแล้ว</small>
                )}
              </div>
            </div>

            <div className="col-md-8">
              <h5 className="text-primary">
                {person.department_position_name}
              </h5>
              <hr />
              <h4>
                {person.thai_academic_position} {person.thai_name}
              </h4>
              <p className="text-muted">
                {person.eng_academic_position} {person.eng_name}
              </p>

              <hr />
              <h5>ประวัติการศึกษา</h5>
              <ul>
                {person.education?.split("\n").map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>

              <hr />
              <h5>สาขาที่เชี่ยวชาญ</h5>
              <ul>
                {person.related_fields?.split("\n").map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {researches.length > 0 && (
        <div className="container my-4">
          <h5>ผลงานวิจัย</h5>
          <ul>
            {researches.map((r, i) => (
              <li key={i}>
                <strong>{r.authors}</strong> ({r.year}) <em>{r.title}</em>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </>
  );
};

export default TeacherInformation;
