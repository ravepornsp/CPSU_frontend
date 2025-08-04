import React from "react";
import Navbar from "../../component_admin/navbar";
import Menu from "../../component_admin/menu";
import Headers from "../../component_admin/header";


const Subject = () => {
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
            <p>
              รายวิชาทั้งหมด
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subject;
