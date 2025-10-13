import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../css/admin/event.css";
import Headers from "../component/header";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

function EventCalendarPublic() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // เมื่อคลิกกิจกรรมในปฏิทิน
  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === parseInt(info.event.id));
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">ปฏิทินกิจกรรม</h3>

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

      {showModal && selectedEvent && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">รายละเอียดกิจกรรม</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ชื่อกิจกรรม:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>วันเริ่ม:</strong> {selectedEvent.start}
                </p>
                <p>
                  <strong>วันสิ้นสุด:</strong> {selectedEvent.end}
                </p>
                <p>
                  <strong>รายละเอียด:</strong>
                  <br />
                  {selectedEvent.description || "-"}
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default EventCalendarPublic;
