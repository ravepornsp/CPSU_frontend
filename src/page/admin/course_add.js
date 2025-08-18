import React from "react";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import "../../css/admin/course_add.css";

const Add_course = () => {
  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8">
            <div className="col-md-4" id="course-all">
              เพิ่มหลักสูตร
            </div>
            <p id="text-header-coures">ชื่อหลักสูตร</p>
            <div className="mb-3">
              <label className="form-label " id="input-course">ชื่อภาษาไทย</label>
              <input className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label " id="input-course">ชื่ออังกฤษ</label>
              <input className="form-control" />
            </div>

            <p id="text-header-coures">ชื่อปริญญา</p>
            <div className="mb-3">
              <label className="form-label " id="input-course">ชื่อภาษาไทย</label>
              <input className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label " id="input-course">ชื่ออังกฤษ</label>
              <input className="form-control" />
            </div>

            <p id="text-header-coures">เกณฑ์การเข้าศึกษา</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

            <p id="text-header-coures">เกณฑ์สำเร็จการศึกษา</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

            <p id="text-header-coures">ปรัชญาของหลักสูตร</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

            <p id="text-header-coures">วัตถุประสงค์ของหลักสูตร</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

            <p id="text-header-coures">รายละเอียดผลการเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning Outcome: PLOs)</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

             <p id="text-header-coures">ค่าใช้จ่าย</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

             <p id="text-header-coures">หน่วยกิต</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

             <p id="text-header-coures">อาชีพที่สามารถประกอบได้หลังสําเร็จการศึกษา</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

             <p id="text-header-coures">รายละเอียดเพิ่มเติม</p>
            <div className="mb-3">
              <input className="form-control" />
            </div>

             <p id="text-header-coures">โครงสร้างหลักสูตร</p>
            <div className="mb-3">
              <input className="form-control" type="file"/>
            </div>
             <p id="text-header-coures">แผนผังหลักสูตร</p>
            <div className="mb-3">
              <input className="form-control" type="file"/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Add_course;
