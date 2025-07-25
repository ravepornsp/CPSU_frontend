import React from "react";
import Headers from "../component/header";
import "../css/news_detail.css";
import Navbar from "../component/navbar";
import Menu from "../component/menu";
import Footer from "../component/footer";

const Detail_News = () => {
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
            <div>
              <p id="news-name">งานประสานสัมพันธ์ภาคคอมพิวเตอร์</p>

              <div className="component-detail-news row justify-content-between">
                <div className="col-4">
                  <label className="form-label" id="text-news-detail">
                    23/02/2025 14:36
                  </label>
                </div>
                <div className="col-4">
                  <div className="edit_detele-position">
                    <div>
                      แก้ไข <i className="bi bi-pencil-square"></i>
                    </div>
                    <div>
                      ลบ <i className="bi bi-trash"></i>
                    </div>
                  </div>
                </div>
              </div>

              <img
                src="images/cpsu_event.png"
                className="img-news"
                alt="งานสานสัมพันธ์ภาคคอมพิวเตอร์"
              />

              <div className="text-start mt-3">
                <p>🎉 เตรียมตัวให้พร้อม!</p>
                <p>งานสานสัมพันธ์ภาคคอมพิวเตอร์กำลังจะเริ่มขึ้น! 🎊</p>
                <p>📅 เจอกันวันที่ 28 กุมภาพันธ์ 2568</p>
                <p>📍 ณ ลานจอดรถตึก 4 เวลา 17:30 - 21:30 น.</p>
                <p>🎭 ธีม: ย้อนยุค ไม่จำกัดช่วงเวลา! จะเป็นยุคหิน มนุษย์ถ้ำ</p>
                <p>อารยธรรมโบราณ หรือยุคใดก็ได้ จัดเต็มมาให้สุด!</p>
                <p>🏆 มีรางวัลแต่งกายยอดเยี่ยม 3 รางวัล!</p>
                <p>ใครแต่งตัวเข้าธีมและโดดเด่นที่สุด มีสิทธิ์คว้ารางวัลไปเลย!</p>
                <p>🎶 สนุกไปกับการแสดงสุดพิเศษ, เกมสุดมันส์, ลุ้นรางวัล และดนตรีสดปิดท้าย!</p>
                <p>🎸🎤📢 ใครลงชื่อไว้แล้ว เจอกันแน่นอน! เตรียมชุดให้พร้อม แล้วมาสนุกไปด้วยกัน! 💃✨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail_News ;