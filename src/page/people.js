import React from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";

const People = () => {
  return (
    <>
      <Headers />
      <Navbar />
      <div className="container text-center">
        <div className="row">
          <p>บุคลากรทั้งหมด</p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default People;
