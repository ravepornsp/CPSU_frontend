import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function EventFormAdd() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
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

    const newEvent = {
      title,
      detail: description,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      await api.post("/admin/calendar", newEvent);
      alert("เพิ่มกิจกรรมสำเร็จ");
      navigate("/admin/calendar");
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถเพิ่มกิจกรรมได้");
    }
  };

  return (
    <div className="container mt-4">
      <h3>เพิ่มกิจกรรม</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>ชื่อกิจกรรม</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>วันเริ่มต้น</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>วันสิ้นสุด</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>รายละเอียดกิจกรรม</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          บันทึกกิจกรรม
        </button>
      </form>
    </div>
  );
}

export default EventFormAdd;
