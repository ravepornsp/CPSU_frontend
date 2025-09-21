import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-component">
      <div className="container-fluid">
        <div className="nav-position">
          <Link
            to="/home"
            className="d-flex align-items-center text-decoration-none"
          >
            <div className="navbar-brand">
              <img
                src="/images/cpsu.png"
                className="img-logo"
                alt="CPSU Logo"
              />
            </div>
            <div>
              <h5 className="label-cpsu1">ภาควิชาคอมพิวเตอร์</h5>
              <p className="label-cpsu2">คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร</p>
            </div>
          </Link>
        </div>

        <div className="layout-button-nav">
          <Link to="/news">ข่าวสาร</Link>
          <Link to="/personnel">บุคลากร</Link>
          <Link to="/course">หลักสูตร</Link>
          <Link to="/admission">การรับสมัคร</Link>
          <Link to="/document">เอกสาร</Link>
          {/* <Link to="/subject">รายวิชา</Link> */}
          <Link to="/about">เกี่ยวกับภาควิชา</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
