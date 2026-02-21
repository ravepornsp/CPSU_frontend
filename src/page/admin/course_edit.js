import React, { useState, useEffect } from "react";
import "../../css/admin/course_detail.css";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AdminLayout from "../../layout/AdminLayout";
import { useCallback } from "react";

const EditCourse = () => {
  const { id } = useParams();
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

  const [structure, setStructure] = useState("");
  const [structureId, setStructureId] = useState(null);
  const [roadmap, setRoadmap] = useState([]);

  /* ---------------- FETCH ---------------- */
  const fetchCourseData = useCallback(async () => {
    try {
      const courseRes = await api.get(`/admin/course/${id}`);
      setFormData(courseRes.data);

      const structureRes = await api.get("/admin/structure", {
        params: { course_id: id },
      });

      if (structureRes.data.length > 0) {
        setStructure(structureRes.data[0].detail);
        setStructureId(structureRes.data[0].structure_id);
      }

      const roadmapRes = await api.get("/admin/roadmap", {
        params: { course_id: id },
      });

      setRoadmap(roadmapRes.data);
    } catch (err) {
      console.error("fetch error:", err);
    }
  }, [id]); // 👈 dependency ที่แท้จริง

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]); // 👈 ใส่ให้ครบ

  /* ---------------- CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- SAVE ---------------- */
  const saveChanges = async () => {
    try {
      await api.put(`/admin/course/${id}`, {
        ...formData,
        year: Number(formData.year),
      });

      if (structure) {
        if (structureId) {
          await api.put(`/admin/structure/${structureId}`, {
            course_id: id,
            detail: structure,
          });
        } else {
          await api.post("/admin/structure", {
            course_id: id,
            detail: structure,
          });
        }
      }

      navigate(`/admin/course/${id}`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  /* ---------------- ROADMAP UPLOAD ---------------- */
  const onRoadmapImagesChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("course_id", formData.course_id);
    fd.append("roadmap_url", file);

    try {
      await api.post("/admin/roadmap", fd);
      fetchCourseData();
    } catch (err) {
      console.error(err);
      alert("อัปโหลดไม่สำเร็จ");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h4 className="mb-4">แก้ไขหลักสูตร</h4>

        {/* STATUS */}
        <div className="mb-3">
          <label className="form-label">สถานะ</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="แสดง">แสดง</option>
            <option value="ไม่แสดง">ไม่แสดง</option>
          </select>
        </div>

        {/* Dynamic Textareas */}
        {[
          ["admission_req", "เกณฑ์การเข้าศึกษา"],
          ["graduation_req", "เกณฑ์สำเร็จการศึกษา"],
          ["philosophy", "ปรัชญา"],
          ["objective", "วัตถุประสงค์"],
          ["plo", "PLO"],
          ["career_paths", "อาชีพ"],
          ["tuition", "ค่าใช้จ่าย"],
          ["credits", "หน่วยกิต"],
          ["detail_url", "รายละเอียดเพิ่มเติม"],
        ].map(([name, label]) => (
          <div key={name} className="mb-3">
            <label className="form-label">{label}</label>
            <textarea
              className="form-control"
              rows={4}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <hr />

        {/* STRUCTURE */}
        <h5>โครงสร้างหลักสูตร</h5>
        <CKEditor
          editor={ClassicEditor}
          data={structure}
          onChange={(e, editor) => setStructure(editor.getData())}
        />

        <hr />

        {/* ROADMAP */}
        <h5>แผนการเรียน</h5>
        {roadmap.map((r) => (
          <img
            key={r.roadmap_id}
            src={r.roadmap_url}
            alt="roadmap"
            className="img-fluid mb-3 border"
          />
        ))}

        <input
          type="file"
          className="form-control mt-2"
          onChange={onRoadmapImagesChange}
        />

        <hr />

        <button className="btn btn-primary" onClick={saveChanges}>
          บันทึกการแก้ไข
        </button>
      </div>
    </AdminLayout>
  );
};

export default EditCourse;
