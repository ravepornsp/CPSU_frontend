import React, { useState } from "react";
import "../../css/admin/course_add.css";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AdminLayout from "../../layout/AdminLayout";

const AddCourse = () => {
  const [structure, setStructure] = useState("");
  const [roadmapFile, setRoadmapFile] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    course_id: "",
    degree: "",
    major: "",
    year: "",
    thai_course: "",
    eng_course: "",
    thai_degree: "",
    eng_degree: "",
    admission_req: "",
    graduation_req: "",
    philosophy: "",
    objective: "",
    tuition: "",
    credits: "",
    career_paths: "",
    plo: "",
    detail_url: "",
    status: "แสดง",
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "roadmap") {
      setRoadmapFile(files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.major.trim()) {
      alert("กรุณากรอกสาขาก่อนบันทึก");
      return;
    }

    const payload = {
      ...formData,
      year: Number(formData.year),
    };

    try {
      const courseRes = await api.post("/admin/course", payload);
      const courseId = courseRes.data.course_id;

      if (structure) {
        await api.post("/admin/structure", {
          course_id: courseId,
          detail: structure,
        });
      }

      if (roadmapFile) {
        const form = new FormData();
        form.append("course_id", courseId);
        form.append("roadmap_url", roadmapFile);
        await api.post("/admin/roadmap", form);
      }

      navigate("/admin/course");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">

        <h3 className="mb-4">เพิ่มหลักสูตร</h3>

        <form onSubmit={handleSubmit}>

          {/* Status */}
          <div className="mb-3">
            <label className="form-label">สถานะ</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="แสดง">แสดง</option>
              <option value="ไม่แสดง">ไม่แสดง</option>
            </select>
          </div>

          {/* Course ID */}
          <div className="mb-3">
            <label className="form-label">รหัสหลักสูตร</label>
            <input
              className="form-control"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              required
            />
          </div>

          {/* Degree */}
          <div className="mb-3">
            <label className="form-label">ระดับปริญญา</label>
            <select
              className="form-control"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
            >
              <option value="">-- เลือกระดับปริญญา --</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ปริญญาโท">ปริญญาโท</option>
              <option value="ปริญญาเอก">ปริญญาเอก</option>
            </select>
          </div>

          {/* Year */}
          <div className="mb-3">
            <label className="form-label">หลักสูตรของปี</label>
            <input
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
              type="number"
              min="1"
              required
            />
          </div>

          {/* Major */}
          <div className="mb-3">
            <label className="form-label">สาขา</label>
            <input
              className="form-control"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
            />
          </div>

          {/* CKEditor Structure */}
          <div className="mb-4">
            <label className="form-label">โครงสร้างหลักสูตร</label>
            <CKEditor
              editor={ClassicEditor}
              data={structure}
              onChange={(event, editor) =>
                setStructure(editor.getData())
              }
            />
          </div>

          {/* Roadmap */}
          <div className="mb-4">
            <label className="form-label">แผนการศึกษา</label>
            <input
              type="file"
              className="form-control"
              name="roadmap"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            บันทึกข้อมูลหลักสูตร
          </button>

        </form>

      </div>
    </AdminLayout>
  );
};

export default AddCourse;
