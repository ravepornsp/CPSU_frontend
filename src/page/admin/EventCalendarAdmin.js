import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../css/admin/event.css";
import { Link } from "react-router-dom";

import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

function EventCalendarAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({});

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === parseInt(info.event.id));
    setSelectedEvent(event);
    setEditedEvent(event);
    setShowModal(true);
    setIsEditing(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleSave = () => {
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setSelectedEvent(editedEvent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("คุณต้องการลบกิจกรรมนี้หรือไม่?");
    if (confirmDelete && selectedEvent) {
      const updatedEvents = events.filter((e) => e.id !== selectedEvent.id);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      closeModal();
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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="event-title">ปฏิทินกิจกรรม</h3>
              <Link to="/admin/calendar/add" className="btn-addnews">
                + เพิ่มกิจกรรม
              </Link>
            </div>

            <div className="calendar-wrapper bg-white p-3 shadow rounded mb-4">
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

      {/* MODAL */}
      {showModal && selectedEvent && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "แก้ไขกิจกรรม" : "รายละเอียดกิจกรรม"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                {isEditing ? (
                  <>
                    <div className="mb-2">
                      <label>ชื่อกิจกรรม</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={editedEvent.title}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label>วันเริ่ม</label>
                      <input
                        type="date"
                        className="form-control"
                        name="start"
                        value={editedEvent.start}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label>วันสิ้นสุด</label>
                      <input
                        type="date"
                        className="form-control"
                        name="end"
                        value={editedEvent.end}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="mb-2">
                      <label>รายละเอียด</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={editedEvent.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>ชื่อกิจกรรม:</strong> {selectedEvent.title}</p>
                    <p><strong>วันเริ่ม:</strong> {selectedEvent.start}</p>
                    <p><strong>วันสิ้นสุด:</strong> {selectedEvent.end}</p>
                    <p><strong>รายละเอียด:</strong><br />{selectedEvent.description || "-"}</p>
                  </>
                )}
              </div>

              <div className="modal-footer">
                {isEditing ? (
                  <>
                    <button className="btn btn-primary" onClick={handleSave}>บันทึก</button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>ยกเลิก</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning" onClick={() => setIsEditing(true)}>แก้ไข</button>
                    <button className="btn btn-danger" onClick={handleDelete}>ลบ</button>
                    <button className="btn btn-secondary" onClick={closeModal}>ปิด</button>
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
