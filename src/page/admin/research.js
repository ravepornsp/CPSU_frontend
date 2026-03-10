import React, { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";
import "../../css/admin/research.css";

const Research = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSync, setLoadingSync] = useState(false);
  const [search, setSearch] = useState("");
  const [lastSync, setLastSync] = useState(null);
  const hasShownError = useRef(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await api.get("/admin/personnel/research");
      setResearch(res.data || []);

      if (res.data.length > 0) {
        const latest = [...res.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        )[0];

        setLastSync(latest.created_at);
      }
    } catch (err) {
      console.error(err);

      if (!hasShownError.current) {
        alert("โหลดข้อมูลงานวิจัยไม่สำเร็จ");
        hasShownError.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchScopus = async () => {
    if (!window.confirm("ต้องการอัปเดตข้อมูลจาก Scopus ใช่หรือไม่?")) return;

    setLoadingSync(true);
    try {
      await api.get("/admin/personnel/scopus");
      alert("อัปเดตข้อมูลจาก Scopus สำเร็จ");
      await fetchResearch();
    } catch (err) {
      console.error(err);
      alert("อัปเดต Scopus ไม่สำเร็จ");
    } finally {
      setLoadingSync(false);
    }
  };

  const filteredResearch = research.filter((r) => {
    const authorText = Array.isArray(r.author) ? r.author.join(" ") : r.author;

    return `${r.thai_name} ${r.title} ${authorText} ${r.year}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredResearch.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentData = filteredResearch.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // pagination pages
  const getPages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const formatAuthorsIEEE = (authors) => {
    if (!authors) return "";

    const formatted = authors.map((a) => {
      const parts = a.split(" ");
      if (parts.length < 2) return a;

      const lastName = parts[0];
      const initials = parts[1]
        .replace(/\./g, "") // ลบ . เดิม
        .split("") // แยกตัวอักษร
        .map((i) => `${i}.`) // ใส่ . ใหม่
        .join("");

      return `${initials} ${lastName}`;
    });

    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return formatted.join(" and ");

    return (
      formatted.slice(0, -1).join(", ") +
      ", and " +
      formatted[formatted.length - 1]
    );
  };

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>ผลงานวิจัย</h3>

          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="ค้นหางานวิจัย..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <p className="text-muted small mb-0">
              อัปเดต Scopus ล่าสุด:{" "}
              {lastSync
                ? new Date(lastSync).toLocaleDateString("th-TH")
                : "ยังไม่มีข้อมูล"}
            </p>

            <button
              className="btn btn-outline-primary btn-lg "
              onClick={fetchScopus}
              disabled={loadingSync}
            >
              {loadingSync ? "กำลัง Sync..." : "Sync Scopus"}
            </button>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light text-start">
                  <tr>
                    <th width="200">ชื่ออาจารย์</th>
                    <th>ชื่องานวิจัย</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        กำลังโหลดข้อมูล...
                      </td>
                    </tr>
                  ) : filteredResearch.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        ยังไม่มีข้อมูลงานวิจัย
                      </td>
                    </tr>
                  ) : (
                    currentData.map((r) => (
                      <tr key={r.id}>
                        <td>{r.thai_name}</td>
                        <td className="text-start">
                          {formatAuthorsIEEE(r.authors)}, “{r.title},”{" "}
                          <i>{r.journal}</i>, vol. {r.volume}
                          {r.issue && `, no. ${r.issue}`}, {r.year}.
                          {r.doi && (
                            <>
                              {" "}
                              doi:
                              <a
                                href={`https://doi.org/${r.doi}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {r.doi}
                              </a>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* pagination */}

            <div className="d-flex justify-content-center mt-4">
              <div className="pagination-modern">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ◀
                </button>

                {getPages().map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Research;
