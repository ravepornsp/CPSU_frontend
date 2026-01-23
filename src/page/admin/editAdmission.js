import React, { useEffect, useState } from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditAdmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [round, setRound] = useState("");
  const [detail, setDetail] = useState("");

  const [fileImage, setFileImage] = useState(null); // รูปใหม่ (File)
  const [oldImage, setOldImage] = useState("");     // รูปเดิม (URL string)
  const [previewImage, setPreviewImage] = useState(""); // ไว้โชว์

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 โหลดข้อมูลเดิม
  useEffect(() => {
    api
      .get(`/admin/admission/${id}`)
      .then((res) => {
        const data = res.data;
        setRound(data.round || "");
        setDetail(data.detail || "");
        setOldImage(data.file_image || "");
        setPreviewImage(data.file_image || "");
        setLoading(false);
      })
      .catch(() => {
        setError("ไม่สามารถโหลดข้อมูลได้");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!round) {
      alert("กรุณาใส่รอบการรับสมัคร");
      return;
    }

    const formData = new FormData();
    formData.append("round", round);
    formData.append("detail", detail);

    // ✅ ส่งรูปเฉพาะกรณีเลือกใหม่
    if (fileImage) {
      formData.append("file_image", fileImage);
    }

    try {
      setSaving(true);
      await api.put(
        `/admin/admission/${id}`,
        formData
      );

      alert("บันทึกการแก้ไขสำเร็จ");
      navigate("/admin/admission");
    } catch (error) {
      console.error(error);
      alert("บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="m-4">กำลังโหลดข้อมูล...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;

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
            <h3>แก้ไขข้อมูลการรับสมัคร</h3>

            <form onSubmit={handleSubmit}>
              {/* รอบ */}
              <div className="mb-3">
                <label className="form-label">รอบการรับสมัคร</label>
                <input
                  className="form-control"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                />
              </div>

              {/* รายละเอียด */}
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

              {/* รูป */}
              <div className="mb-3">
                <label className="form-label">รูปภาพ</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setFileImage(file);
                    setPreviewImage(URL.createObjectURL(file)); // preview ใหม่
                  }}
                />
              </div>

              {/* Preview */}
              {previewImage && (
                <div className="mb-4">
                  <p>ตัวอย่างรูปภาพ</p>
                  <img
                    src={previewImage}
                    alt="preview"
                    style={{
                      maxWidth: "60%",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={saving}
              >
                {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin/admission")}
              >
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

export default EditAdmission;
