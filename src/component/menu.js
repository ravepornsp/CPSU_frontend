import React from "react";
import "../css/menu.css";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div>
        <ul class="list-group">
          <Link to="/news" className="list-group-item" id="btn-menu">
            ข่าวสาร
          </Link>
          <Link to="/people" className="list-group-item" id="btn-menu">
            บุคลากร
          </Link>
          <Link to="/course" className="list-group-item" id="btn-menu">
            หลักสูตร
          </Link>
          <Link to="/admission" className="list-group-item" id="btn-menu">
            การรับสมัคร
          </Link>
          <Link to="/subject" className="list-group-item" id="btn-menu">
            รายวิชา
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Menu;
