import React from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import { Link } from "react-router-dom";

const Course_admin = () => {
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
            <div className="row">
              <div className="col-md-4" id="course-all">
                หลักสูตรทั้งหมด
              </div>

              <div className="col-md-4 offset-md-4">
                <Link
                  to="/admin/addcourse"
                  className="list-group-item"
                  id="btn-addcourse"
                >
                  เพิ่มหลักสูตร
                </Link>
              </div>
            </div>
            <div>
              <p id="header-degree">ปริญญาตรี</p>
            </div>
            <div>
              <p id="header-degree">ปริญญาโท</p>
            </div>
            <div>
              <p id="header-degree">ปริญญาเอก</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Course_admin;
