import React, { useState } from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddAdmission = () => {
  const [round, setRound] = useState("");
  const [detail, setDetail] = useState("");
  const [files, setFiles] = useState([]); // สำหรับเก็บหลายไฟล์
  const [previews, setPreviews] = useState([]); // สำหรับ preview หลายไฟล์
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชันตรวจสอบค่าก่อน submit
  const validateForm = () => {
    if (!round) {
      alert("กรุณาใส่รอบการรับสมัคร");
      return false;
    }
    if (!detail) {
      alert("กรุณากรอกรายละเอียดการรับสมัคร");
      return false;
    }
    if (files.some((file) => !file.type.startsWith("image/"))) {
      alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // สร้าง preview สำหรับแต่ละไฟล์
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("round", round);
    formData.append("detail", detail); // HTML จาก CKEditor

    // append ทุกไฟล์
    files.forEach((file, index) => {
      formData.append("file_images", file); // backend ต้องรองรับหลายไฟล์ใน key เดียว
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/admission",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response:", response.data);
      alert("เพิ่มข้อมูลสำเร็จ!");
      navigate("/admin/admission");
    } catch (error) {
      console.error("Error response:", error.response?.data || error);
      alert(
        "เกิดข้อผิดพลาดในการบันทึกข้อมูล: " +
          (error.response?.data?.error || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>
          <div className="col-sm-9">
            <h3>เพิ่มข้อมูลการรับสมัคร</h3>
            <form onSubmit={handleSubmit}>
              {/* รอบการรับสมัคร */}
              <div className="mb-3">
                <label className="form-label">รอบการรับสมัคร</label>
                <input
                  type="text"
                  className="form-control"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  placeholder="เช่น รอบที่ 1"
                />
              </div>

              {/* รายละเอียดการรับสมัคร (CKEditor) */}
              <div className="mb-3">
                <label className="form-label">รายละเอียดการรับสมัคร</label>
                <div style={{ minHeight: "220px" }}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={detail}
                    onChange={(event, editor) => setDetail(editor.getData())}
                  />
                </div>
              </div>

              {/* รูปภาพหลายไฟล์ */}
              <div className="mb-3">
                <label className="form-label">รูปภาพ</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview หลายไฟล์ */}
              {previews.length > 0 && (
                <div className="mb-3 d-flex flex-wrap gap-3">
                  {previews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      style={{ maxWidth: "150px", borderRadius: "8px" }}
                    />
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddAdmission;
