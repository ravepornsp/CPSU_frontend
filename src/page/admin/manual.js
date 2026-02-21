import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import "../../css/admin/manual.css";

function Manual() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll(".manual-section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <AdminLayout>
      <div className="container-fluid px-4">
        <div className="row">
          
          {/* สารบัญ Sticky */}
          <div className="col-lg-3 mb-4">
            <div className="card p-3 shadow-sm sticky-top" style={{ top: "90px" }}>
              <h6 className="fw-bold mb-3">สารบัญ</h6>

              <ul className="list-unstyled small manual-toc">
                {[
                  { id: "news", label: "📰 ข่าวสาร" },
                  { id: "personnel", label: "👨‍🏫 บุคลากร" },
                  { id: "course", label: "📘 หลักสูตร" },
                  { id: "subject", label: "📖 รายวิชา" },
                  { id: "calendar", label: "📅 ปฏิทินกิจกรรม" },
                  { id: "admission", label: "📢 การรับสมัคร" },
                  { id: "permission", label: "🔐 กำหนดสิทธิ์ผู้ใช้" },
                ].map((item) => (
                  <li key={item.id} className="mb-2">
                    <a
                      href={`#${item.id}`}
                      className={activeSection === item.id ? "active" : ""}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* เนื้อหา */}
          <div className="col-lg-9">
            <h3 className="mb-4">คู่มือการใช้งานระบบผู้ดูแล (Admin)</h3>

            <Section
              id="news"
              title="📰 ข่าวสาร"
              text="ใช้เพิ่ม แก้ไข และลบข่าวประชาสัมพันธ์"
              images={["/images/manual/news.png"]}
            />

            <Section
              id="personnel"
              title="👨‍🏫 บุคลากร"
              text="จัดการข้อมูลบุคลากร เช่น ชื่อ ตำแหน่ง รูปภาพ"
              images={[
                "/images/manual/personal1.png",
                "/images/manual/personal2.png",
                "/images/manual/personal2-1.png",
                "/images/manual/personal2-2.png",
              ]}
            />

            <Section
              id="course"
              title="📘 หลักสูตร"
              text="จัดการข้อมูลหลักสูตรที่เปิดสอน"
              images={[
                "/images/manual/course1.png",
                "/images/manual/course2.png",
                "/images/manual/course3.png",
                "/images/manual/course4.png",
              ]}
            />

            <Section
              id="subject"
              title="📖 รายวิชา"
              text="จัดการข้อมูลรายวิชา"
              images={[
                "/images/manual/subject1.png",
                "/images/manual/subject2.png",
              ]}
            />

            <Section
              id="calendar"
              title="📅 ปฏิทินกิจกรรม"
              text="เพิ่มและจัดการกิจกรรมต่าง ๆ"
              images={["/images/manual/calendar.png"]}
            />

            <Section
              id="admission"
              title="📢 การรับสมัคร"
              text="ประกาศรายละเอียดการรับสมัคร"
              images={["/images/manual/admission.png"]}
            />

            <Section
              id="permission"
              title="🔐 กำหนดสิทธิ์ผู้ใช้"
              text="สำหรับ Admin เท่านั้น"
              images={["/images/manual/news.png"]}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/* ================= Reusable Section ================= */

function Section({ id, title, text, images }) {
  return (
    <section id={id} className="manual-section mb-5">
      <h4 className="mb-3">{title}</h4>
      <p>{text}</p>

      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={title}
          className="img-fluid rounded shadow mt-3"
        />
      ))}
    </section>
  );
}

export default Manual;
