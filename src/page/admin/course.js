import React, { useEffect, useState } from "react";
import "../../css/admin/course.css";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import { Link } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/admin/course")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

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
            <p id="header-degree">ปริญญาตรี</p>
            {/* แสดงรายการหลักสูตรจาก API */}
            <div className="mt-3 row">
              {courses.map((course) => (
                <div className="col-md-4 mb-3" key={course.course_id}>
                  <div className="card h-100">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{course.course_id}</h5>
                      <h5 className="card-title">{course.thai_course}</h5>
                      <div className="mt-auto">
                        <Link
                          to={`/admin/course/${course.course_id}`}
                          className="btn btn-primary"
                          id="btn-detailcourse"
                        >
                          ดูรายละเอียด
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p id="header-degree">ปริญญาโท</p>
            <p id="header-degree">ปริญญาเอก</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Course;
