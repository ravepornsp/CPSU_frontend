import React from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";

const Admission = () => {
  return (
    <>
      <Headers />
      <Navbar />
      <div className="container text-center">
        <div className="row">
        
            <p>
              การรับสมัครทั้งหมด
            </p>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Admission;
