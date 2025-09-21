import React from "react";
import "../css/menu.css";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div>
        <ul className="list-group">
          <Link to="/admin/news" className="list-group-item" id="btn-menu">
            ข่าวสาร
          </Link>
          <Link to="/admin/personnel" className="list-group-item" id="btn-menu">
            บุคลากร
          </Link>
          <Link to="/admin/course" className="list-group-item" id="btn-menu">
            หลักสูตร
          </Link>
          <Link to="/admin/userpermissions" className="list-group-item" id="btn-menu">
            กำหนดสิทธิ์ผู้ใช้
          </Link>
          <Link to="/admin/subject" className="list-group-item" id="btn-menu">
            รายวิชา
          </Link>
          <Link to="/admin/calendar" className="list-group-item" id="btn-menu">
            ปฏิทินกิจกรรม
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Menu;
