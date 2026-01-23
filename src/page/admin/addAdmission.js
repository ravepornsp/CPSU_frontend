import React, { useState, useEffect } from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddAdmission = () => {
  const [round, setRound] = useState("");
  const [detail, setDetail] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // clear preview url เมื่อ component unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const validateForm = () => {
    if (!round) {
      alert("กรุณาใส่รอบการรับสมัคร");
      return false;
    }
    if (!detail) {
      alert("กรุณากรอกรายละเอียดการรับสมัคร");
      return false;
    }
    if (file && !file.type.startsWith("image/")) {
      alert("กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("round", round);
    formData.append("detail", detail);

    if (file) {
      formData.append("file_image", file); // ⭐ สำคัญ: ชื่อต้องตรง backend
    }

    try {
      setLoading(true);
      await api.post("/admin/admission", formData);
      alert("เพิ่มข้อมูลสำเร็จ!");
      navigate("/admin/admission");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
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

              {/* รายละเอียด (CKEditor) */}
              <div className="mb-3">
                <label className="form-label">รายละเอียดการรับสมัคร</label>
                <div style={{ minHeight: "220px" }}>
                  <CKEditor
                    editor={ClassicEditor}
                    data={detail}
                    onChange={(event, editor) =>
                      setDetail(editor.getData())
                    }
                  />
                </div>
              </div>

              {/* รูปภาพ */}
              <div className="mb-3">
                <label className="form-label">รูปภาพ</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    const selected = e.target.files[0];
                    if (!selected) return;

                    setFile(selected);
                    setPreview(URL.createObjectURL(selected));
                  }}
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mb-3">
                  <img
                    src={preview}
                    alt="preview"
                    style={{
                      maxWidth: "200px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
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
