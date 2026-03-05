import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/admin/news_edit.css";
import api from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";

// Cropper
import Cropper from "react-easy-crop";
import Button from "@mui/material/Button";
import { getOrientation } from "get-orientation/browser";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // state หลัก
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("1");
  const [urlDetail, setUrlDetail] = useState("");

  // รูปภาพ
  const [fileImage, setFileImage] = useState(null); // cover ใหม่ ถ้ามี
  const [coverUrl, setCoverUrl] = useState(null); // URL cover เดิม หรือ preview ใหม่

  const [newsImages, setNewsImages] = useState([]); // File object ใหม่
  const [newsPreviewUrls, setNewsPreviewUrls] = useState([]); // URL preview (รวมใหม่ + เดิม)
  const [existingNewsUrls, setExistingNewsUrls] = useState([]); // URL ที่มาจาก backend เดิม

  // สำหรับ cropper
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetailNews = async () => {
      try {
        const res = await api.get(`/admin/news/${id}`);
        const data = res.data;

        setTitle(data.title || "");
        setContent(data.content || "");
        setCategory(String(data.type_id || 1));
        setUrlDetail(data.detail_url || "");

        if (data.images && data.images.length > 0) {
          const urls = data.images.map((img) => img.file_image);
          const cover = data.cover_image;
          const others = urls.slice(1);

          setCoverUrl(cover);
          setExistingNewsUrls(others);
          setNewsPreviewUrls(others);
        }
      } catch (err) {
        console.error("Error fetching news details", err);
      }
    };

    fetchDetailNews();
  }, [id]);

  const onNewsImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      // รวมกับไฟล์เดิม
      setNewsImages((prev) => [...prev, ...files]);
      const newPreviews = files.map((f) => URL.createObjectURL(f));
      setNewsPreviewUrls((prev) => [...prev, ...newPreviews]);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([blob], "cover.jpg", { type: blob.type });
      setFileImage(file);
      setCoverUrl(URL.createObjectURL(blob));
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

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

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("type_id", category);
    formData.append("detail_url", urlDetail);

    // cover
    if (fileImage) {
      formData.append("cover_image", fileImage);
    } else if (coverUrl) {
      // ถ้าไม่มี file ใหม่ แต่มี URL เดิม ให้ส่ง URL เดิม
      formData.append("existing_cover", coverUrl);
    }

    // news images
    if (newsImages.length > 0) {
      newsImages.forEach((file) => {
        formData.append("images", file);
      });
    }
    // ส่ง URL รูปข่าวที่ยังอยู่ (เดิม) ถ้าไม่มีไฟล์ใหม่
    if (existingNewsUrls.length > 0) {
      formData.append("existing_images", JSON.stringify(existingNewsUrls));
    }

    try {
      await api.put(`/admin/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("แก้ไขข่าวสารสำเร็จ");
      navigate(`/admin/news/${id}`);
    } catch (err) {
      console.error("Error submitting news", err);
      alert("ไม่สามารถแก้ไขข่าวสารได้");
    }
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="mb-4">
          <h4>แก้ไขข่าวสาร</h4>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
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

                <div className="text-center mt-4">
                  <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    sx={{
                      backgroundColor: "#173390",
                      "&:hover": { backgroundColor: "#0b1a4a" },
                    }}
                  >
                    ตกลง
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleEdit}>
                {/* หัวข้อ */}
                <div className="mb-3">
                  <label className="form-label">หัวข้อข่าวสาร</label>
                  <input
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* เนื้อหา */}
                <div className="mb-3">
                  <label className="form-label">เนื้อหาข่าวสาร</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(e, editor) => setContent(editor.getData())}
                  />
                </div>

                {/* ประเภท */}
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

                {/* URL */}
                <div className="mb-3">
                  <label className="form-label">รายละเอียดข่าวสาร</label>
                  <input
                    className="form-control"
                    value={urlDetail}
                    onChange={(e) => setUrlDetail(e.target.value)}
                  />
                </div>

                {/* Cover */}
                <div className="mb-4">
                  <label className="form-label">รูปภาพหน้าปกข่าว</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />

                  {coverUrl && (
                    <div className="mt-3 position-relative d-inline-block">
                      <img
                        src={coverUrl}
                        alt="cover-preview"
                        className="img-fluid rounded"
                        style={{ maxWidth: "300px" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverUrl(null);
                          setFileImage(null);
                        }}
                        className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                {/* News Images */}
                <div className="mb-4">
                  <label className="form-label">รูปภาพข่าว</label>
                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={onNewsImagesChange}
                  />

                  {newsPreviewUrls.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-3">
                      {newsPreviewUrls.map((url, idx) => (
                        <div key={idx} className="position-relative">
                          <img
                            src={url}
                            alt={`news-preview-${idx}`}
                            className="img-thumbnail"
                            style={{ width: "150px" }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setExistingNewsUrls((prev) =>
                                prev.filter((u) => u !== url),
                              );
                              setNewsPreviewUrls((prev) =>
                                prev.filter((u) => u !== url),
                              );
                              setNewsImages((prevFiles) =>
                                prevFiles.filter(
                                  (f) => URL.createObjectURL(f) !== url,
                                ),
                              );
                            }}
                            className="btn btn-sm btn-danger position-absolute top-0 end-0"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-center d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={() => navigate(`/admin/news/${id}`)}
                  >
                    ยกเลิก
                  </button>

                  <button type="submit" className="btn btn-primary px-4">
                    บันทึกการแก้ไข
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
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
    crop.height,
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

export default EditNews;
