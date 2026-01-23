import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/personnel.css";

function PersonnelAdd() {
  const navigate = useNavigate();

  const academicPositions = [
    { id: 1, thai: "รศ.ดร.", eng: "Assoc.Prof.Dr." },
    { id: 2, thai: "ผศ.ดร.", eng: "Asst.Prof.Dr." },
    { id: 3, thai: "ผศ.", eng: "Asst.Prof." },
    { id: 4, thai: "อ.ดร.", eng: "Dr." },
    { id: 5, thai: "อ.", eng: "" },
  ];

  const [formData, setFormData] = useState({
    type_personnel: "",
    department_position_name: "",
    academic_position_id: "",
    thai_academic_position: "",
    eng_academic_position: "",
    thai_name: "",
    eng_name: "",
    education: "",
    related_fields: "",
    email: "",
    website: "",
    scopus_id: "",
    file_image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState("");

  const DEFAULT_DEPARTMENT_POSITION_ID = 1;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "type_personnel") {
      setFormData({
        ...formData,
        type_personnel: value,
        department_position_name: "",
        academic_position_id: "",
        thai_academic_position: "",
        eng_academic_position: "",
        thai_name: "",
        eng_name: "",
        education: "",
        related_fields: "",
        email: "",
        website: "",
        scopus_id: "",
        file_image: null,
      });
      setPreviewImage(null);
      setError("");
      return;
    }

    if (name === "academic_position_id") {
      const selected = academicPositions.find((p) => p.id === Number(value));
      setFormData({
        ...formData,
        academic_position_id: Number(value),
        thai_academic_position: selected?.thai || "",
        eng_academic_position: selected?.eng || "",
      });
      return;
    }

    if (name === "file_image") {
      const file = files[0];

      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }

      setFormData({ ...formData, file_image: file });
      setPreviewImage(URL.createObjectURL(file));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.type_personnel) {
      setError("กรุณาเลือกประเภทบุคลากร");
      return;
    }

    if (
      formData.type_personnel === "สายวิชาการ" &&
      !formData.academic_position_id
    ) {
      setError("กรุณาเลือกตำแหน่งวิชาการ");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) data.append(key, value);
    });

    data.append("department_position_id", DEFAULT_DEPARTMENT_POSITION_ID);

    console.log(data)
    try {
      await api.post("/admin/personnel", data);
      alert("บันทึกข้อมูลบุคลากรสำเร็จ!");
      navigate("/admin/personnel");
    } catch (err) {
      console.error(err.response?.data || err);
      setError("เกิดข้อผิดพลาดในการเพิ่มบุคลากร");
    }
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="mb-4">เพิ่มบุคลากร</h4>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  {/* ประเภทบุคลากร */}
                  <div className="mb-3">
                    <label>ประเภทบุคลากร</label>
                    <select
                      className="form-select"
                      name="type_personnel"
                      value={formData.type_personnel}
                      onChange={handleChange}
                      required
                    >
                      <option value="">เลือกประเภท</option>
                      <option value="สายวิชาการ">สายวิชาการ</option>
                      <option value="สายสนับสนุนวิชาการ">
                        สายสนับสนุนวิชาการ
                      </option>
                    </select>
                  </div>

                  {/* ตำแหน่งในภาควิชา */}
                  <div className="mb-3">
                    <label>ตำแหน่งในภาควิชา</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department_position_name"
                      value={formData.department_position_name}
                      onChange={handleChange}
                      placeholder="กรอกตำแหน่งในภาควิชา"
                      required
                      disabled={!formData.type_personnel}
                    />
                  </div>

                  {/* สายวิชาการ */}
                  {formData.type_personnel === "สายวิชาการ" && (
                    <>
                      <div className="mb-3">
                        <label>ตำแหน่งวิชาการ</label>
                        <select
                          className="form-select"
                          name="academic_position_id"
                          value={formData.academic_position_id}
                          onChange={handleChange}
                          required
                        >
                          <option value="">เลือกตำแหน่ง</option>
                          {academicPositions.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.thai} {p.eng && `(${p.eng})`}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="mb-3">
                        <label>คำนำหน้าทางวิชาการ (TH)</label>
                        <input
                          className="form-control"
                          value={formData.thai_academic_position}
                          readOnly
                        />
                      </div>

                      <div className="mb-3">
                        <label>Academic Title (EN)</label>
                        <input
                          className="form-control"
                          value={formData.eng_academic_position}
                          readOnly
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label>ชื่อ-นามสกุล (TH)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="thai_name"
                            value={formData.thai_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Name (EN)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="eng_name"
                            value={formData.eng_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label>ประวัติการศึกษา</label>
                        <textarea
                          className="form-control"
                          rows={3}
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label>สาขาที่เชี่ยวชาญ</label>
                        <textarea
                          className="form-control"
                          rows={2}
                          name="related_fields"
                          value={formData.related_fields}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label>เว็บไซต์ส่วนตัว</label>
                          <input
                            type="text"
                            className="form-control"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 mb-3">
                          <label>Scopus ID</label>
                          <input
                            type="text"
                            className="form-control"
                            name="scopus_id"
                            value={formData.scopus_id}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label>อัปโหลดรูปภาพ</label>
                          <input
                            type="file"
                            className="form-control"
                            name="file_image"
                            accept="image/*"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3 text-center">
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="img-fluid rounded shadow"
                              style={{ maxHeight: "200px" }}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* สายสนับสนุนวิชาการ */}
                  {/* สายสนับสนุนวิชาการ */}
                  {formData.type_personnel === "สายสนับสนุนวิชาการ" && (
                    <>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label>ชื่อ-นามสกุล (TH)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="thai_name"
                            value={formData.thai_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label>Name (EN)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="eng_name"
                            value={formData.eng_name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label>Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* เพิ่มช่องอัปโหลดรูปภาพ */}
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label>อัปโหลดรูปภาพ</label>
                          <input
                            type="file"
                            className="form-control"
                            name="file_image"
                            accept="image/*"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-6 mb-3 text-center">
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="img-fluid rounded shadow"
                              style={{ maxHeight: "200px" }}
                            />
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate("/admin/personnel")}
                    >
                      ยกเลิก
                    </button>
                    <button type="submit" className="btn btn-success">
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PersonnelAdd;
