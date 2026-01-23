import React, { useEffect, useState } from "react";
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

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const roleOptions = [
    { value: "admin", label: "แอดมิน" },
    { value: "staff", label: "เจ้าหน้าที่" },
    { value: "teacher", label: "อาจารย์" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
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
    if (!newUser.username || !newUser.email || !newUser.password) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      await api.post("/auth/register", newUser);
      window.location.reload();
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

  const handleAssignRole = async () => {
    if (!selectedRole) {
      alert("กรุณาเลือกสิทธิ์ให้กับผู้ใช้");
      return;
    }

    try {
      // ส่งข้อมูลไปยัง API เพื่ออัปเดต role ของผู้ใช้
      const res = await api.put(`/admin/user/${selectedUserId}/role`, {
        role: selectedRole,
      });

      // ถ้าการมอบหมาย role สำเร็จ
      alert("มอบหมายสิทธิ์ผู้ใช้เรียบร้อย");

      // อัปเดต state หรือ UI ตามความต้องการ
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUserId
            ? { ...user, roles: [selectedRole] }
            : user,
        ),
      );

      // ปิด modal
      const modalEl = document.getElementById("assignRoleModal");
      bootstrap.Modal.getInstance(modalEl).hide();
    } catch (err) {
      console.error(err);
      alert("การกำหนดสิทธิ์ผู้ใช้ล้มเหลว");
    }
  };

  const openAssignRoleModal = (userId, currentRole) => {
    setSelectedUserId(userId);
    setSelectedRole(currentRole || "");
    const modalEl = document.getElementById("assignRoleModal");
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
    console.log(currentRole);
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
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      กำลังโหลด...
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="align-middle">
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>********</td>
                      <td>{u.name || "- ยังไม่กำหนดสิทธิ์ -"}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => openAssignRoleModal(u.id, u.name)}
                        >
                          <i className="fas fa-user-pen"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal สำหรับการกำหนดสิทธิ์ผู้ใช้ */}
      <div
        className="modal fade"
        id="assignRoleModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">แก้ไขสิทธิ์ผู้ใช้</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label>เลือกสิทธิ์</label>
                <select
                  className="form-select"
                  value={selectedRole || ""} // ใช้ selectedRole, ถ้าเป็น null หรือ undefined จะใช้ค่าว่าง
                  onChange={(e) => setSelectedRole(e.target.value)} // เมื่อเลือกใหม่ จะอัปเดต selectedRole
                >
                  {/* หาก selectedRole ไม่มีค่า (ยังไม่ได้กำหนดสิทธิ์) จะเป็นตัวเลือกที่ไม่ได้กำหนด */}
                  {selectedRole === "" && (
                    <option value="" disabled>
                      - ยังไม่ได้กำหนดสิทธิ์ -
                    </option>
                  )}

                  {/* แสดงตัวเลือก role ต่างๆ */}
                  {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                ยกเลิก
              </button>
              <button className="btn btn-primary" onClick={handleAssignRole}>
                บันทึก
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal สำหรับเพิ่มผู้ใช้ใหม่ */}
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
