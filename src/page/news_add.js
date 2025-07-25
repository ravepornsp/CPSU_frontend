import React from "react";
import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import Menu from "../component/menu";
import "../css/news_add.css";

const Add_News = () => {
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
            <p className="header-news-p">เพิ่มข่าวสาร</p>
            <form>
              <div className="mb-3">
                <label className="form-label" id="text-news">
                  หัวข้อข่าวสาร
                </label>
                <input className="form-control"></input>
              </div>
              <div className="mb-3">
                <label className="form-label" id="text-news">
                  เนื้อหาข่าวสาร
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label" id="text-news">
                  ประเภทข่าวสาร
                </label>
                <select className="form-select form-select-sm">
                  {/* <option selected>ประเภทข่าวสาร</option> */}
                  <option value="1">ข่าวประชาสัมพันธ์</option>
                  <option value="2">ทุนการศึกษา</option>
                  <option value="3">รางวัลที่ได้รับ</option>
                  <option value="4">กิจกรรมของภาควิชา</option>
                </select>
              </div>
              <div className="mb-3">
                <div class="row justify-content-center">
                  <div class="col-4">
                    <label className="form-label" id="text-news">
                      รายละเอียดข่าวสาร
                    </label>
                    <input className="form-control" type="file"></input>
                  </div>
                  <div class="col-4">
                    <label className="form-label" id="text-news">
                      รูปภาพ
                    </label>
                    <input className="form-control" type="file"></input>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary" id="btn-submit">
                เผยแพร่
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Add_News;
