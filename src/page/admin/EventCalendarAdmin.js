import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import api from "../../api/axios";
import "../../css/admin/event.css";

import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

function EventCalendarAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});

  /* ================= Utils ================= */
  const toDateOnly = (iso) => iso.split("T")[0];
  const toISODate = (dateStr) => new Date(dateStr).toISOString();

  /* ================= Load Events ================= */
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/admin/calendar");
      const mapped = res.data.map((e) => ({
        id: e.calendar_id,
        title: e.title,
        start: e.start_date,
        end: e.start_date === e.end_date ? null : e.end_date,
        description: e.detail,
        allDay: true,
      }));
      setEvents(mapped);
    } catch (err) {
      console.error("โหลดกิจกรรมล้มเหลว", err);
    }
  };

  /* ================= Modal ================= */
  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setIsEditing(false);
    setIsAdding(false);
    setEditedEvent({});
  };

  const openAddModal = () => {
    const today = new Date().toISOString().split("T")[0];
    setEditedEvent({
      title: "",
      start: today,
      end: today,
      description: "",
    });
    setIsAdding(true);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === Number(info.event.id));
    setSelectedEvent(event);
    setEditedEvent({
      ...event,
      start: toDateOnly(event.start),
      end: event.end ? toDateOnly(event.end) : toDateOnly(event.start),
    });
    setShowModal(true);
  };

  /* ================= Form ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= CRUD ================= */
  const handleAdd = async () => {
    if (!editedEvent.title || !editedEvent.start) {
      alert("กรุณากรอกชื่อกิจกรรมและวันเริ่ม");
      return;
    }

    try {
      const payload = {
        title: editedEvent.title,
        detail: editedEvent.description,
        start_date: toISODate(editedEvent.start),
        end_date: toISODate(editedEvent.end || editedEvent.start),
      };

      await api.post("/admin/calendar", payload);
      alert("เพิ่มกิจกรรมสำเร็จ");
      fetchEvents();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("เพิ่มกิจกรรมไม่สำเร็จ");
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: editedEvent.title,
        detail: editedEvent.description,
        start_date: toISODate(editedEvent.start),
        end_date: toISODate(editedEvent.end),
      };

      await api.put(`/admin/calendar/${editedEvent.id}`, payload);
      alert("บันทึกกิจกรรมสำเร็จ");
      fetchEvents();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("บันทึกไม่สำเร็จ");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("ต้องการลบกิจกรรมนี้หรือไม่?")) return;

    try {
      await api.delete(`/admin/calendar/${selectedEvent.id}`);
      alert("ลบกิจกรรมสำเร็จ");
      fetchEvents();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("ลบไม่สำเร็จ");
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
            <div className="d-flex justify-content-between mb-3">
              <h3>ปฏิทินกิจกรรม</h3>
              <button className="btn-addsubject" onClick={openAddModal}>
                + เพิ่มกิจกรรม
              </button>
            </div>

            <div className="bg-white p-3 shadow rounded">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="th"
                events={events}
                eventClick={handleEventClick}
                height="auto"
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isAdding
                    ? "เพิ่มกิจกรรม"
                    : isEditing
                    ? "แก้ไขกิจกรรม"
                    : "รายละเอียดกิจกรรม"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>

              <div className="modal-body">
                {isAdding || isEditing ? (
                  <>
                    <label>ชื่อกิจกรรม</label>
                    <input
                      className="form-control mb-2"
                      name="title"
                      value={editedEvent.title}
                      onChange={handleChange}
                    />

                    <label>วันเริ่ม</label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="start"
                      value={editedEvent.start}
                      onChange={handleChange}
                    />

                    <label>วันสิ้นสุด</label>
                    <input
                      type="date"
                      className="form-control mb-2"
                      name="end"
                      value={editedEvent.end}
                      onChange={handleChange}
                    />

                    <label>รายละเอียด</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editedEvent.description || ""}
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
                    <p><b>ชื่อกิจกรรม : </b> {selectedEvent.title}</p>
                    <p><b>วันเริ่ม : </b> {toDateOnly(selectedEvent.start)}</p>
                    <p>
                      <b>วันสิ้นสุด : </b>{" "}
                      {selectedEvent.end
                        ? toDateOnly(selectedEvent.end)
                        : toDateOnly(selectedEvent.start)}
                    </p>
                    <p>
                      <b>รายละเอียด</b><br />
                      {selectedEvent.description || "-"}
                    </p>
                  </>
                )}
              </div>

              <div className="modal-footer">
                {isAdding && (
                  <>
                    <button className="btn btn-primary" onClick={handleAdd}>
                      บันทึก
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                      ยกเลิก
                    </button>
                  </>
                )}

                {isEditing && (
                  <>
                    <button className="btn btn-primary" onClick={handleSave}>
                      บันทึก
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      ยกเลิก
                    </button>
                  </>
                )}

                {!isAdding && !isEditing && (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() => setIsEditing(true)}
                    >
                      แก้ไข
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      ลบ
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                      ปิด
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default EventCalendarAdmin;
