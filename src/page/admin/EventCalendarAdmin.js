import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../css/admin/calendar.css";

import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

function EventCalendarAdmin() {
  const [events, setEvents] = useState([
    { id: 1, title: "ประชุมภาควิชา", date: "2025-09-25" },
    { id: 2, title: "อบรมพัฒนาเว็บไซต์", date: "2025-09-28" },
  ]);

  const [nextId, setNextId] = useState(3); // สำหรับสร้าง id ใหม่

  const handleDateClick = (info) => {
    const title = prompt("กรุณากรอกชื่อกิจกรรม:");
    if (title) {
      setEvents([
        ...events,
        {
          id: nextId,
          title,
          date: info.dateStr,
        },
      ]);
      setNextId(nextId + 1);
    }
  };

  const handleEventClick = (info) => {
    const confirmDelete = window.confirm(
      `คุณต้องการลบกิจกรรม "${info.event.title}" หรือไม่?`
    );
    if (confirmDelete) {
      setEvents(events.filter((e) => e.id !== parseInt(info.event.id)));
    }
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8">
            <h4 className="mb-4">📅 ปฏิทินกิจกรรม (Admin)</h4>

            <div className="calendar-wrapper bg-white p-3 shadow rounded">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="th"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventCalendarAdmin;
