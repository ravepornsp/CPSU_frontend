import React, { useEffect, useState } from "react";
import Headers from "../../component_admin/header";
import "../../css/admin/news_detail.css";
import Navbar from "../../component_admin/navbar";
import Menu from "../../component_admin/menu";
import Footer from "../../component_admin/footer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Detail_News = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const navigate = useNavigate();

  const deleteNews = async () => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/news/${id}`
      );
      console.log("News deleted successfully:", response.data);
      alert("ลบข่าวสารสำเร็จ");
      navigate("/news");
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  useEffect(() => {
    const detailNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/admin/news/${id}`
        );
        const data = response.data;
        setNews(data);
      } catch (error) {
        console.log("Error fetching news details", error);
      }
    };
    detailNews();
  }, [id]);

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
              <div id="group-btn-header-detail">
                <p id="news-name">{news?.title || "กำลังโหลด..."}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <div className="edit_detele-position">
                    <Link
                      to={`/admin/editnews/${news?.news_id}`}
                      className="btn btn-warning"
                      id="btn-edit"
                    >
                      แก้ไข
                    </Link>
                    <div
                      className="btn btn-danger"
                      id="btn-delete"
                      onClick={deleteNews}
                    >
                      ลบ
                    </div>
                  </div>
                </div>
              </div>

              <div className="component_admin-detail-news row justify-content-between">
                <div className="col-2">
                  <label className="form-label" id="text-news-detail">
                    {news?.created_at
                      ? new Date(news.created_at).toLocaleString("th-TH", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })
                      : ""}
                  </label>
                </div>
              </div>

              <img
                src={
                  news?.images?.length > 0
                    ? news.images[0].image_url
                    : "/images/cpsu.png"
                }
                className="img-news"
                alt={news?.title || ""}
              />

              <div
                className="text-start mt-3"
                dangerouslySetInnerHTML={{ __html: news?.content || "" }}
              ></div>

              <div className="text-start mt-3">
                <p id="news-detail-more">รายละเอียดเพิ่มเติม</p>
                {news?.detail_url ? (
                  news.detail_url.split("\n").map((line, index) => (
                    <p key={index}>
                      <a href={line} target="_blank" rel="noopener noreferrer">
                        {line}
                      </a>
                    </p>
                  ))
                ) : (
                  <p>&nbsp;</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail_News;
