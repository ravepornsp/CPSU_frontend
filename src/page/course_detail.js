import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import "../css/course_detail.css";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";

const Course_detail = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [structure, setStructure] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // ดึงข้อมูลหลักสูตร
        const courseRes = await axios.get("https://vibrant-connection-production.up.railway.app/api/v1/course");
        const courses = Array.isArray(courseRes.data) ? courseRes.data : [];
        const foundCourse = courses.find((c) => c.course_id === course_id);
        setCourse(foundCourse || null);

        // ดึงข้อมูลโครงสร้างหลักสูตร
        const structureRes = await axios.get("https://vibrant-connection-production.up.railway.app/api/v1/structure");
        const structures = Array.isArray(structureRes.data) ? structureRes.data : [];
        const foundStructure = structures.find((s) => s.course_id === course_id);
        if (foundStructure && foundStructure.detail) {
          const parsedStructure = foundStructure.detail.split("\n").map((line) => {
            const [no, name, plan, credit, level] = line.split("|");
            return { no, name, plan, credit, level: Number(level) };
          });
          setStructure(parsedStructure);
        } else {
          setStructure([]);
        }

        // ดึงข้อมูล roadmap
        const roadmapRes = await axios.get("https://vibrant-connection-production.up.railway.app/api/v1/roadmap");
        const roadmaps = Array.isArray(roadmapRes.data) ? roadmapRes.data : [];
        const foundRoadmap = roadmaps.find((r) => r.course_id === course_id);
        setRoadmap(foundRoadmap || null);

        // ดึงข้อมูลรายวิชา
        const subjectsRes = await axios.get("https://vibrant-connection-production.up.railway.app/api/v1/subject");
        const subjectsData = Array.isArray(subjectsRes.data) ? subjectsRes.data : [];
        const filteredSubjects = subjectsData.filter((subj) => subj.course_id === course_id);
        setSubjects(filteredSubjects);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("ไม่พบข้อมูลหลักสูตรที่ต้องการ");
        setLoading(false);
      }
    };

    fetchData();
  }, [course_id]);

  // จัดกลุ่มรายวิชาตามปี-เทอม-แผน
  const groupSubjectsByYearSemesterAndPlan = (subjects) => {
    const grouped = {};
    subjects.forEach((subj) => {
      const year = subj.study_year || "ปีไม่ระบุ";
      const semester = subj.semester || "เทอมไม่ระบุ";
      const plan = subj.plan_type || "ทั่วไป";
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][semester]) grouped[year][semester] = {};
      if (!grouped[year][semester][plan]) grouped[year][semester][plan] = [];
      grouped[year][semester][plan].push(subj);
    });
    return grouped;
  };

  const groupedSubjects = groupSubjectsByYearSemesterAndPlan(subjects);

  const tabs = [
    { key: "overview", label: "ภาพรวมหลักสูตร", show: course !== null },
    { key: "structure", label: "โครงสร้างหลักสูตร", show: structure.length > 0 },
    { key: "roadmap", label: "แผนผังหลักสูตร", show: roadmap && roadmap.roadmap_url },
    { key: "subjects", label: "รายวิชา", show: subjects.length > 0 },
  ].filter((tab) => tab.show);

  useEffect(() => {
    if (!tabs.find((tab) => tab.key === activeTab)) {
      setActiveTab(tabs[0]?.key || "overview");
    }
  }, [tabs, activeTab]);

  if (loading)
    return (
      <>
        <Headers />
        <Navbar />
        <div className="container text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">กำลังโหลดข้อมูลหลักสูตร...</p>
        </div>
        <Footer />
      </>
    );

  if (!course)
    return (
      <>
        <Headers />
        <Navbar />
        <div className="container text-center my-5">
          <h3>{error || "ไม่พบหลักสูตรที่คุณเลือก"}</h3>
          <Link to="/course">กลับไปหน้ารายการหลักสูตร</Link>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Headers />
      <Navbar />
      <Breadcrumb
        items={[
          { label: "หลักสูตร", path: "/course" },
          { label: course?.thai_course || "รายละเอียดหลักสูตร" },
        ]}
      />
      <div className="container my-5">
        <h2>{course.thai_course} ({course.year})</h2>
        <h4>{course.eng_course}</h4>
        <h5>{course.degree}</h5>

        {/* Tab navigation */}
        <ul className="nav nav-tabs">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content mt-3">
          {/* Overview */}
          {activeTab === "overview" && (
            <div>
              <div className="mb-3">
                <h4>ชื่อหลักสูตร</h4>
                <div style={{ display: "flex" }}>
                  <h5 style={{ width: "150px" }}>ภาษาไทย</h5>
                  <p>{course.thai_course}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <h5 style={{ width: "150px" }}>ภาษาอังกฤษ</h5>
                  <p>{course.eng_course}</p>
                </div>
              </div>

              <hr />
              <div className="mb-3">
                <h4>ชื่อปริญญา</h4>
                <div style={{ display: "flex" }}>
                  <h5 style={{ width: "150px" }}>ภาษาไทย</h5>
                  <p>{course.thai_degree}</p>
                </div>
                <div style={{ display: "flex" }}>
                  <h5 style={{ width: "150px" }}>ภาษาอังกฤษ</h5>
                  <p>{course.eng_degree}</p>
                </div>
              </div>

              <hr />
              <div className="mb-3">
                <h4>เกณฑ์การเข้าศึกษาและเกณฑ์การสำเร็จการศึกษา</h4>
                <div>
                  <h5>เกณฑ์การเข้าศึกษา</h5>
                  <p>{course.admission_req}</p>
                </div>
                <div>
                  <h5>เกณฑ์การสำเร็จการศึกษา</h5>
                  <p>{course.graduation_req}</p>
                </div>
              </div>

              <hr />
              <div className="mb-3">
                <h5>ปรัชญาของหลักสูตร</h5>
                <p>{course.philosophy}</p>
              </div>
              <hr />
              <div className="mb-3">
                <h5>วัตถุประสงค์</h5>
                <p>{course.objective}</p>
              </div>
              <hr />
              <div className="mb-3">
                <h5>ค่าใช้จ่าย</h5>
                <p>{course.tuition}</p>
              </div>
              <hr />
              <div className="mb-3">
                <h5>หน่วยกิต</h5>
                <p>{course.credits}</p>
              </div>
              <hr />
              <div className="mb-3">
                <h5>อาชีพที่สามารถประกอบได้หลังสำเร็จการศึกษา</h5>
                {course.career_paths?.split("\n").map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <hr />
              <div className="mb-3">
                <h5>รายละเอียดผลการเรียนรู้ที่คาดหวังของหลักสูตร (PLOs)</h5>
                {course.plo?.split("\n").map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
              <hr />
              <div className="mb-3">
                <h5>รายละเอียดเพิ่มเติม</h5>
                {course.detail_url && (
                  <a href={course.detail_url} target="_blank" rel="noopener noreferrer">
                    {course.detail_url}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Structure */}
          {activeTab === "structure" && structure.length > 0 && (
            <div>
              <h4>โครงสร้างหลักสูตร</h4>
              <div style={{ fontSize: "18px", margin: "30px" }}>
                {structure.map((row, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: `${(row.level - 1) * 35}px`,
                      fontWeight: [1, 2].includes(row.level) ? "bold" : "normal",
                      marginBottom: "4px",
                    }}
                  >
                    <div>{row.no} {row.name}</div>
                    <div style={{ width: "150px", textAlign: "left", fontWeight: "bold" }}>
                      {row.credit}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roadmap */}
          {activeTab === "roadmap" && roadmap && roadmap.roadmap_url && (
            <div>
              <h4>แผนผังหลักสูตร</h4>
              <div className="my-3 text-center">
                <img
                  src={roadmap.roadmap_url}
                  alt="แผนผังหลักสูตร"
                  className="img-fluid border rounded"
                />
              </div>
            </div>
          )}

          {/* Subjects */}
          {activeTab === "subjects" && subjects.length > 0 && (
            <div>
              <h4>รายวิชาในหลักสูตร</h4>
              {Object.entries(groupedSubjects).map(([year, semesters]) => (
                <div key={year} style={{ marginBottom: "2rem" }}>
                  <h5>{year}</h5>
                  {Object.entries(semesters).map(([semester, plans]) => (
                    <div key={semester} style={{ marginBottom: "1rem" }}>
                      <h6>{semester}</h6>
                      {Object.entries(plans).map(([plan, subs]) => (
                        <div key={plan} style={{ marginBottom: "1rem" }}>
                          <h6 style={{ fontWeight: "bold" }}>{plan}</h6>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>รหัสรายวิชา</th>
                                <th>ชื่อวิชา</th>
                                <th>หน่วยกิต</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subs.map((subj) => (
                                <tr key={subj.subject_id}>
                                  <td>
                                    {["SUxxx", "SUXXX", "------"].includes(subj.subject_id)
                                      ? subj.subject_id
                                      : <Link to={`/subject/${subj.id}`}>{subj.subject_id}</Link>
                                    }
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
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Course_detail;
