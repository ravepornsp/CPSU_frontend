import React, { useState, useEffect } from "react";
import Footer from "../../component/footer";
import Header from "../../component/header";
import Navbar from "../../component/navbar";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";

const EditTeacherInformation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state?.personnelId;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewNewImage, setPreviewNewImage] = useState("");

  useEffect(() => {
    if (!id) {
      navigate("/teacher/information");
      return;
    }

    const fetchData = async () => {
      try {
        const res = await api.get(`/personnel/${id}`);
        const personnel = res.data.personnel;

        setFormData(personnel);
        setPreviewImage(personnel.file_image);
      } catch (err) {
        console.error("Error fetching personnel:", err);
        alert("ไม่สามารถโหลดข้อมูลบุคลากรได้");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "file_image") {
          formDataObj.append(key, value || "");
        }
      });

      let fileToUpload = selectedFile;

      if (!fileToUpload && previewImage) {
        const response = await fetch(previewImage);
        const blob = await response.blob();

        fileToUpload = new File([blob], "old_image.jpg", {
          type: blob.type,
        });
      }

      if (fileToUpload) {
        formDataObj.append("file_image", fileToUpload);
      }

      await api.put(`/teacher/personnel/${id}`, formDataObj);

      alert("บันทึกข้อมูลเรียบร้อย");
      navigate("/teacher/information");
    } catch (err) {
      console.error(err);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  const handleCancel = () => {
    navigate("/teacher/information");
  };

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="container text-center my-5">
          <div className="spinner-border text-primary"></div>
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
        <div className="card shadow-sm p-4">
          <h3 className="mb-4">แก้ไขข้อมูลอาจารย์</h3>

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
                rows="4"
                name="education"
                value={formData.education || ""}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">สาขาที่เชี่ยวชาญ</label>
              <textarea
                className="form-control"
                rows="2"
                name="related_fields"
                value={formData.related_fields || ""}
                onChange={handleChange}
              />
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
              <label className="form-label">รูปภาพ</label>

              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />

              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt="preview"
                    style={{
                      maxWidth: "200px",
                      borderRadius: "10px",
                    }}
                    onError={(e) =>
                      (e.target.src = "/images/default-profile.png")
                    }
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleCancel}
              >
                ยกเลิก
              </button>
              <button type="submit" className="btn btn-primary ">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default EditTeacherInformation;
