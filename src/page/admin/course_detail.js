import React, { useEffect, useState } from "react";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_detail.css";
import api from "../../api/axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const DetailCourse = () => {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [structures, setStructures] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const navigate = useNavigate();

  const deleteCourse = async () => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบหลักสูตรนี้?",
    );
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/admin/course/${id}`);
      console.log("✅ courses from API:", response.data);
      console.log("Course deleted successfully:", response.data);
      alert("ลบหลักสูตรสำเร็จ");
      navigate("/admin/course");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  // const semesterMap = {
  //   11: "ปีที่ 1 ภาคการศึกษาที่ 1",
  //   12: "ปีที่ 1 ภาคการศึกษาที่ 2",
  //   21: "ปีที่ 2 ภาคการศึกษาที่ 1",
  //   22: "ปีที่ 2 ภาคการศึกษาที่ 2",
  //   31: "ปีที่ 3 ภาคการศึกษาที่ 1",
  //   32: "ปีที่ 3 ภาคการศึกษาที่ 2",
  //   41: "ปีที่ 4 ภาคการศึกษาที่ 1",
  //   42: "ปีที่ 4 ภาคการศึกษาที่ 2",
  // };

  // const planTypeMap = {
  //   1: "โครงงานวิจัย",
  //   2: "สหกิจศึกษา",
  // };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const [courseRes, roadmapRes, subjectRes, structureRes] =
          await Promise.all([
            api.get(`/admin/course/${id}`),
            api.get("/admin/roadmap"),
            api.get("/admin/subject"),
            api.get("/admin/structure"),
          ]);

        setCourseDetail(courseRes.data);
        setRoadmap(roadmapRes.data);
        setSubjects(subjectRes.data);
        setStructures(structureRes.data);
      } catch (err) {
        console.error("Error fetching course detail:", err);
      }
    };

    fetchDetail();
  }, [id]);

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
            <div id="group-btn-header-detail">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <div className="edit_detele-position">
                  {courseDetail && (
                    <Link
                      to={`/admin/editcourse/${courseDetail.course_id}`}
                      className="btn btn-warning"
                      id="btn-edit"
                    >
                      แก้ไข
                    </Link>
                  )}
                  {courseDetail && (
                    <div
                      className="btn btn-danger"
                      id="btn-delete"
                      onClick={deleteCourse}
                    >
                      ลบ
                    </div>
                  )}
                </div>
              </div>
              <h3 id="course-name">
                {courseDetail?.thai_course || "กำลังโหลด..."}
              </h3>
            </div>

            {/* ชื่อหลักสูตร */}

            <p id="text-header-coures">รหัสของหลักสูตร</p>
            <div id="text-content-course2">{courseDetail?.course_id}</div>
            <hr />

            <p id="text-header-coures">ชื่อหลักสูตร</p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาไทย
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.thai_course}
                </div>
              </div>
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาอังกฤษ
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.eng_course}
                </div>
              </div>
            </div>
            <hr />

            <p id="text-header-coures">ชื่อปริญญา</p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาไทย
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.thai_degree}
                </div>
              </div>
              <div className="row">
                <div className="col-4" id="text-title-course">
                  ภาษาอังกฤษ
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.eng_degree}
                </div>
              </div>
            </div>
            <hr />

            {/* เกณฑ์ */}
            <p id="text-header-coures">
              เกณฑ์การเข้าศึกษาและเกณฑ์การสำเร็จการศึกษา
            </p>
            <div className="container">
              <div className="row">
                <div className="col-4" id="text-title-course">
                  เกณฑ์การเข้าศึกษา
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.admission_req}
                </div>
              </div>
              <div className="row">
                <div className="col-4" id="text-title-course">
                  เกณฑ์การสำเร็จการศึกษา
                </div>
                <div className="col-6" id="text-content-course">
                  {courseDetail?.graduation_req}
                </div>
              </div>
            </div>
            <hr />

            {/* ปรัชญา */}
            <p id="text-header-coures">ปรัชญาของหลักสูตร</p>
            <div id="text-content-course2">{courseDetail?.philosophy}</div>
            <hr />

            {/* วัตถุประสงค์ */}
            <p id="text-header-coures">วัตถุประสงค์</p>
            <div id="text-content-course2">{courseDetail?.objective}</div>
            <hr />

            {/* PLO */}
            <p id="text-header-coures">
              รายละเอียดผลการเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning
              Outcome: PLOs)
            </p>
            <div id="text-content-course2">
              <pre style={{ textAlign: "left" }}>{courseDetail?.plo}</pre>
            </div>
            <hr />

            {/* ค่าใช้จ่าย */}
            <p id="text-header-coures">ค่าใช้จ่าย</p>
            <div id="text-content-course2">{courseDetail?.tuition}</div>
            <hr />

            {/* หน่วยกิต */}
            <p id="text-header-coures">หน่วยกิต</p>
            <div id="text-content-course2">{courseDetail?.credits}</div>
            <hr />

            {/* อาชีพ */}
            <p id="text-header-coures">อาชีพที่สามารถประกอบได้</p>
            <div id="text-content-course2">{courseDetail?.career_paths}</div>
            <hr />

            {/* รายละเอียดเพิ่มเติม */}
            <p id="text-header-coures">รายละเอียดเพิ่มเติม</p>
            <a
              href={courseDetail?.detail_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {courseDetail?.detail_url}
            </a>
            <br />
            <hr />
            <p id="text-header-coures">โครงสร้างหลักสูตร</p>
            <div className="structure-images">
              {(structures || [])
                .filter((st) => st.course_id === courseDetail?.course_id) // กรองตาม course_id
                .map((st) => (
                  <div
                    key={st.course_structure_id}
                    style={{ marginBottom: "20px" }}
                  >
                    <img
                      src={st.course_structure_url}
                      alt={st.thai_course}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ))}
            </div>
            <hr />

            <p id="text-header-coures">แผนการศึกษา</p>
            <div className="structure-images">
              {(roadmap || [])
                .filter((rp) => rp.course_id === courseDetail?.course_id)
                .map((rp) => (
                  <div key={rp.roadmap_id} style={{ marginBottom: "20px" }}>
                    <img
                      src={rp.roadmap_url}
                      alt={rp.thai_course}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ))}
            </div>

            <br></br>
            <hr />

            <p id="text-header-coures">รายวิชาของหลักสูตร</p>

            {subjects.length === 0 ? (
              <p>กำลังโหลดรายวิชา...</p>
            ) : (
              (() => {
                // กรองรายวิชาเฉพาะของ course_id ที่เลือก
                const filteredSubjects = subjects.filter(
                  (subj) => subj.course_id === courseDetail?.course_id, // <-- สมมติคุณได้ courseId จาก props หรือ useParams
                );
                // แยกกลุ่มตาม semester
                const semesterGroups = filteredSubjects.reduce((acc, subj) => {
                  const sem = subj.semester || "ไม่ระบุภาคเรียน";
                  if (!acc[sem]) acc[sem] = [];
                  acc[sem].push(subj);
                  return acc;
                }, {});

                // เรียง semester ตามปีและภาค
                const sortedSemesters = Object.keys(semesterGroups).sort(
                  (a, b) => {
                    const regex = /ปีที่ (\d+) ภาคการศึกษาที่ (\d+)/;
                    const matchA = a.match(regex);
                    const matchB = b.match(regex);

                    if (matchA && matchB) {
                      const yearA = parseInt(matchA[1]);
                      const semA = parseInt(matchA[2]);
                      const yearB = parseInt(matchB[1]);
                      const semB = parseInt(matchB[2]);

                      if (yearA !== yearB) return yearA - yearB;
                      return semA - semB;
                    }
                    return 0; // ถ้าไม่ match regex
                  },
                );

                return sortedSemesters.map((semester) => {
                  // แยกตาม plan_type
                  const planGroups = semesterGroups[semester].reduce(
                    (acc, subj) => {
                      const plan = subj.plan_type || "ไม่ระบุแผน";
                      if (!acc[plan]) acc[plan] = [];
                      acc[plan].push(subj);
                      return acc;
                    },
                    {},
                  );

                  return (
                    <div key={semester} style={{ marginBottom: "25px" }}>
                      <h5>{semester}</h5>
                      {Object.keys(planGroups).map((plan) => (
                        <div key={plan} style={{ marginBottom: "15px" }}>
                          <strong>แผน: {plan}</strong>
                          <table className="table table-bordered mt-2">
                            <thead>
                              <tr>
                                <th style={{ width: "10%" }}>รหัสวิชา</th>
                                <th>ชื่อวิชา</th>
                                <th style={{ width: "20%" }}>หน่วยกิต</th>
                              </tr>
                            </thead>
                            <tbody>
                              {planGroups[plan].map((subj, index) => (
                                <tr key={subj.subject_id}>
                                  <td>
                                    <Link
                                      to={`/admin/subject/${subj.subject_id}`}
                                    >
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
                  );
                });
              })()
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailCourse;
