import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../component_admin/navbar";
import Headers from "../../component_admin/header";
import Footer from "../../component_admin/footer";
import Menu from "../../component_admin/menu";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/admin/news_add.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit_News = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(1);
  const [fileDetail, setFileDetail] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchDetailNews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/admin/news/${id}`
        );
        const data = response.data;

        setTitle(data.title || "");
        setContent(data.content || "");
        setCategory(data.category ? String(data.category) : 1);
      } catch (error) {
        console.log("Error fetching news details", error);
      }
    };

    fetchDetailNews();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();

    const body = {
      title,
      content,
      news_type: category,
      detail_url: fileDetail,
      images: [], // หากมีข้อมูลภาพแนบมาด้วย
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/news/${id}`,
        body
      );

      alert("แก้ไขข่าวสารสำเร็จ");
      navigate("/news");
      console.log("Update success:", response.data);
    } catch (error) {
      console.log("Error submitting news", error);
    }
  };

  return (
    <>
      <Headers />
      <Navbar />
      <div className="container text-center">
        <div className="row">
          <div className="col-sm-4">
            <Menu />
          </div>
          <div className="col-sm-8 text-start">
            <p className="header-news-p">แก้ไขข่าวสาร</p>
            <form onSubmit={handleEdit}>
              <div className="mb-3">
                <label className="form-label" id="text-news">
                  หัวข้อข่าวสาร
                </label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label" id="text-news">
                  เนื้อหาข่าวสาร
                </label>
                <div className="custom-editor">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" id="text-news">
                  ประเภทข่าวสาร
                </label>
                <select
                  className="form-select form-select-sm"
                  value={category}
                  onChange={(e) => setCategory(Number(e.target.value))}
                >
                  <option value="1">ข่าวประชาสัมพันธ์</option>
                  <option value="2">ทุนการศึกษา</option>
                  <option value="3">รางวัลที่ได้รับ</option>
                  <option value="4">กิจกรรมของภาควิชา</option>
                </select>
              </div>

              <div className="mb-3">
                <div className="row justify-content-center">
                  <div className="col-4">
                    <label className="form-label" id="text-news">
                      รายละเอียดข่าวสาร
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setFileDetail(e.target.files[0])}
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label" id="text-news">
                      รูปภาพ
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      onChange={(e) => setFileImage(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="btn-submit"
                >
                  อัปเดตข่าวสาร
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Edit_News;
