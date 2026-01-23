import React, { useEffect, useState } from "react";
import "../../css/admin/news.css";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import api from "../../api/axios";

function News_admin() {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get("/admin/news"); // ✅ ใช้ api
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news", err);

        // 🔐 ถ้า token หมดอายุ / ไม่มีสิทธิ์
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchNews();
  }, [navigate]);

  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center mt-4">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="news-title">ข่าวสารทั้งหมด</h3>
              <Link to="/admin/addnews" className="btn-addnews">
                + เพิ่มข่าวสาร
              </Link>
            </div>

            {news.length === 0 ? (
              <p className="text-muted">ยังไม่มีข่าวสาร</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {news.map((item) => (
                  <div className="col" key={item.news_id}>
                    <Link
                      to={`/admin/news/${item.news_id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div className="card h-100 shadow-sm news-card">
                        <img
                          src={
                            item.cover_image ||
                            item?.images?.[0]?.file_image ||
                            "/images/cpsu.png"
                          }
                          className="card-img-top news-img"
                          alt={item.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {item.title.length > 70
                              ? item.title.slice(0, 70) + "..."
                              : item.title}
                          </h5>
                        </div>
                        <div className="card-footer">
                          <small className="text-muted">
                            {new Date(item.created_at).toLocaleString("th-TH")}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default News_admin;
