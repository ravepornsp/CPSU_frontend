import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Headers from "../component/header";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import "../css/news_detail.css";
import Breadcrumb from "../component/Breadcrumb";

const NewsDetail = () => {
  const { news_id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/news/${news_id}`
        );
        setNews(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news detail:", err);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [news_id]);

  if (loading) return <p className="text-center mt-5">กำลังโหลด...</p>;
  if (!news) return <p className="text-center mt-5">ไม่พบข่าวที่ต้องการ</p>;

  return (
    <>
      <Headers />
      <Navbar />
      <Breadcrumb
        items={[
          { label: "ข่าวสาร", path: "/news" },
          { label: news?.title || "รายละเอียดข่าว" },
        ]}
      />
      <div className="container py-5">
        {/* <h4>ข่าวสาร</h4> */}
        <div className="row">
          {/* ซ้าย : รูป / Carousel */}
          <div className="col-md-5 mb-4">
            {/* กรณีมีหลายรูป */}
            {news.images && news.images.length > 1 && (
              <div
                id="newsCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {news.images.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={image.file_image}
                        className="d-block w-100 rounded"
                        alt={`News ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#newsCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" />
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#newsCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" />
                </button>
              </div>
            )}

            {/* กรณีมีรูปเดียว */}
            {news.images && news.images.length === 1 && (
              <img
                src={news.images[0].file_image}
                alt={news.title}
                className="img-fluid rounded"
              />
            )}
          </div>

          {/* ขวา : เนื้อหาข่าว */}
          <div className="col-md-7 text-start">
            <h2 className="mb-3">{news.title}</h2>

            <p className="text-muted mb-4 text-start">
              เผยแพร่เมื่อ{" "}
              {new Date(news.created_at).toLocaleString("th-TH", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>

            <div className="news-content">
              <p>{news.content || "ไม่มีเนื้อหาข่าวเพิ่มเติม"}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewsDetail;
