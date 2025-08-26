import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_edit.css"

const Edit_course = () => {
  const { id } = useParams(); // รับ course_id จาก URL
  const [courseDetail, setCourseDetail] = useState(null);
  const [formData, setFormData] = useState({});
  const [structures, setStructures] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [roadmap, setRoadmap] = useState([]);

  const navigate = useNavigate();

  // โหลดข้อมูลหลักสูตรเดิม
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/admin/course/${id}`)
      .then((res) => {
        const data = res.data;
        setCourseDetail(data);
        setFormData({
          degree: data.degree,
          major: data.major,
          year: data.year,
          thai_course: data.thai_course,
          eng_course: data.eng_course,
          thai_degree: data.thai_degree,
          eng_degree: data.eng_degree,
          admission_req: data.admission_req,
          graduation_req: data.graduation_req,
          philosophy: data.philosophy,
          objective: data.objective,
          tuition: data.tuition,
          credits: data.credits,
          career_paths: data.career_paths,
          plo: data.plo,
          detail_url: data.detail_url,
        });

        // โหลด structures
        axios
          .get(`http://localhost:8080/api/v1/admin/structure/${id}`)
          .then((res) => {
            const data = res.data;
            setStructures(Array.isArray(data) ? data : [data]); // <-- แปลงเป็น array
          })
          .catch((err) => console.error("Error loading structure:", err));

        // โหลด roadmap
        axios
          .get(`http://localhost:8080/api/v1/admin/roadmap/${id}`)
          .then((res) => {
            const data = res.data;
            setRoadmap(Array.isArray(data) ? data : [data]); // <-- แปลงเป็น array
          })
          .catch((err) => console.error("Error loading roadmap:", err));
      })

      .catch((err) => console.error(err));
  }, [id]);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoadmapImageChange = (index, file) => {
    const updated = [...roadmap];
    updated[index].file = file; // เก็บไฟล์ใหม่
    setRoadmap(updated);
  };

  const handleDeleteRoadmap = (index) => {
    const updated = [...roadmap];
    updated.splice(index, 1);
    setRoadmap(updated);
  };

  const handleAddRoadmap = () => {
    setRoadmap([
      ...roadmap,
      {
        roadmap_id: Date.now(),
        course_id: courseDetail.course_id,
        roadmap_url: "",
        file: null,
      },
    ]);
  };

  // --- Structures ---
  const handleStructureChange = (index, field, value) => {
    const updated = [...structures];
    updated[index][field] = value;
    setStructures(updated);
  };

  const handleStructureImageChange = (index, file) => {
    const updated = [...structures];
    updated[index].file = file; // เก็บไฟล์ใหม่
    setStructures(updated);
  };

  const handleDeleteStructure = (index) => {
    const updated = [...structures];
    updated.splice(index, 1);
    setStructures(updated);
  };

  const handleAddStructure = () => {
    setStructures([
      ...structures,
      {
        course_structure_id: Date.now(), // id ชั่วคราว
        course_id: courseDetail.course_id,
        thai_course: "",
        course_structure_url: "",
        file: null,
      },
    ]);
  };

  // --- Subjects ---
  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const handleDeleteSubject = (index) => {
    const updated = [...subjects];
    updated.splice(index, 1);
    setSubjects(updated);
  };

  const handleAddSubject = () => {
    setSubjects([
      ...subjects,
      {
        subject_id: Date.now(), // id ชั่วคราว
        course_id: courseDetail.course_id,
        thai_subject: "",
        credits: "",
        semester: "",
        plan_type: "",
      },
    ]);
  };

  // ตรวจสอบข้อมูลก่อนบันทึก
  const validateForm = () => {
    if (!formData.thai_course || !formData.eng_course) {
      alert("กรุณากรอกชื่อหลักสูตรทั้งภาษาไทยและอังกฤษ");
      return false;
    }
    if (formData.year && isNaN(formData.year)) {
      alert("ปีการศึกษาต้องเป็นตัวเลข");
      return false;
    }
    return true;
  };

  // submit แก้ไข
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        form.append(key, formData[key].toString());
      }
    });

    // เพิ่ม structures และ subjects
    form.append("structures", JSON.stringify(structures));
    form.append("subjects", JSON.stringify(subjects));

    // เพิ่มไฟล์รูปของ structures
    structures.forEach((st, i) => {
      if (st.file) {
        form.append(`structure_files[${i}]`, st.file);
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/course/${id}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("อัปเดตหลักสูตรสำเร็จ!");
      navigate(`/admin/detailcourse/${id}`);
    } catch (error) {
      console.error(error);
      alert("อัปเดตไม่สำเร็จ");
    }
  };

  if (!courseDetail) return <p>กำลังโหลด...</p>;
  // console.log(roadmap)
  // console.log(structures)

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8">
            <h3>แก้ไขหลักสูตร</h3>
            <br />

            {/* ชื่อหลักสูตร */}
            <p id="text-header-coures">ชื่อหลักสูตร</p>
            <input
              className="form-control mb-3"
              name="thai_course"
              value={formData.thai_course || ""}
              onChange={handleChange}
              placeholder="ชื่อหลักสูตรภาษาไทย"
            />
            <input
              className="form-control mb-3"
              name="eng_course"
              value={formData.eng_course || ""}
              onChange={handleChange}
              placeholder="ชื่อหลักสูตรภาษาอังกฤษ"
            />

            {/* ชื่อปริญญา */}
            <p id="text-header-coures">ชื่อปริญญา</p>
            <input
              className="form-control mb-3"
              name="thai_degree"
              value={formData.thai_degree || ""}
              onChange={handleChange}
              placeholder="ชื่อปริญญาภาษาไทย"
            />
            <input
              className="form-control mb-3"
              name="eng_degree"
              value={formData.eng_degree || ""}
              onChange={handleChange}
              placeholder="ชื่อปริญญาภาษาอังกฤษ"
            />

            {/* ปีการศึกษา */}
            <p id="text-header-coures">ปีการศึกษา</p>
            <input
              type="text"
              className="form-control mb-3"
              name="year"
              value={formData.year || ""}
              onChange={handleChange}
              placeholder="ปีการศึกษา"
            />

            {/* สาขา */}
            <p id="text-header-coures">สาขา</p>
            <input
              className="form-control mb-3"
              name="major"
              value={formData.major || ""}
              onChange={handleChange}
              placeholder="สาขา"
            />

            {/* ปรัชญา */}
            <p id="text-header-coures">ปรัชญาของหลักสูตร</p>
            <textarea
              className="form-control mb-3"
              name="philosophy"
              value={formData.philosophy || ""}
              onChange={handleChange}
            />

            {/* วัตถุประสงค์ */}
            <p id="text-header-coures">วัตถุประสงค์</p>
            <textarea
              className="form-control mb-3"
              rows="5"
              name="objective"
              value={formData.objective || ""}
              onChange={handleChange}
            />

            {/* ข้อกำหนดการรับเข้า */}
            <p id="text-header-coures">ข้อกำหนดการรับเข้าศึกษา</p>
            <textarea
              className="form-control mb-3"
              rows="3"
              name="admission_req"
              value={formData.admission_req || ""}
              onChange={handleChange}
            />

            {/* ข้อกำหนดการสำเร็จการศึกษา */}
            <p id="text-header-coures">ข้อกำหนดการสำเร็จการศึกษา</p>
            <textarea
              className="form-control mb-3"
              rows="3"
              name="graduation_req"
              value={formData.graduation_req || ""}
              onChange={handleChange}
            />

            {/* ค่าเล่าเรียน */}
            <p id="text-header-coures">ค่าเล่าเรียน</p>
            <input
              type="text"
              className="form-control mb-3"
              name="tuition"
              value={formData.tuition || ""}
              onChange={handleChange}
            />

            {/* หน่วยกิต */}
            <p id="text-header-coures">หน่วยกิต</p>
            <input
              type="text"
              className="form-control mb-3"
              name="credits"
              value={formData.credits || ""}
              onChange={handleChange}
            />

            {/* เส้นทางอาชีพ */}
            <p id="text-header-coures">เส้นทางอาชีพ</p>
            <textarea
              className="form-control mb-3"
              rows="3"
              name="career_paths"
              value={formData.career_paths || ""}
              onChange={handleChange}
            />

            {/* PLO */}
            <p id="text-header-coures">PLO</p>
            <textarea
              className="form-control mb-3"
              rows="15"
              name="plo"
              value={formData.plo ? formData.plo.replace(/\\n/g, "\n") : ""}
              onChange={handleChange}
            />

            {/* URL รายละเอียดหลักสูตร */}
            <p id="text-header-coures">URL รายละเอียดหลักสูตร</p>
            <input
              className="form-control mb-3"
              name="detail_url"
              value={formData.detail_url || ""}
              onChange={handleChange}
              id="detail-course"
            />

            <br />

            {/* โครงสร้างหลักสูตร */}
            <p id="text-header-coures">โครงสร้างหลักสูตร</p>
            <input className="form-control" type="file" />
            {structures.length > 0 ? (
              structures.map((st, i) => (
                <div
                  key={st.course_structure_id}
                  style={{ marginBottom: "10px" }}
                >
                  <img
                    src={st.course_structure_url} // URL ตรงจาก API
                    alt={`โครงสร้างหลักสูตร ${i + 1}`}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <p>{st.thai_course}</p>
                </div>
              ))
            ) : (
              <p>ไม่มีข้อมูลโครงสร้างหลักสูตร</p>
            )}

            {/* แผนการศึกษา */}
            <p id="text-header-coures">แผนการศึกษา</p>
            <input className="form-control" type="file" />

            {roadmap.length > 0 ? (
              roadmap.map((rd, i) => (
                <div key={rd.roadmap_id} style={{ marginBottom: "10px" }}>
                  <img
                    src={rd.roadmap_url} // URL ตรงจาก API
                    alt={`แผนการศึกษา ${i + 1}`}
                    style={{
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <p>{rd.thai_course}</p>
                </div>
              ))
            ) : (
              <p>ไม่มีข้อมูลแผนการศึกษา</p>
            )}
          <button type="submit" className="btn btn-primary" id="btn-course">
            อัปเดตหลักสูตร
          </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edit_course;
