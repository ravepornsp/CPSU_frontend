import React from "react";
import "../css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-component">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <div className="nav-position">
            <a className="navbar-brand" href="/">
              <img
                src="/images/cpsu.png"
                className="img-logo"
                alt="CPSU Logo"
              />
            </a>
            <p className="label-cpsu">
              Department of Computing Silpakorn University
            </p>
          </div>
          <div className="layout-button-nav">
            <Link to="/news">ข่าวสาร</Link>
            <Link to="/people">บุคลากร</Link>
            <Link to="/course">หลักสูตร</Link>
            <Link to="/admission">การรับสมัคร</Link>
            <Link to="/subject">รายวิชา</Link>
            <Link to="/about">เกี่ยวกับภาควิชา</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
