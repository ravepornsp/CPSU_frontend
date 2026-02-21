import React, { useEffect, useState } from "react";
import "../../css/admin/news_detail.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";

const DetailNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const navigate = useNavigate();

  const deleteNews = async () => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข่าวนี้?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/news/${id}`);
      alert("ลบข่าวสารสำเร็จ");
      navigate("/admin/news");
    } catch (error) {
      console.error("Error deleting news:", error);

      if (error.response?.status === 401) {
        alert("กรุณาเข้าสู่ระบบใหม่");
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const detailNews = async () => {
      try {
        const response = await api.get(`/admin/news/${id}`);
        const data = response.data;
        setNews(data);
      } catch (error) {
        console.log("Error fetching news details", error);
      }
    };
    detailNews();
  }, [id]);
  const images = news?.images || [];

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-body">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h4 className="mb-1">{news?.title || "กำลังโหลด..."}</h4>
                {news?.created_at && (
                  <small className="text-muted">
                    {new Date(news.created_at).toLocaleString("th-TH", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </small>
                )}
              </div>

              <div>
                <Link
                  to={`/admin/editnews/${news?.news_id}`}
                  className="btn btn-warning me-2"
                >
                  แก้ไข
                </Link>
                <button className="btn btn-danger" onClick={deleteNews}>
                  ลบ
                </button>
              </div>
            </div>

            {/* รูปภาพ */}
            {images.length > 0 ? (
              <div
                id="newsCarousel"
                className="carousel slide mb-4"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner rounded">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <img
                        src={image.file_image}
                        className="d-block w-100"
                        style={{ maxHeight: "450px", objectFit: "cover" }}
                        alt={`slide-${index}`}
                      />
                    </div>
                  ))}
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#newsCarousel"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#newsCarousel"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <img
                src="/images/cpsu.png"
                className="img-fluid mb-4"
                style={{ maxHeight: "450px", objectFit: "cover" }}
                alt="default"
              />
            )}

            {/* Content */}
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: news?.content || "",
              }}
            />

            {/* Detail URL */}
            <div>
              <h6 className="fw-bold">รายละเอียดเพิ่มเติม</h6>
              {news?.detail_url && news.detail_url !== "null" ? (
                news.detail_url.split("\n").map((line, index) => (
                  <div key={index}>
                    <a href={line} target="_blank" rel="noopener noreferrer">
                      {line}
                    </a>
                  </div>
                ))
              ) : (
                <p>-</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DetailNews;
