import React from "react";
import "../css/header.css";
import Theme from "./theme";
import ProfileMenu from "../component/ProfileMenu";

const Headers = () => {
  return (
    <>
      <div>
        <div className="header-component">
          <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand">
                Department of Computing Silpakorn University
              </a>
              <div className="layout-button">
                <ProfileMenu />
                <Theme />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Headers;
