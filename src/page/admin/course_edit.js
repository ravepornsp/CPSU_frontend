import React, { useState, useEffect } from "react";
import "../../css/admin/course_add.css";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AdminLayout from "../../layout/AdminLayout";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [structure, setStructure] = useState("");
  const [structureId, setStructureId] = useState(null);
  const [structureFile, setStructureFile] = useState(null);

  const [roadmap, setRoadmap] = useState([]);
  const [roadmapFile, setRoadmapFile] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const course = await api.get(`/admin/course/${id}`);
        const structureRes = await api.get(`/admin/structure`, {
          params: { course_id: id },
        });
        const roadmapRes = await api.get(`/admin/roadmap`, {
          params: { course_id: id },
        });

        setFormData(course.data);

        if (Array.isArray(structureRes.data) && structureRes.data.length > 0) {
          setStructure(structureRes.data[0].detail);
          setStructureId(structureRes.data[0].course_structure_id);
        }

        setRoadmap(Array.isArray(roadmapRes.data) ? roadmapRes.data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setRoadmapFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/admin/course/${id}`, {
        ...formData,
        year: Number(formData.year),
      });

      if (structureFile) {
        const form = new FormData();

        form.append("course_id", id);
        form.append("detail", structureFile);

        if (structureId) {
          await api.put(`/admin/structure/${structureId}`, form);
        } else {
          await api.post("/admin/structure", form);
        }
      }

      if (roadmapFile) {
        const form = new FormData();

        form.append("course_id", id);
        form.append("roadmap_url", roadmapFile);

        await api.post(`/admin/roadmap`, form);
      }

      alert("แก้ไขสำเร็จ");

      navigate(`/admin/course/${id}`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  const handleStructureFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("กรุณาอัปโหลดไฟล์ Excel (.xlsx หรือ .xls)");
      e.target.value = "";
      return;
    }

    setStructureFile(file);
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <h3 className="mb-4">แก้ไขหลักสูตร</h3>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>สถานะ</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="แสดง">แสดง</option>
                  <option value="ไม่แสดง">ไม่แสดง</option>
                </select>
              </div>

              <div className="mb-3">
                <label>รหัสหลักสูตร</label>
                <input
                  className="form-control"
                  name="course_id"
                  value={formData.course_id}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label>ระดับปริญญา</label>
                <select
                  className="form-control"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                >
                  <option value="">--เลือก--</option>
                  <option value="ปริญญาตรี">ปริญญาตรี</option>
                  <option value="ปริญญาโท">ปริญญาโท</option>
                  <option value="ปริญญาเอก">ปริญญาเอก</option>
                </select>
              </div>

              <div className="mb-3">
                <label>ปีหลักสูตร</label>
                <input
                  type="number"
                  className="form-control"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>สาขา</label>
                <input
                  className="form-control"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ชื่อหลักสูตร (ไทย)</label>
                <input
                  className="form-control"
                  name="thai_course"
                  value={formData.thai_course}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ชื่อหลักสูตร (อังกฤษ)</label>
                <input
                  className="form-control"
                  name="eng_course"
                  value={formData.eng_course}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ชื่อปริญญา (ไทย)</label>
                <input
                  className="form-control"
                  name="thai_degree"
                  value={formData.thai_degree}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ชื่อปริญญา (อังกฤษ)</label>
                <input
                  className="form-control"
                  name="eng_degree"
                  value={formData.eng_degree}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>คุณสมบัติผู้สมัคร</label>
                <textarea
                  className="form-control"
                  name="admission_req"
                  value={formData.admission_req}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>เงื่อนไขการสำเร็จการศึกษา</label>
                <textarea
                  className="form-control"
                  name="graduation_req"
                  value={formData.graduation_req}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ปรัชญา</label>
                <textarea
                  className="form-control"
                  name="philosophy"
                  value={formData.philosophy}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>วัตถุประสงค์</label>
                <textarea
                  className="form-control"
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>ค่าเทอม</label>
                <input
                  className="form-control"
                  name="tuition"
                  value={formData.tuition}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>จำนวนหน่วยกิต</label>
                <input
                  className="form-control"
                  name="credits"
                  value={formData.credits}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>อาชีพที่สามารถประกอบได้</label>
                <textarea
                  className="form-control"
                  name="career_paths"
                  value={formData.career_paths}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>PLO</label>
                <textarea
                  className="form-control"
                  name="plo"
                  value={formData.plo}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label>URL รายละเอียด</label>
                <input
                  className="form-control"
                  name="detail_url"
                  value={formData.detail_url}
                  onChange={handleChange}
                />
              </div>
              <hr></hr>
              <div className="mb-4">
                <label>โครงสร้างหลักสูตร</label>

                {/* Structure */}
                {/* Structure */}
                <div className="mb-4">
                  <label className="form-label">
                    โครงสร้างหลักสูตร (Excel)
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept=".xlsx,.xls"
                    onChange={handleStructureFileChange}
                  />

                  {structureFile && (
                    <p className="text-success text-start mt-2">
                      ไฟล์ที่เลือก : {structureFile.name}
                    </p>
                  )}

                  <a
                    href="/structure_template.xlsx"
                    download
                    className="form-label ms-1"
                  >
                    <p className="text-start">ดาวน์โหลด Template Excel</p>
                  </a>
                </div>
              </div>
              <hr></hr>
              <div className="mb-4">
                <label>แผนการศึกษา</label>
                <br></br>

                {roadmap.map((r) => (
                  <img
                    key={r.roadmap_id}
                    src={r.roadmap_url}
                    alt="roadmap"
                    className="img-fluid border mb-3"
                  />
                ))}

                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(`/admin/course/${id}`)}
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "กำลังบันทึก" : "บันทึก"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditCourse;
