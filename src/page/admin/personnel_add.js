import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/personnel.css";

function PersonnelAdd() {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  const academicPositions = [
    { id: 1, thai: "รศ.ดร.", eng: "Assoc.Prof.Dr." },
    { id: 2, thai: "ผศ.ดร.", eng: "Asst.Prof.Dr." },
    { id: 3, thai: "ผศ.", eng: "Asst.Prof." },
    { id: 4, thai: "อ.ดร.", eng: "Dr." },
    { id: 5, thai: "อ.", eng: "" },
  ];
  const departmentPositions = [
    { id: 1, name: "หัวหน้าภาควิชา" },
    { id: 2, name: "รองหัวหน้าภาควิชาฯ ฝ่ายบริหาร" },
    { id: 3, name: "รองหัวหน้าภาควิชาฯ" },
    { id: 4, name: "อาจารย์ประจำภาควิชา" },
    { id: 5, name: "นักวิชาการอุดมศึกษาชำนาญการ" },
    { id: 6, name: "นักวิชาการอุดมศึกษาปฏิบัติการ" },
    { id: 7, name: "นักวิชาการอุดมศึกษา (ประจำหลักสูตรวิทยาการข้อมูล)" },
    { id: 8, name: "นักวิชาการอุดมศึกษา" },
    { id: 9, name: "นักเทคโนโลยีสารสนเทศ" },
    { id: 10, name: "นักคอมพิวเตอร์" },
    { id: 11, name: "พนักงานทั่วไป" },
  ];
  const [formData, setFormData] = useState({
    type_personnel: "สายวิชาการ",
    department_position_id: "",
    department_position_name: "",
    academic_position_id: null,
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

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/admin/personnel"
        );
        const personnelList = res.data.personnel
          ? [res.data.personnel]
          : res.data;

        // ดึง department_position_id + department_position_name แบบ unique
        const uniquePositions = [
          ...new Map(
            personnelList.map((p) => [
              p.department_position_id,
              p.department_position_name,
            ])
          ).entries(),
        ].map(([id, name]) => ({ id: Number(id), name }));

        setPositions(uniquePositions);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPositions();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file_image") {
      const file = files[0];
      setFormData({ ...formData, file_image: file });
      setPreviewImage(URL.createObjectURL(file));
    } else if (name === "department_position_id") {
      const selected = departmentPositions.find((p) => p.id === Number(value));
      setFormData({
        ...formData,
        department_position_id: Number(value),
        department_position_name: selected ? selected.name : "",
      });
    } else if (name === "academic_position_id") {
      const selected = academicPositions.find((p) => p.id === Number(value));
      setFormData({
        ...formData,
        academic_position_id: Number(value),
        thai_academic_position: selected ? selected.thai : "",
        eng_academic_position: selected ? selected.eng : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบค่า department_position_id
    console.log("Submitting data:", formData);

    const pdata = {
      type_personnel: formData.type_personnel,
      department_position_id: formData.department_position_id,
      department_position_name: formData.department_position_name,
      academic_position_id: formData.academic_position_id || null,
      thai_academic_position: formData.thai_academic_position,
      eng_academic_position: formData.eng_academic_position,
      thai_name: formData.thai_name,
      eng_name: formData.eng_name,
      education: formData.education,
      related_fields: formData.related_fields,
      email: formData.email,
      website: formData.website,
    };

    const data = new FormData();
    data.append(
      "personnel",
      new Blob([JSON.stringify(pdata)], { type: "application/json" })
    );

    if (formData.file_image) {
      data.append("file_image", formData.file_image);
    }

    try {
      await axios.post("http://localhost:8080/api/v1/admin/personnel", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/personnel");
    } catch (err) {
      console.error("Error adding personnel:", err.response?.data || err);
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
                <h4 className="card-title mb-4">เพิ่มบุคลากร</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="col-md-6 mb-3">
                    <input
                      type="hidden"
                      name="type_personnel"
                      value={formData.type_personnel}
                    />
                    <label>ประเภทบุคลากร</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.type_personnel}
                      readOnly
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>ตำแหน่งในภาควิชา</label>
                      <select
                        className="form-select"
                        name="department_position_id"
                        value={formData.department_position_id || ""}
                        onChange={handleChange}
                        required
                      >
                        <option value="">เลือกตำแหน่ง</option>
                        {departmentPositions.map((pos) => (
                          <option key={pos.id} value={pos.id}>
                            {pos.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>ตำแหน่งวิชาการ</label>
                      <select
                        className="form-select"
                        name="academic_position_id"
                        value={formData.academic_position_id || ""}
                        onChange={handleChange}
                      >
                        <option value="">เลือกตำแหน่ง</option>
                        {academicPositions.map((pos) => (
                          <option key={pos.id} value={pos.id}>
                            {pos.thai} {pos.eng && `(${pos.eng})`}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>คำนำหน้าทางวิชาการ (TH)</label>
                      <input
                        type="text"
                        name="thai_academic_position"
                        className="form-control"
                        value={formData.thai_academic_position}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Academic Title (EN) Auto-fill</label>
                      <input
                        type="text"
                        name="eng_academic_position"
                        className="form-control"
                        value={formData.eng_academic_position}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>ชื่อ-นามสกุล (TH)</label>
                      <input
                        type="text"
                        name="thai_name"
                        className="form-control"
                        value={formData.thai_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Name (EN)</label>
                      <input
                        type="text"
                        name="eng_name"
                        className="form-control"
                        value={formData.eng_name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label>ประวัติการศึกษา</label>
                      <textarea
                        name="education"
                        className="form-control"
                        rows={3}
                        value={formData.education}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label>สาขาที่เชี่ยวชาญ</label>
                      <textarea
                        name="related_fields"
                        className="form-control"
                        rows={2}
                        value={formData.related_fields}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>เว็บไซต์ส่วนตัว</label>
                      <input
                        type="text"
                        name="website"
                        className="form-control"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Scopus ID</label>
                      <input
                        type="text"
                        name="scopus_id"
                        className="form-control"
                        value={formData.scopus_id}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>อัปโหลดรูปภาพ</label>
                      <input
                        type="file"
                        name="file_image"
                        className="form-control"
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

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary px-4"
                      onClick={() => navigate("/admin/personnel")}
                    >
                      ยกเลิก
                    </button>
                    <button type="submit" className="btn btn-success px-4">
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
