import React, { useState, useEffect, useMemo } from "react";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";
import "../../css/admin/subject.css";

const SubjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [courseOptions, setCourseOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    subject_id: "",
    thai_subject: "",
    eng_subject: "",
    credits: "",
    semester_id: "",
    compulsory_subject: "",
    condition: "",
    description_thai: "",
    description_eng: "",
    clo: "",
    course_id: "",
    plan_type_id: "",
  });

  /* ================= Reverse Map ================= */

  const semesterReverseMap = useMemo(
    () => ({
      "ปีที่ 1 ภาคการศึกษาที่ 1": "11",
      "ปีที่ 1 ภาคการศึกษาที่ 2": "12",
      "ปีที่ 2 ภาคการศึกษาที่ 1": "21",
      "ปีที่ 2 ภาคการศึกษาที่ 2": "22",
      "ปีที่ 3 ภาคการศึกษาที่ 1": "31",
      "ปีที่ 3 ภาคการศึกษาที่ 2": "32",
      "ปีที่ 4 ภาคการศึกษาที่ 1": "41",
      "ปีที่ 4 ภาคการศึกษาที่ 2": "42",
    }),
    []
  );

  const planTypeReverseMap = useMemo(
    () => ({
      โครงงานวิจัย: "1",
      สหกิจศึกษา: "2",
    }),
    []
  );

  /* ================= Load Courses ================= */

  useEffect(() => {
    api
      .get("/admin/course")
      .then((res) => setCourseOptions(res.data))
      .catch((err) => console.error(err));
  }, []);

  /* ================= Load Subject ================= */

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await api.get(`/admin/subject/${id}`);
        const s = res.data;

        setFormData({
          subject_id: s.subject_id || "",
          thai_subject: s.thai_subject || "",
          eng_subject: s.eng_subject || "",
          credits: s.credits || "",
          semester_id: semesterReverseMap[s.semester] || "",
          plan_type_id: planTypeReverseMap[s.plan_type] || "",
          compulsory_subject: s.compulsory_subject || "",
          condition: s.condition || "",
          description_thai: s.description_thai || "",
          description_eng: s.description_eng || "",
          clo: s.clo || "",
          course_id: s.course_id || "",
        });
      } catch (err) {
        console.error(err);
        setError("ไม่พบข้อมูลรายวิชา");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id, semesterReverseMap, planTypeReverseMap]);

  /* ================= Handle Change ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= Submit ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        subject_id: formData.subject_id,
        thai_subject: formData.thai_subject,
        eng_subject: formData.eng_subject,
        credits: formData.credits,
        course_id: formData.course_id,
        semester: Object.keys(semesterReverseMap).find(
          (key) => semesterReverseMap[key] === formData.semester_id
        ),
        plan_type: Object.keys(planTypeReverseMap).find(
          (key) => planTypeReverseMap[key] === formData.plan_type_id
        ),
        compulsory_subject: formData.compulsory_subject.trim() || "-",
        condition: formData.condition.trim() || "-",
        description_thai: formData.description_thai,
        description_eng: formData.description_eng,
        clo: formData.clo.trim() || "-",
      };

      await api.put(`/admin/subject/${id}`, payload);
      alert("แก้ไขรายวิชาสำเร็จ");
      navigate("/admin/subject");
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  /* ================= Loading ================= */

  if (loading) {
    return (
      <AdminLayout>
        <div className="container-fluid text-center mt-5">
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </AdminLayout>
    );
  }

  /* ================= Render ================= */

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-4">แก้ไขรายวิชา</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Course */}
              <div className="mb-3">
                <label>หลักสูตร</label>
                <select
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- เลือกหลักสูตร --</option>
                  {courseOptions.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.thai_course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>รหัสรายวิชา</label>
                <input
                  name="subject_id"
                  value={formData.subject_id}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label>ชื่อรายวิชา (ไทย)</label>
                <input
                  name="thai_subject"
                  value={formData.thai_subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>ชื่อรายวิชา (อังกฤษ)</label>
                <input
                  name="eng_subject"
                  value={formData.eng_subject}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>หน่วยกิต</label>
                <input
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>ชั้นปีและภาคการศึกษา</label>
                <select
                  name="semester_id"
                  value={formData.semester_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- เลือก --</option>
                  <option value="11">ปี 1 เทอม 1</option>
                  <option value="12">ปี 1 เทอม 2</option>
                  <option value="21">ปี 2 เทอม 1</option>
                  <option value="22">ปี 2 เทอม 2</option>
                  <option value="31">ปี 3 เทอม 1</option>
                  <option value="32">ปี 3 เทอม 2</option>
                  <option value="41">ปี 4 เทอม 1</option>
                  <option value="42">ปี 4 เทอม 2</option>
                </select>
              </div>

              <div className="mb-3">
                <label>แผนการศึกษา</label>
                <select
                  name="plan_type_id"
                  value={formData.plan_type_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- เลือก --</option>
                  <option value="1">โครงงานวิจัย</option>
                  <option value="2">สหกิจศึกษา</option>
                </select>
              </div>

              <div className="mb-3">
                <label>วิชาบังคับ</label>
                <input
                  name="compulsory_subject"
                  value={formData.compulsory_subject}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>เงื่อนไข</label>
                <input
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>คำอธิบาย (ไทย)</label>
                <textarea
                  name="description_thai"
                  value={formData.description_thai}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>คำอธิบาย (อังกฤษ)</label>
                <textarea
                  name="description_eng"
                  value={formData.description_eng}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>CLO</label>
                <textarea
                  name="clo"
                  value={formData.clo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mt-3">
                <button className="btn btn-success me-2">บันทึก</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/admin/subject")}
                >
                  ยกเลิก
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubjectEdit;
