import React from "react";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

const Edit_course = () => {
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
            แก้ไขหลักสูตร
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Edit_course