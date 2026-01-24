import React, { useState, useEffect } from "react";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Navbar from "../../component/navbar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditTeacherInformation = () => {
  const location = useLocation();
  const id = location.state?.userId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://vibrant-connection-production.up.railway.app/api/v1/admin/personnel/${id}`
        );
        const personnel = res.data.personnel;
        setFormData(personnel);
        setPreviewImage(personnel.file_image || null);
      } catch (err) {
        console.error("Error fetching personnel:", err);
        alert("ไม่สามารถโหลดข้อมูลบุคลากรได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "department_position_id" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(formData.file_image || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      // Append ทุก field ยกเว้น file_image
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "file_image") {
          formDataObj.append(key, value || "");
        }
      });

      // Append file_image
      if (selectedFile) {
        // ถ้ามีไฟล์ใหม่ ให้ส่งไฟล์
        formDataObj.append("file_image", selectedFile);
      } else if (formData.file_image) {
        // ถ้าไม่มีไฟล์ใหม่ ให้ส่ง URL เดิม
        formDataObj.append("file_image", formData.file_image);
      }

      await axios.put(
        `https://vibrant-connection-production.up.railway.app/api/v1/teacher/personnel/${id}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("บันทึกข้อมูลเรียบร้อย");
      navigate("/teacher/information", { state: { userId: id } });
    } catch (err) {
      console.error("Error updating personnel:", err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  const handleCancel = () =>
    navigate("/teacher/information", { state: { userId: id } });

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="container text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">กำลังโหลดข้อมูล...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="container my-5">
        <h3 className="mb-4">แก้ไขข้อมูลบุคลากร</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">ตำแหน่งภาควิชา</label>
            <input
              type="text"
              className="form-control"
              name="department_position_name"
              value={formData.department_position_name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ตำแหน่งวิชาการ (ไทย)</label>
            <input
              type="text"
              className="form-control"
              name="thai_academic_position"
              value={formData.thai_academic_position || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ตำแหน่งวิชาการ (อังกฤษ)</label>
            <input
              type="text"
              className="form-control"
              name="eng_academic_position"
              value={formData.eng_academic_position || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อ (ไทย)</label>
            <input
              type="text"
              className="form-control"
              name="thai_name"
              value={formData.thai_name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ชื่อ (อังกฤษ)</label>
            <input
              type="text"
              className="form-control"
              name="eng_name"
              value={formData.eng_name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ประวัติการศึกษา</label>
            <textarea
              className="form-control"
              rows={4}
              name="education"
              value={formData.education || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">สาขาที่เชี่ยวชาญ</label>
            <textarea
              className="form-control"
              rows={2}
              name="related_fields"
              value={formData.related_fields || ""}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">อีเมล</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">เว็บไซต์</label>
            <input
              type="url"
              className="form-control"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">ไฟล์รูปภาพ</label>
            <input
              type="file"
              className="form-control"
              name="file_image"
              onChange={handleFileChange}
            />
            {previewImage && (
              <div className="mt-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary me-2">
            บันทึก
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            ยกเลิก
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditTeacherInformation;
