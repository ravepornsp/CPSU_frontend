import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Headers from "../../component/header";
import Navbar from "../../component/navbar";
import Menu from "../../component/menu";
import Footer from "../../component/footer";
import api from "../../api/axios";
import * as bootstrap from "bootstrap";
import "../../css/admin/user.css";

function UserPermissions() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/user");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("โหลดรายชื่อผู้ใช้ไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, roles: [newRole] } : u)),
    );
  };

  const handleSave = async () => {
    try {
      await api.put("/admin/users/roles", users);
      alert("บันทึกสิทธิ์ผู้ใช้เรียบร้อย");
    } catch (err) {
      console.error(err);
      alert("บันทึกสิทธิ์ไม่สำเร็จ");
    }
  };

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", newUser);

      alert("เพิ่มผู้ใช้สำเร็จ");

      setNewUser({ username: "", email: "", password: "" });
      await fetchUsers();

      const modalEl = document.getElementById("addUserModal");
      bootstrap.Modal.getInstance(modalEl).hide();
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "เพิ่มผู้ใช้ไม่สำเร็จ");
    }
  };

  return (
    <>
      <Headers />
      <Navbar />

      <div className="container text-center">
        <div className="row">
          <div className="col-sm-3">
            <Menu />
          </div>

          <div className="col-sm-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="user-title">กำหนดสิทธิ์ผู้ใช้</h3>
              <button
                className="btn-user"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
              >
                + เพิ่มผู้ใช้
              </button>
            </div>

            <table className="table table-bordered">
              <thead className="table-light text-center">
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>สิทธิ์การเข้าถึง</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      กำลังโหลด...
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="align-middle">
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>********</td>
                      <td>
                        <select
                          className="form-select"
                          value={u.name}
                          disabled={u.roles?.includes("admin")}
                          onChange={(e) => updateUserRole(u.id, e.target.value)}
                        >
                          <option value="">- ยังไม่กำหนดสิทธิ์ -</option>
                          <option value="admin">แอดมิน</option>
                          <option value="teacher">อาจารย์</option>
                          <option value="staff">เจ้าหน้าที่</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="text-center mt-4">
              <button className="btn btn-primary" onClick={handleSave}>
                บันทึกสิทธิ์
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addUserModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">เพิ่มผู้ใช้ใหม่</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label>Username</label>
                <input
                  className="form-control"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                ยกเลิก
              </button>
              <button className="btn btn-primary" onClick={handleRegister}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserPermissions;
