import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/subject.css";

const Subject_edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [courseOptions, setCourseOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/admin/course");
        setCourseOptions(res.data);
      } catch (err) {
        console.error("Error loading courses", err);
      }
    };

    const fetchSubject = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/admin/subject/${id}`);
        setFormData({
          subject_id: res.data.subject_id || "",
          thai_subject: res.data.thai_subject || "",
          eng_subject: res.data.eng_subject || "",
          credits: res.data.credits || "",
          semester_id: res.data.semester_id ? res.data.semester_id.toString() : "",
          compulsory_subject: res.data.compulsory_subject || "",
          condition: res.data.condition || "",
          description_thai: res.data.description_thai || "",
          description_eng: res.data.description_eng || "",
          clo: res.data.clo || "",
          course_id: res.data.course_id || "",
          plan_type_id: res.data.plan_type_id ? res.data.plan_type_id.toString() : "",
        });
      } catch (err) {
        console.error("Error loading subject data", err);
        setError("ไม่พบข้อมูลรายวิชาหรือเกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    fetchSubject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const cleanData = {
        ...formData,
        semester_id: parseInt(formData.semester_id),
        plan_type_id: parseInt(formData.plan_type_id),
        compulsory_subject:
          formData.compulsory_subject.trim() === "" ? "-" : formData.compulsory_subject,
        condition: formData.condition.trim() === "" ? "-" : formData.condition,
        clo: formData.clo.trim() === "" ? "-" : formData.clo,
      };

      await axios.put(`http://localhost:8080/api/v1/admin/subject/${id}`, cleanData);
      alert("แก้ไขข้อมูลรายวิชาสำเร็จ");
      navigate("/admin/subject");
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  const handleCancel = () => {
    navigate("/admin/subject");
  };

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8 text-start">
            <h2>แก้ไขข้อมูลรายวิชา</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label>หลักสูตร (Course)</label>
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
                  type="text"
                  name="subject_id"
                  value={formData.subject_id}
                  className="form-control"
                  disabled
                />
              </div>

              <div className="mb-3">
                <label>ชื่อรายวิชา (ภาษาไทย)</label>
                <input
                  type="text"
                  name="thai_subject"
                  value={formData.thai_subject}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label>ชื่อรายวิชา (ภาษาอังกฤษ)</label>
                <input
                  type="text"
                  name="eng_subject"
                  value={formData.eng_subject}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>หน่วยกิต</label>
                <input
                  type="text"
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
                  <option value="">-- เลือกภาคการศึกษา --</option>
                  <option value="11">ปีที่ 1 ภาคการศึกษาที่ 1</option>
                  <option value="12">ปีที่ 1 ภาคการศึกษาที่ 2</option>
                  <option value="21">ปีที่ 2 ภาคการศึกษาที่ 1</option>
                  <option value="22">ปีที่ 2 ภาคการศึกษาที่ 2</option>
                  <option value="31">ปีที่ 3 ภาคการศึกษาที่ 1</option>
                  <option value="32">ปีที่ 3 ภาคการศึกษาที่ 2</option>
                  <option value="41">ปีที่ 4 ภาคการศึกษาที่ 1</option>
                  <option value="42">ปีที่ 4 ภาคการศึกษาที่ 2</option>
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
                  <option value="">-- เลือกแผนการศึกษา --</option>
                  <option value="1">โครงงานวิจัย</option>
                  <option value="2">สหกิจศึกษา</option>
                </select>
              </div>

              <div className="mb-3">
                <label>วิชาบังคับ (ถ้ามี)</label>
                <input
                  type="text"
                  name="compulsory_subject"
                  value={formData.compulsory_subject}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="เช่น CS517XXX ชื่อรายวิชา, IT520XXX ชื่อรายวิชา"
                />
              </div>

              <div className="mb-3">
                <label>เงื่อนไข (Prerequisites)</label>
                <input
                  type="text"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label>คำอธิบายรายวิชา (ภาษาไทย)</label>
                <textarea
                  name="description_thai"
                  value={formData.description_thai}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <label>Course Description (English)</label>
                <textarea
                  name="description_eng"
                  value={formData.description_eng}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                />
              </div>

              <div className="mb-3">
                <label>CLOs</label>
                <textarea
                  name="clo"
                  value={formData.clo}
                  onChange={handleChange}
                  className="form-control"
                  rows={5}
                  placeholder="CLOXX XXXXXXXXXX"
                />
              </div>

              <button type="submit" className="btn btn-success me-2">
                บันทึก
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Subject_edit;
