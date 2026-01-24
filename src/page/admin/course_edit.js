import React, { useState } from "react";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_detail.css";
import api from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

  /* ---------------- fetch ---------------- */
  const fetchCourseData = async () => {
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

      alert("แก้ไขหลักสูตรสำเร็จ");
      navigate("/admin/course");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
  };

  const onRoadmapImagesChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("course_id", formData.course_id);
    fd.append("roadmap_url", file);

    try {
      await api.post("/admin/roadmap", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("อัปโหลดแผนการเรียนสำเร็จ");
      fetchCourseData();
    } catch (err) {
      console.error(err);
      alert("อัปโหลดไม่สำเร็จ");
    }
  };

  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9 text-start">
            <h4 className="mb-4">{formData.thai_course}</h4>

            {/* STATUS */}
            <p>สถานะ</p>
            <select
              className="form-control mb-3"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="แสดง">แสดง</option>
              <option value="ไม่แสดง">ไม่แสดง</option>
            </select>

            {/* BASIC */}
            <p>รหัสหลักสูตร</p>
            <input
              className="form-control mb-3"
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
            />

            <p>ระดับปริญญา</p>
            <select
              className="form-control mb-3"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
            >
              <option value="">-- เลือกระดับปริญญา --</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ปริญญาโท">ปริญญาโท</option>
              <option value="ปริญญาเอก">ปริญญาเอก</option>
            </select>

            <p>สาขา</p>
            <input
              className="form-control mb-3"
              name="major"
              value={formData.major}
              onChange={handleChange}
            />

            <p>ปีหลักสูตร</p>
            <input
              type="number"
              className="form-control mb-3"
              name="year"
              value={formData.year}
              onChange={handleChange}
            />

            {/* COURSE NAME */}
            <p>ชื่อหลักสูตร (TH)</p>
            <input
              className="form-control mb-3"
              name="thai_course"
              value={formData.thai_course}
              onChange={handleChange}
            />

            <p>ชื่อหลักสูตร (EN)</p>
            <input
              className="form-control mb-3"
              name="eng_course"
              value={formData.eng_course}
              onChange={handleChange}
            />

            {/* DEGREE NAME */}
            <p>ชื่อปริญญา (TH)</p>
            <input
              className="form-control mb-3"
              name="thai_degree"
              value={formData.thai_degree}
              onChange={handleChange}
            />

            <p>ชื่อปริญญา (EN)</p>
            <input
              className="form-control mb-3"
              name="eng_degree"
              value={formData.eng_degree}
              onChange={handleChange}
            />

            {/* TEXT */}
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
                <p>{label}</p>
                <textarea
                  className="form-control"
                  rows={4}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            {/* STRUCTURE */}
            <hr />
            <p>โครงสร้างหลักสูตร</p>
            <CKEditor
              editor={ClassicEditor}
              data={structure}
              onChange={(e, editor) => setStructure(editor.getData())}
            />

            {/* ROADMAP */}
            <hr />
            <p>แผนการเรียน</p>
            {roadmap.map((r, i) => (
              <img
                key={i}
                src={r.roadmap_url}
                alt="roadmap"
                style={{ maxWidth: "100%" }}
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditCourse;
