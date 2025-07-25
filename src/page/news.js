import React from "react";
import Headers from "../component/header";
import "../css/news.css";
import Navbar from "../component/navbar";
import Menu from "../component/menu";
import Footer from "../component/footer";
import { Link, useNavigate } from "react-router-dom";

function News() {
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
            <p id="new-all">ข่าวสารทั้งหมด</p>
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <div class="col">
                <Link
                  to="/detailnews"
                  className="text-decoration-none text-dark"
                >
                  <div className="card h-100">
                    <img
                      src="images/cpsu_event.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        งานประสานสัมพันธ์ภาคคอมพิวเตอร์
                      </h5>
                      {/* <p class="card-text">
                        
                      </p> */}
                    </div>
                    <div className="card-footer">
                      <small className="text-body-secondary">
                        23/02/2025 14:36
                      </small>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            <Link to="/addnews" className="list-group-item" id="btn-addnew">
              เพิ่มข่าวสาร
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default News;
