import React, { useEffect, useState } from "react";
import "../../css/admin/news.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Menu from "../../component/menu";

function News_admin() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/admin/news");
        setNews(res.data);
      } catch (err) {
        console.error("Error fetching news", err);
      }
    };

    fetchNews();
  }, []);

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
            <div className="row">
              <div className="col-md-4" id="new-all">
                ข่าวสารทั้งหมด
              </div>
              <div className="col-md-4 offset-md-4">
                <Link
                  to="/admin/addnews"
                  className="list-group-item"
                  id="btn-addnew"
                >
                  เพิ่มข่าวสาร
                </Link>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {news.map((item, index) => (
                <div className="col" key={index}>
                  <Link
                    to={`/admin/news/${item.news_id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card h-200">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].file_image
                            : "/images/cpsu.png"
                        }
                        className="card-img-top"
                        alt={item.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title" id="card-title">
                          {item.title}
                        </h5>
                        {/* <h5 className="card-title" id="card-title">
                          {item.title.length > 70
                            ? item.title.slice(0, 70) + "..."
                            : item.title}
                        </h5> */}
                      </div>

                      <div className="card-footer">
                        <small className="text-muted">
                          {new Date(item.created_at).toLocaleString("th-TH", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div id="space"></div>
      <Footer />
    </>
  );
}

export default News_admin;
