import React from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer-component">
        {/* Contact Information */}
        <div className="container text-center contact-info">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-auto" id="footer-icon-text">
              <i className="fas fa-phone-alt"></i> 0-3414-7014, 0-3414-7015,
              0-3427-2923
            </div>
            <div className="col-auto" id="footer-icon-text">
              <i className="fas fa-envelope"></i> cpsu@su.ac.th
            </div>
            <div className="col-auto" id="footer-icon-text">
              <i className="fas fa-map-marker-alt"></i> ภาควิชาคอมพิวเตอร์
              คณะวิทยาศาสตร์ ม.ศิลปากร นครปฐม 73000
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className="footer-main">
          {/* Logo + Department Name */}
          <div className="footer-group-name">
            <img src="/cpsu.png" id="img-footer" alt="CPSU Logo" />
            <div>
              <h5 className="label-cpsu1-footer">ภาควิชาคอมพิวเตอร์</h5>
              <p className="label-cpsu2-footer">
                คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร
              </p>
              <div className="footer-social">
                <p>ติดตามภาควิชา</p>
                <a href="https://www.facebook.com/computingsu">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.youtube.com/@ComputerSilpakorn">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Navigation Links */}
          <div className="footer-links">
            <div className="footer-column">
              <h5>หน้าทั้งหมด</h5>
              <ul>
                <li><Link to="/news">ข่าวสาร</Link></li>
                <li><Link to="/personnel">บุคลากร</Link></li>
                <li><Link to="/course">หลักสูตร</Link></li>
                <li><Link to="/admission">การรับสมัคร</Link></li>
                <li><Link to="/document">เอกสาร</Link></li>
                <li><Link to="/about">เกี่ยวกับภาควิชา</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h5>สำหรับผู้สนใจศึกษาต่อ</h5>
              <ul>
                <li><Link to="/news">ข่าวสาร</Link></li>
                <li><Link to="/course">หลักสูตร</Link></li>
                <li><Link to="/admission">การรับสมัคร</Link></li>
                <li><Link to="/about">เกี่ยวกับภาควิชา</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h5>สำหรับนักศึกษา</h5>
              <ul>
                <li><Link to="/news">ข่าวสาร</Link></li>
                <li><Link to="/personnel">บุคลากร</Link></li>
                <li><Link to="/course">หลักสูตร</Link></li>
                <li><Link to="/document">เอกสาร</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h5>สำหรับบุคลากร</h5>
              <ul>
                <li><Link to="/news">ข่าวสาร</Link></li>
                <li><Link to="/personnel">บุคลากร</Link></li>
                <li><Link to="/course">หลักสูตร</Link></li>
                <li><Link to="/login">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="footer-copy">
          {/* © 2025 by Department of Computing, Faculty of Science, Silpakorn
          University. */}
          เว็บไซต์นี้เป็นส่วนหนึ่งของปริญญานิพนธ์ ภาควิชาคอมพิวเตอร์ มหาวิทยาลัยศิลปากร
        </p>
      </div>
    </footer>
  );
};

export default Footer;
