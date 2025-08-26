import React, { useState } from "react";
import axios from "axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_add.css";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const Add_course = () => {
  const [summaryFile, setSummaryFile] = useState(null);
  const [structure, setStructure] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const navigate = useNavigate(); // ✅ ใช้สำหรับเปลี่ยนหน้า

  const handleFileChange = (e) => {
    setSummaryFile(e.target.files[0]);
  };

  const handleStructureChange = (e) => setStructure(e.target.files[0]);
  const handleRoadmapChange = (e) => setRoadmap(e.target.files[0]);

  const handleSubmit = async () => {
    if (!summaryFile) {
      alert("กรุณาเลือกไฟล์ CSV ก่อน");
      return;
    }

    const formData = new FormData();
    formData.append("coursefile", summaryFile);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/admin/course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (structure) {
        const structureFormData = new FormData();
        structureFormData.append("structurefile", structure);

        const structureRes = await axios.post(
          "http://localhost:8080/api/v1/admin/structure",
          structureFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Structure uploaded:", structureRes.data);
      }

      if (roadmap) {
        const roadmapFormData = new FormData();
        roadmapFormData.append("roadmapfile", roadmap);

        const roadmapRes = await axios.post(
          "http://localhost:8080/api/v1/admin/roadmap",
          roadmapFormData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Roadmap uploaded:", roadmapRes.data);
      }

      alert("อัปโหลดสำเร็จ!");
      console.log(res.data);

      // ✅ กลับไปหน้าแรก (หรือหน้าแสดงรายวิชาที่ต้องการ)
      navigate("/admin/course"); // เปลี่ยนเป็น path ที่ต้องการ เช่น "/admin/course"
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
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8">
            <div className="col-md-4" id="course-all">
              เพิ่มหลักสูตร
            </div>
            <p id="text-header-coures">ภาพรวมหลักสูตร</p>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </div>
            <p id="text-header-coures">โครงสร้างหลักสูตร</p>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                accept=".csv"
                onChange={handleStructureChange}
              />
            </div>
            {structure && structure.type.startsWith("image/") && (
              <div style={{ margin: "10px 0" }}>
                <p>Preview โครงสร้างหลักสูตร:</p>
                <img
                  src={URL.createObjectURL(structure)}
                  alt="Structure Preview"
                  style={{
                    maxWidth: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
            // ตัวอย่างแสดง preview รูป
            <hr></hr>
            <p id="text-header-coures">แผนผังหลักสูตร</p>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleRoadmapChange}
              />
            </div>
            {roadmap && (
              <div style={{ margin: "10px 0" }}>
                <p>Preview แผนผังหลักสูตร:</p>
                <img
                  src={URL.createObjectURL(roadmap)}
                  alt="Roadmap Preview"
                  style={{
                    maxWidth: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}
            <p id="text-header-coures">รายวิชาของหลักสูตร</p>
            <div className="mb-3">
              <input className="form-control" type="file" />
            </div>
            <p id="text-header-coures">รายละเอียดเพิ่มเติม</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              id="btn-submit"
              onClick={handleSubmit}
            >
              เผยแพร่
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Add_course;
