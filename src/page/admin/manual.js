import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import "../../css/admin/manual.css";

import {
  FaNewspaper,
  FaUsers,
  FaBookOpen,
  FaClipboardList,
  FaCalendarAlt,
  FaBullhorn,
  FaUserShield,
  FaPlusCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function Manual() {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="manual-wrapper">
        {/* ===== Sidebar ===== */}
        <div className="manual-sidebar">
          <h6 className="fw-bold mb-3">สารบัญ</h6>

          <ul className="manual-toc text-start">
            {/* ข่าวสาร */}
            <li>
              <b>ข่าวสาร</b>
              <ul>
                <li>
                  {" "}
                  <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("news-add")}>เพิ่มข่าวสาร</a>
                </li>
                <li>
                  <FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("news-edit")}>แก้ไขข่าวสาร</a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("news-delete")}>ลบข่าวสาร</a>
                </li>
              </ul>
            </li>

            <li>
              <b>บุคลากร</b>
              <ul>
                <li>
                  <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("person-add")}>เพิ่มบุคลากร</a>
                </li>
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("person-edit")}>แก้ไขบุคลากร</a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("person-delete")}>ลบบุคลากร</a>
                </li>
              </ul>
            </li>

            {/* หลักสูตร */}
            <li>
              <b>หลักสูตร</b>
              <ul>
                <li>
                  {" "}
                  <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("course-add")}>เพิ่มหลักสูตร</a>
                </li>
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("course-edit")}>แก้ไขหลักสูตร</a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("course-delete")}>ลบหลักสูตร</a>
                </li>
              </ul>
            </li>

            {/* รายวิชา */}
            <li>
              <b>รายวิชา</b>
              <ul>
                <li>                <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("subject-add")}>เพิ่มรายวิชา</a>
                </li>
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("subject-edit")}>แก้ไขรายวิชา</a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("subject-delete")}>ลบรายวิชา</a>
                </li>
              </ul>
            </li>

            {/* ปฏิทินกิจกรรม */}
            <li>
              <b>ปฏิทินกิจกรรม</b>
              <ul>
                <li>                <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("calendar-add")}>เพิ่มกิจกรรม</a>
                </li>
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("calendar-edit")}>
                    แก้ไขกิจกรรม
                  </a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("calendar-delete")}>ลบกิจกรรม</a>
                </li>
              </ul>
            </li>

            {/* การรับสมัคร */}
            <li>
              <b>การรับสมัคร</b>
              <ul>
                <li>                <FaPlusCircle color="green" />
                  <a onClick={() => scrollToId("admission-add")}>
                    เพิ่มการรับสมัคร
                  </a>
                </li>
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("admission-edit")}>
                    แก้ไขการรับสมัคร
                  </a>
                </li>
                <li><FaTrash color="gray" />
                  <a onClick={() => scrollToId("admission-delete")}>
                    ลบการรับสมัคร
                  </a>
                </li>
              </ul>
            </li>

            {/* กำหนดสิทธิ์ */}
            <li>
              <b>กำหนดสิทธิ์ผู้ใช้งาน</b>
              <ul>
                {/* <li>
                  <a onClick={() => scrollToId("permission-add")}>
                    เพิ่มสิทธิ์
                  </a>
                </li> */}
                <li><FaEdit color="#0d6efd" />
                  <a onClick={() => scrollToId("permission-edit")}>
                    แก้ไขสิทธิ์
                  </a>
                </li>
                {/* <li>
                  <a onClick={() => scrollToId("permission-delete")}>
                    ลบสิทธิ์
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>

        {/* ===== Content ===== */}
        <div className="manual-content">
          <h3 className="mb-4">คู่มือการใช้งานระบบผู้ดูแล</h3>

          {/* ================= ข่าวสาร ================= */}

          <section className="manual-section">
            <h4>
              <FaNewspaper /> ข่าวสาร
            </h4>

            {/* เพิ่มข่าวสาร */}
            <div id="news-add" className="manual-sub">
              <h5 className="text-start">
                <FaPlusCircle color="green" /> เพิ่มข่าวสาร
              </h5>

              <img src="/images/manual/news.png" className="manual-image" />
              <ul className="text-start">
                <li>1.ระบุหัวข้อข่าวสาร</li>
                <li>2.ระบุเนื้อหาข่าวสาร</li>
                <li>3.เลือกประเภทข่าวสาร</li>
                <li>4.ระบุรายละเอียดเพิ่มเติม</li>
                <li>5.เลือกรูปภาพหน้าปก</li>
                <li>6.เลือกรูปภาพข่าวสาร</li>
                <li>7.เมื่อกรอกข้อมูลเสร็จให้กด "เผยแพร่"</li>
              </ul>
            </div>

            {/* แก้ไขข่าวสาร */}
            <div id="news-edit" className="manual-sub">
              <h5 className="text-start">
                <FaEdit color="#0d6efd" /> แก้ไขข่าวสาร
              </h5>

              <p className="text-start">
                เมื่อเข้าดูรายละเอียดของข่าวสารจะมีปุ่มให้แก้ไข
              </p>
              <img
                src="/images/manual/news-edit1.png"
                className="manual-image"
              />

              <ul className="text-start">
                <li>1. เข้าหน้ารายละเอียดข่าวสาร</li>
                <li>2. กดปุ่ม "แก้ไข"</li>
                <li>3.ระบบจะแสดงหน้าฟอร์มแก้ไข</li>
                <li>4. สามารถแก้ไขหัวข้อ เนื้อหาและรูปภาพได้</li>
                <li>5. เมื่อแก้ไขเสร็จให้กด "บันทึก"</li>
              </ul>

              <img
                src="/images/manual/news-edit2.png"
                className="manual-image"
              />
            </div>

            {/* ลบข่าวสาร */}
            <div id="news-delete" className="manual-sub">
              <h5 className="text-start">
                <FaTrash color="red" /> ลบข่าวสาร
              </h5>

              <p className="text-start">
                เมื่อเข้าดูรายละเอียดข่าวสารจะมีปุ่มให้ลบหากต้องการลบสามารถกดลบได้ทันที
              </p>

              <img
                src="/images/manual/news-delete.png"
                className="manual-image"
              />
            </div>
          </section>

          <section className="manual-section">
            <h4>
              <FaUsers /> บุคลากร
            </h4>
            <div id="person-add" className="manual-sub">
              <h5 className="text-start">
                <FaPlusCircle color="green" /> เพิ่มบุคลากร
              </h5>

              <p className="text-start">1.เลือกประเภทบุคลากร</p>
              <img
                src="/images/manual/personal1.png"
                className="manual-image"
              />
              <img
                src="/images/manual/personal2.png"
                className="manual-image"
              />
              <p className="text-start">
                2.1 เมื่อเลือก <strong> " สายวิชาการ " </strong>
                ให้กรอกรายละเอียดดังรูปให้ครบถ้วนและ " บันทึก "
              </p>
              <img
                src="/images/manual/personal2-1.png"
                className="manual-image"
              />
              <p className="text-start">
                2.2 เมื่อเลือก<strong> "สายสนับสนุนวิชาการ" </strong>
                ให้กรอกรายละเอียดดังรูปให้ครบถ้วนและกด " บันทึก "
              </p>
              <img
                src="/images/manual/personal2-2.png"
                className="manual-image"
              />
            </div>

            <div id="person-edit" className="manual-sub">
              <h5 className="text-start">
                <FaEdit color="#0d6efd" /> แก้ไขบุคลากร
              </h5>

              <p className="text-start">
                เมื่อเข้าดูรายละเอียดของข่าวสารจะมีปุ่มให้แก้ไข
              </p>
              <img
                src="/images/manual/personal-edit1.png"
                className="manual-image"
              />
              <p className="text-start">
                เมื่อกดปุ่ม "แก้ไข" จะสามารถแก้ไขข้อมูลต่าง ๆ ได้ดังรูป
              </p>
              <img
                src="/images/manual/personal-edit2.png"
                className="manual-image"
              />
            </div>

            <div id="person-delete" className="manual-sub">
              <h5 className="text-start">
                <FaTrash color="red" /> ลบบุคลากร
              </h5>
              <p className="text-start">
                เมื่อเข้าดูรายละเอียดของข่าวสารจะมีปุ่มให้ลบ
              </p>
              <p className="text-start">หากต้องการลบสามารถกดลบได้</p>
              <img
                src="/images/manual/personal-edit1.png"
                className="manual-image"
              />
            </div>
          </section>

          <section className="manual-section">
            <h4>
              <FaBookOpen /> หลักสูตร
            </h4>
            <div id="course-add" className="manual-sub">
              <h5 className="text-start">
                <FaPlusCircle color="green" /> เพิ่มหลักสูตร
              </h5>
              <ul className="text-start">
                <li>1. เลือกสถานะ [แสดง / ไม่แสดง]</li>
                <li>2. ระบุรหัสของหลักสูตร</li>
                <li>3. เลือกระดับปริญญา [ปริญญาตรี / ปริญญาโท / ปริญญาเอก]</li>
                <li>4. ระบุปีของหลักสูตร</li>
                <li>5. ระบุสาขา</li>
                <li>6. ระบุชื่อหลักสูตรภาษาไทย</li>
                <li>7. ระบุชื่อหลักสูตรภาษาอังกฤษ</li>
                <li>8. ระบุชื่อปริญญาภาษาไทย</li>
                <li>9. ระบุชื่อปริญญาภาษาอังกฤษ</li>
                <li>10. ระบุเกณฑ์การเข้าศึกษา</li>
                <li>11. ระบุเกณฑ์การจบศึกษา</li>
                <li>12. ระบุปรัชญาของหลักสูตร</li>
                <li>13. ระบุวัตถุประสงค์ของหลักสูตร</li>
                <li>14. ระบุ PLOs</li>
                <li>15. ระบุอาชีพที่ประกอบได้</li>
                <li>16. ระบุค่าใช้จ่าย</li>
                <li>17. ระบุหน่วยกิต</li>
                <li>18. ระบุรายละเอียดเพิ่มเติม (ลิงค์)</li>
                <li>19. ระบุโครงสร้างหลักสูตร</li>
                <li>20. อัพโหลดไฟล์แผนการศึกษา</li>
              </ul>
              <img
                src="/images/manual/course-add.png"
                className="manual-image"
              />
            </div>
            <div id="course-edit" className="manual-sub">
              <h5 className="text-start">
                <FaEdit color="#0d6efd" /> แก้ไขหลักสูตร
              </h5>
              <p className="text-start">
                เมื่อเข้าดูรายละเอียดของหลักสูตรจะมีปุ่มแก้ไขแสดง
              </p>
              <img
                src="/images/manual/course-edit2.png"
                className="manual-image"
              />
              <p className="text-start">
                เมื่อคลิกที่ปุ่ม "แก้ไข" จะแสดงข้อมูลให้แก้ไข
              </p>
              <ul className="text-start">
                <li>1. เลือกสถานะ [แสดง / ไม่แสดง]</li>
                <li>2. ระบุรหัสของหลักสูตร</li>
                <li>3. เลือกระดับปริญญา [ปริญญาตรี / ปริญญาโท / ปริญญาเอก]</li>
                <li>4. ระบุปีของหลักสูตร</li>
                <li>5. ระบุสาขา</li>
                <li>6. ระบุชื่อหลักสูตรภาษาไทย</li>
                <li>7. ระบุชื่อหลักสูตรภาษาอังกฤษ</li>
                <li>8. ระบุชื่อปริญญาภาษาไทย</li>
                <li>9. ระบุชื่อปริญญาภาษาอังกฤษ</li>
                <li>10. ระบุเกณฑ์การเข้าศึกษา</li>
                <li>11. ระบุเกณฑ์การจบศึกษา</li>
                <li>12. ระบุปรัชญาของหลักสูตร</li>
                <li>13. ระบุวัตถุประสงค์ของหลักสูตร</li>
                <li>14. ระบุ PLOs</li>
                <li>15. ระบุอาชีพที่ประกอบได้</li>
                <li>16. ระบุค่าใช้จ่าย</li>
                <li>17. ระบุหน่วยกิต</li>
                <li>18. ระบุรายละเอียดเพิ่มเติม (ลิงค์)</li>
                <li>19. ระบุโครงสร้างหลักสูตร</li>
                <li>20. อัพโหลดไฟล์แผนการศึกษา</li>
              </ul>
              <img
                src="/images/manual/course-edit.png"
                className="manual-image"
              />
              <div id="course-delete" className="manual-sub">
                <h5 className="text-start">
                  <FaTrash color="red" /> ลบหลักสูตร
                </h5>
                <p className="text-start">
                  เมื่อเข้าดูรายละเอียดของหลักสูตรจะมีปุ่ม "ลบ" แสดง
                </p>
                <img
                  src="/images/manual/course-edit2.png"
                  className="manual-image"
                />
                <p className="text-start">
                  เมื่อคลิกที่ปุ่ม "ลบ" จะสามารถลบหลักสูตรได้
                </p>
              </div>
            </div>
          </section>
          <section className="manual-section">
            <h4>
              <FaClipboardList /> รายวิชา
            </h4>
            <div id="subject-add" className="manual-sub text-start">
              <h5>
                <FaPlusCircle color="green" /> เพิ่มรายวิชา
              </h5>
            </div>
            <img
              src="/images/manual/subject-add.png"
              className="manual-image"
            />
            <div id="subject-edit" className="manual-sub">
              <h5 className="text-start">
                <FaEdit color="#0d6efd" /> แก้ไขรายวิชา
              </h5>
              <img
                src="/images/manual/subject-edit1.png"
                className="manual-image"
              />
              <img
                src="/images/manual/subject-edit2.png"
                className="manual-image"
              />
              <div id="subject-delete" className="manual-sub">
                <h5 className="text-start">
                  <FaTrash color="red" /> ลบรายวิชา
                </h5>
                <p className="text-start">
                  เมื่อเข้าดูรายละเอียดของรายวิชาจะมีปุ่ม "ลบ" แสดง
                </p>
                <p className="text-start">
                  เมื่อคลิกที่ปุ่ม "ลบ" จะสามารถลบรายวิชาได้
                </p>
                <img
                  src="/images/manual/subject-edit1.png"
                  className="manual-image"
                />
              </div>
            </div>
          </section>
          <section className="manual-section">
            <h4>
              <FaCalendarAlt /> ปฏิทินกิจกรรม
            </h4>
            <div id="calendar-add" className="manual-sub text-start">
              <h5>
                <FaPlusCircle color="green" /> เพิ่มปฏิทินกิจกรรม
              </h5>
              <img
                src="/images/manual/calendar-add.png"
                className="manual-image"
              />
            </div>
            <div id="calendar-edit" className="manual-sub text-start">
              <h5>
                <FaEdit color="#0d6efd" /> แก้ไขปฎิทินกิจกรรม
              </h5>
              <img
                src="/images/manual/calendar-edit1.png"
                className="manual-image"
              />
              <img
                src="/images/manual/calendar-edit2.png"
                className="manual-image"
              />
            </div>
            <div id="calendar-delete" className="manual-sub text-start">
              <h5>
                <FaTrash color="red" /> ลบปฏิทินกิจกรรม
              </h5>
              <img
                src="/images/manual/calendar-edit1.png"
                className="manual-image"
              />
            </div>
          </section>
          <section className="manual-section">
            <h4>
              <FaBullhorn /> การรับสมัคร
            </h4>
            <div id="admission-add" className="manual-sub text-start">
              <h5>
                <FaPlusCircle color="green" /> เพิ่มการรับสมัคร
              </h5>
              <img
                src="/images/manual/admission1.png"
                className="manual-image"
              />
            </div>
            <div id="admission-edit" className="manual-sub text-start">
              <h5>
                <FaEdit color="#0d6efd" /> แก้ไขการรับสมัคร
              </h5>
              <img
                src="/images/manual/admission-edit1.png"
                className="manual-image"
              />
              <img
                src="/images/manual/admission-edit2.png"
                className="manual-image"
              />
            </div>
            <div id="admission-delete" className="manual-sub text-start">
              <h5>
                <FaTrash color="red" /> ลบการรับสมัคร
              </h5>
              <img
                src="/images/manual/admission-edit1.png"
                className="manual-image"
              />
            </div>
          </section>
          <section className="manual-section">
            <h4>
              <FaUserShield /> กำหนดสิทธิ์ผู้ใช้
            </h4>
            <div id="permission-edit" className="manual-sub text-start">
              <h5>
                <FaEdit color="#0d6efd" /> แก้สิทธิ์ผู้ใช้
              </h5>
              <img
                src="/images/manual/permission2.png"
                className="manual-image"
              />
              <img
                src="/images/manual/permission1.png"
                className="manual-image"
              />
              <img
                src="/images/manual/permission3.png"
                className="manual-image"
              />
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Manual;
