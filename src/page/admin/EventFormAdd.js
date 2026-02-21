import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";

function EventFormAdd() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !startDate || !endDate) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (startDate > endDate) {
      alert("วันเริ่มต้นต้องไม่มากกว่าวันสิ้นสุด");
      return;
    }

    try {
      setSaving(true);

      await api.post("/admin/calendar", {
        title,
        detail: description,
        start_date: startDate,
        end_date: endDate,
      });

      alert("เพิ่มกิจกรรมสำเร็จ");
      navigate("/admin/calendar");
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเพิ่มกิจกรรมได้");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h3>เพิ่มกิจกรรม</h3>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">ชื่อกิจกรรม</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">วันเริ่มต้น</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">วันสิ้นสุด</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">รายละเอียดกิจกรรม</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "กำลังบันทึก..." : "บันทึกกิจกรรม"}
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/admin/calendar")}
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EventFormAdd;
