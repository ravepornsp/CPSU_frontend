import React from "react";
import "../css/header.css";
import Theme from "./theme";
import ProfileMenu from "../component/ProfileMenu";

const Headers = () => {
  return (
    <>
      <div>
        <div className="header-component">
          <div className="container-fluid">
            <ProfileMenu />
            <Theme />
          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
