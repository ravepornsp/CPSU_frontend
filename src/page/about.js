import React from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";

const About = () => {
  return <>
    <Headers />
      <Navbar />
      <div className="container text-center">
        <div className="row">
          <p>เกี่ยวกับภาควิชา</p>
        </div>
      </div>
      <Footer/>
  </>;
};

export default About;
