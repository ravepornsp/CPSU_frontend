import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../component/navbar";
import Headers from "../component/header";
import Footer from "../component/footer";
import "../css/homepage.css";

const Homepage = () => {
  const [newsList, setNewsList] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState(null);

  const [personnelList, setPersonnelList] = useState([]);
  const [loadingPersonnel, setLoadingPersonnel] = useState(true);
  const [errorPersonnel, setErrorPersonnel] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/admin/news");
        setNewsList(res.data); // สมมติ API คืน array ของข่าว
      } catch (err) {
        console.error("Error fetching news:", err);
        setErrorNews("ไม่สามารถโหลดข่าวได้");
      } finally {
        setLoadingNews(false);
      }
    };

    const fetchPersonnel = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/admin/personnel"
        );
        if (res.data && Array.isArray(res.data)) {
          // กรองเฉพาะที่มีรูป
          const filtered = res.data.filter(
            (p) => p.file_image && p.type_personnel === "สายวิชาการ"
          );

          // สุ่มข้อมูล
          const shuffled = filtered.sort(() => 0.5 - Math.random());

          // เอารูปไม่ซ้ำ max 5 คน
          const uniqueImages = new Set();
          const uniquePersonnel = [];

          for (let person of shuffled) {
            if (!uniqueImages.has(person.file_image)) {
              uniqueImages.add(person.file_image);
              uniquePersonnel.push(person);
            }
            if (uniquePersonnel.length === 5) break;
          }

          setPersonnelList(uniquePersonnel);
        }
      } catch (err) {
        console.error("Error fetching personnel:", err);
        setErrorPersonnel("ไม่สามารถโหลดบุคลากรได้");
      } finally {
        setLoadingPersonnel(false);
      }
    };

    fetchNews();
    fetchPersonnel();
  }, []);

  const events = [
    {
      shortDate: "6 ก.ย.",
      fullDate: "6 ก.ย. - 14 ก.ย. 2568",
      title: "มหกรรมการสอบกลางภาค",
    },
    {
      shortDate: "10 ก.ย.",
      fullDate: "10 กันยายน 2568",
      title: "ประชุมคณะกรรมการภาควิชา",
    },
    {
      shortDate: "15 ก.ย.",
      fullDate: "15 ก.ย. - 20 ก.ย. 2568",
      title: "กิจกรรมอบรมเชิงปฏิบัติการ",
    },
    {
      shortDate: "25 ก.ย.",
      fullDate: "25 กันยายน 2568",
      title: "สัมมนานักศึกษาใหม่",
    },
  ];

  if (loadingNews || loadingPersonnel) return <p>กำลังโหลดข้อมูล...</p>;
  if (errorNews) return <p>{errorNews}</p>;
  if (errorPersonnel) return <p>{errorPersonnel}</p>;

  return (
    <div className="app-container">
      <Headers />
      <Navbar />

      {/* Banner */}
      <div className="carouse-banner">
        <div id="carouselExampleFade" className="carousel slide carousel-fade">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="banner-cusp1.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <div className="carousel-name">
                  <h5>ภาควิชาคอมพิวเตอร์</h5>
                  <h5>คณะวิทยาศาสตร์</h5>
                  <h5>มหาวิทยาลัยศิลปากร</h5>
                </div>
                <Link to="/course">
                  <button className="btn btn-primary">หลักสูตร</button>
                </Link>
              </div>
            </div>
            <div className="carousel-item">
              <img src="banner-cusp2.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <div className="carousel-name">
                  <h5>บุคลากรที่มีคุณภาพ</h5>
                  <p>ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและสนับสนุน</p>
                  <Link to="/people">
                    <button className="btn btn-primary">บุคลากร</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img src="banner-cusp3.png" className="d-block w-100" alt="..." />
              <div className="carousel-caption">
                <div className="carousel-name">
                  <h5>ติดตามข่าวสารและกิจกรรม</h5>
                  <p>อัพเดทข้อมูลล่าสุดจากภาควิชา</p>
                  <Link to="/news">
                    <button className="btn btn-primary">ข่าวสาร</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* News & Calendar */}
      <div className="news-calendar">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="d-flex align-items-center mb-3">
                <h3 className="mb-0 me-2">ข่าวประชาสัมพันธ์ |</h3>
                <Link
                  to="/news"
                  className="text-primary"
                  style={{ textDecoration: "none", fontSize: "1.1rem" }}
                >
                  ดูข่าวทั้งหมด
                </Link>
              </div>

              <div className="row row-cols-1 row-cols-md-2 g-4">
                {newsList.slice(0, 2).map((item) => (
                  <div className="col" key={item.id}>
                    <div className="card h-300" id="news-homepage">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].file_image
                            : "/images/cpsu.png"
                        }
                        className="card-img-top"
                        alt={item.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.title.length > 80
                            ? item.title.substring(0, 80) + "..."
                            : item.title}
                        </h5>
                        <Link to={`/news/${item.news_id}`}>
                          <button className="btn btn-more">อ่านต่อ</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-4">
              <h3>ปฏิทินกิจกรรม</h3>
              <ul className="list-group" id="list-color">
                {events.map((event, index) => (
                  <li className="list-group-item" key={index}>
                    <div id="box-calendar">
                      <p>{event.shortDate}</p>
                    </div>
                    <div>
                      <p id="calendar-date">{event.fullDate}</p>
                      <p id="calendar-title">{event.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="course-homepage">
        <p>หลักสูตร</p>
        <h2>หลักสูตรที่เปิดสอน</h2>

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col card-wrapper">
            <div className="card h-100 d-flex flex-column justify-content-between">
              <div className="card-body">
                <h5>ปริญญาตรี</h5>
                <ul>
                  <li>สาขาเทคโนโลยีสารสนเทศ</li>
                  <li>สาขาวิชาวิทยาการคอมพิวเตอร์</li>
                  <li>สาขาวิชาวิทยาการข้อมูล</li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <Link to={`/course`}>
                  <button className="btn btn-course">ดูทั้งหมด</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col card-wrapper">
            <div className="card h-100">
              <div className="card-body">
                <h5>ปริญญาโท</h5>
                <ul>
                  <li>สาขาเทคโนโลยีสารสนเทศ</li>
                  <li>สาขาเทคโนโลยีสารสนเทศ และนวัตกรรมดิจิทัล</li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <Link to={`/course`}>
                  <button className="btn btn-course">ดูทั้งหมด</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col card-wrapper">
            <div className="card h-100">
              <div className="card-body">
                <h5>ปริญญาเอก</h5>
                <ul>
                  <li>สาขาเทคโนโลยีสารสนเทศ</li>
                  <li>สาขาเทคโนโลยีสารสนเทศ และนว และนวัตกรรมดิจิทัล </li>
                  <li>สาขาเทคโนโลยีสารสนเทศ และนวัตกรรมดิจิทัล</li>
                </ul>
              </div>
              <div className="card-footer bg-transparent border-0 text-center">
                <Link to={`/course`}>
                  <button className="btn btn-course">ดูทั้งหมด</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ผลงานและรางวัล */}
      <div className="news-homepage">
        <p>ข่าวสาร</p>
        <h2>
          ผลงาน & รางวัลที่ได้รับ|
          <Link
            to="/news"
            className="text-primary"
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
          >
            ดูข่าวทั้งหมด
          </Link>
        </h2>
        <div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {newsList
              .filter((item) => item.type_id === 3)
              .slice(0, 3)
              .map((item) => (
                <div className="col" key={item.news_id}>
                  <div className="card h-300">
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0].file_image
                          : "/images/cpsu.png"
                      }
                      className="card-img-top"
                      alt={item.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.title.length > 80
                          ? item.title.substring(0, 80) + "..."
                          : item.title}
                      </h5>
                      <Link to={`/news/${item.news_id}`}>
                        <button className="btn btn-more">อ่านต่อ</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* ข่าวทั่วไป */}
          <div className="event-news-homepage">
            <h2>ข่าวทั่วไป & กิจกรรมภาควิชา</h2>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {newsList
                .filter((item) => item.type_id !== 3)
                .slice(0, 4)
                .map((item) => (
                  <div className="col" key={item.news_id}>
                    <div className="card h-300">
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].file_image
                            : "/images/cpsu.png"
                        }
                        className="card-img-top"
                        alt={item.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.title.length > 80
                            ? item.title.substring(0, 80) + "..."
                            : item.title}
                        </h5>
                        <Link to={`/news/${item.news_id}`}>
                          <button className="btn btn-more">อ่านต่อ</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* บุคลากร (ดึงจาก API แบบสุ่ม) */}
      <div className="people-homepage">
        <p>บุคลากร</p>
        <h2>แนะนำคณาจารย์ภาควิชาคอมพิวเตอร์</h2>
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {personnelList.map((personnel, personnel_id) => (
            <div className="col" key={personnel_id}>
              <div className="card-people">
                <Link to={`/teacher/${personnel.personnel_id}`}>
                  <img src={personnel.file_image} alt={personnel.thai_name} />
                </Link>
                <h5 className="card-title" id="name-people">
                  {personnel.thai_academic_position}
                  {personnel.thai_name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
