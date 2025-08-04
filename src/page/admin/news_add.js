import React, { useState } from "react";
import Navbar from "../../component_admin/navbar";
import Headers from "../../component_admin/header";
import Footer from "../../component_admin/footer";
import Menu from "../../component_admin/menu";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/admin/news_add.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_News = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("1");
  const [urlDetail, setUrlDetail] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newNews = {
      title: title,
      content: content,
      category: category,
      urlDetail: urlDetail,
      fileImage: fileImage,
    };

    console.log(title);
    console.log(content);
    console.log(category);
    console.log(urlDetail);
    console.log(fileImage);
    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/news",
        newNews
      );

      console.log(response);

      setNews([...news, newNews]);

      setTitle("");
      setContent("");
      setCategory("");
      setUrlDetail("");
      setFileImage("");

      alert("เผยแพร่ข่าวสารสำเร็จ");
      navigate("/news");
    } catch (error) {
      console.log("Error submittimg news");
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
            <p className="header-news-p">เพิ่มข่าวสาร</p>
            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setCategory(e.target.value)}
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
                      // type="file"
                      onChange={(e) => setUrlDetail(e.target.value)}
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

              {/* <button type="submit" className="btn btn-primary" id="btn-submit">
                เผยแพร่
              </button> */}
              <div className="d-flex justify-content-center gap-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="btn-submit"
                >
                  เผยแพร่
                </button>
                {/* <button type="button" className="btn btn-secondary" >
                  ล้างข้อมูล
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Add_News;
