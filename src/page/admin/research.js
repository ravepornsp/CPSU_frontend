import React, { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import AdminLayout from "../../layout/AdminLayout";

const Research = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSync, setLoadingSync] = useState(false);
  const [search, setSearch] = useState("");
  const [lastSync, setLastSync] = useState(null);
  const hasShownError = useRef(false);

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

  const filteredResearch = research.filter((r) =>
    `${r.thai_name} ${r.title} ${r.author} ${r.year}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3>ผลงานวิจัย</h3>
          </div>

          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="ค้นหางานวิจัย..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <p className="text-muted small mb-0">
              อัปเดต Scopus ล่าสุด:{" "}
              {lastSync
                ? new Date(lastSync).toLocaleDateString("th-TH")
                : "ยังไม่มีข้อมูล"}
            </p>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={fetchScopus}
                disabled={loadingSync}
              >
                {loadingSync ? "กำลัง Sync..." : "Sync Scopus"}
              </button>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th width="200">ชื่ออาจารย์</th>
                    <th>ชื่องานวิจัย</th>
                    <th width="300">ผู้วิจัย</th>
                    <th width="100">ปี</th>
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
                    filteredResearch.map((r) => (
                      <tr key={r.id}>
                        <td>{r.thai_name}</td>
                        <td className="text-start">{r.title}</td>
                        <td>{r.author}</td>
                        <td className="text-center">{r.year}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Research;
