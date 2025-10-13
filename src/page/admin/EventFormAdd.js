import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EventFormAdd() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const endDatePlusOne = new Date(endDate);
    endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);

    // แปลงกลับเป็น YYYY-MM-DD
    const endDateFormatted = endDatePlusOne.toISOString().split("T")[0];

    const newEvent = {
      id: Date.now(),
      title,
      start: startDate, // FullCalendar ใช้ key ว่า start และ end
      end: endDateFormatted,
      description,
    };

    const updatedEvents = [...storedEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    navigate("/admin/calendar");
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
