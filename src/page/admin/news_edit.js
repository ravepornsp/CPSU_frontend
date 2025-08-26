import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../component/navbar";
import Headers from "../../component/header";
import Footer from "../../component/footer";
import Menu from "../../component/menu";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/admin/news_edit.css";
import axios from "axios";

// Cropper
import Cropper from "react-easy-crop";
import Button from "@mui/material/Button";
import { getOrientation } from "get-orientation/browser";

const Edit_News = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // state หลัก
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("1");
  const [urlDetail, setUrlDetail] = useState("");

  // รูปภาพ
  const [fileImage, setFileImage] = useState(null); // cover
  const [newsImages, setNewsImages] = useState([]); // multi
  const [newsPreviewUrls, setNewsPreviewUrls] = useState([]); // preview

  // cropper
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // โหลดข้อมูลเดิม
  // โหลดข้อมูลเดิม
  useEffect(() => {
    if (!id) return;

    const fetchDetailNews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/admin/news/${id}`
        );
        const data = res.data;

        setTitle(data.title || "");
        setContent(data.content || "");
        setCategory(String(data.type_id || 1));
        setUrlDetail(data.detail_url || "");

        // cover image
        if (data.images && data.images.length > 0) {
          setPreviewUrl(data.images[0].file_image); // ใช้ไฟล์แรกเป็น cover
        } else {
          setPreviewUrl(null);
        }

        // multi images
        if (data.images && data.images.length > 0) {
          const urls = data.images.map((img) => img.file_image);
          setNewsPreviewUrls(urls);
        } else {
          setNewsPreviewUrls([]);
        }
      } catch (err) {
        console.log("Error fetching news details", err);
      }
    };

    fetchDetailNews();
  }, [id]);

  const onNewsImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setNewsImages(files);

      // ✅ ถ้าเลือกไฟล์ใหม่ → ใช้ preview จากไฟล์ใหม่แทนของเก่า
      setNewsPreviewUrls(files.map((f) => URL.createObjectURL(f)));
    }
  };
  // show cropped image
  const showCroppedImage = useCallback(async () => {
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([blob], "cover.jpg", { type: blob.type });
      setFileImage(file);

      // ✅ ใช้ objectURL แทน preview เดิม
      setPreviewUrl(URL.createObjectURL(blob));

      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  // cropper callback
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // อ่านไฟล์ cover
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        await getOrientation(file);
      } catch {
        console.warn("failed to detect orientation");
      }

      setImageSrc(imageDataUrl);
    }
  };

  // submit edit
  const handleEdit = async (e) => {
    e.preventDefault();

    const editNews = new FormData();
    editNews.append("title", title);
    editNews.append("content", content);
    editNews.append("type_id", category);
    editNews.append("detail_url", urlDetail);

    if (fileImage) editNews.append("images", fileImage);
    newsImages.forEach((file) => editNews.append("images", file));

    try {
      await axios.put(
        `http://localhost:8080/api/v1/admin/news/${id}`,
        editNews,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("แก้ไขข่าวสารสำเร็จ");
      navigate(`/admin/detailnews/${id}`);
    } catch (err) {
      console.log("Error submitting news", err);
      alert("ไม่สามารถแก้ไขข่าวสารได้");
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

            {imageSrc ? (
              <>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 400,
                    background: "#333",
                  }}
                >
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>
                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    sx={{
                      backgroundColor: "#18756a",
                      "&:hover": { backgroundColor: "#135d54ff" },
                    }}
                  >
                    ตกลง
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label className="form-label">หัวข้อข่าวสาร</label>
                  <input
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">เนื้อหาข่าวสาร</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(e, editor) => setContent(editor.getData())}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">ประเภทข่าวสาร</label>
                  <select
                    className="form-select"
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
                  <label className="form-label">รายละเอียดข่าวสาร</label>
                  <input
                    className="form-control"
                    value={urlDetail}
                    onChange={(e) => setUrlDetail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">รูปภาพหน้าปกข่าว</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                  {previewUrl && (
                    <div
                      className="mt-3"
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <p>Preview รูปหน้าปก:</p>
                      <img
                        src={previewUrl}
                        alt="preview"
                        style={{ maxWidth: "300px", borderRadius: "8px" }}
                      />
                      {/* ปุ่มลบ */}
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setFileImage(null);
                        }}
                        style={{
                          position: "absolute",
                          top: "50px",
                          right: "5px",
                          background: "rgba(0,0,0,0.4)",
                          color: "white",
                          border: "none",
                          borderRadius: "20%",
                          width: "30px",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        aria-label="ลบรูปหน้าปก"
                        title="ลบรูปหน้าปก"
                      >
                        &times;
                      </button>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">รูปภาพข่าว</label>
                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={onNewsImagesChange}
                  />

                  {newsPreviewUrls.length > 0 && (
                    <div
                      className="mt-3"
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {newsPreviewUrls.map((url, idx) => (
                        <div
                          key={idx}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={url}
                            alt={`preview-${idx}`}
                            style={{ width: "150px", borderRadius: "8px" }}
                          />
                          {/* ปุ่มลบ */}
                          <button
                            type="button"
                            onClick={() => {
                              // ลบ preview และไฟล์จริงออก
                              setNewsPreviewUrls((prev) =>
                                prev.filter((_, i) => i !== idx)
                              );
                              setNewsImages((prev) =>
                                prev.filter((_, i) => i !== idx)
                              );
                            }}
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "rgba(0,0,0,0.4)",
                              color: "white",
                              border: "none",
                              borderRadius: "20%",
                              width: "24px",
                              height: "24px",
                              cursor: "pointer",
                            }}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  id="btn-submit"
                >
                  อัปเดตข่าวสาร
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// utils
function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

async function getCroppedImg(imageSrc, crop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg");
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

export default Edit_News;
