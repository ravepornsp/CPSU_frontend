import React, { useState } from "react";

const usersMock = [
  { id: 1, name: "สมชาย ใจดี", permissions: ["read"] },
  { id: 2, name: "สมหญิง แสนสวย", permissions: ["read", "write"] },
  { id: 3, name: "ประยุทธ เทพ", permissions: [] },
];

const allPermissions = [
  { key: "read", label: "อ่านข้อมูล" },
  { key: "write", label: "แก้ไขข้อมูล" },
  { key: "delete", label: "ลบข้อมูล" },
  { key: "admin", label: "ผู้ดูแลระบบ" },
];

function UserPermissions() {
  const [users, setUsers] = useState(usersMock);
  const [newUserName, setNewUserName] = useState("");

  // Toggle permission for a user
  const togglePermission = (userId, permissionKey) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const hasPermission = user.permissions.includes(permissionKey);
          return {
            ...user,
            permissions: hasPermission
              ? user.permissions.filter((p) => p !== permissionKey)
              : [...user.permissions, permissionKey],
          };
        }
        return user;
      })
    );
  };

  // Add new user
  const addUser = () => {
    const trimmedName = newUserName.trim();
    if (!trimmedName) {
      alert("กรุณากรอกชื่อผู้ใช้งานก่อน");
      return;
    }

    // ตรวจสอบซ้ำ
    if (users.some((user) => user.name === trimmedName)) {
      alert("ชื่อผู้ใช้งานนี้มีอยู่แล้ว");
      return;
    }

    const newUser = {
      id: Date.now(), // id ชั่วคราว (จริง ๆ ใช้ backend สร้าง)
      name: trimmedName,
      permissions: [],
    };

    setUsers((prev) => [...prev, newUser]);
    setNewUserName("");
  };

  // Delete user
  const deleteUser = (userId) => {
    if (
      window.confirm(
        "คุณแน่ใจที่จะลบผู้ใช้นี้? การลบจะไม่สามารถกู้คืนได้"
      )
    ) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleSave = () => {
    // TODO: ส่งข้อมูลไป backend
    console.log("บันทึกสิทธิ์ผู้ใช้:", users);
    alert("บันทึกสิทธิ์ผู้ใช้เรียบร้อย!");
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-center">กำหนดสิทธิ์ผู้ใช้งาน</h3>

      {/* ฟอร์มเพิ่มผู้ใช้ */}
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="ชื่อผู้ใช้งานใหม่"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addUser();
          }}
        />
        <button className="btn btn-success" onClick={addUser}>
          เพิ่มผู้ใช้งาน
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light text-center">
          <tr>
            <th>ชื่อผู้ใช้งาน</th>
            {allPermissions.map((perm) => (
              <th key={perm.key}>{perm.label}</th>
            ))}
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              {allPermissions.map((perm) => (
                <td key={perm.key} className="text-center">
                  <input
                    type="checkbox"
                    checked={user.permissions.includes(perm.key)}
                    onChange={() => togglePermission(user.id, perm.key)}
                  />
                </td>
              ))}
              <td className="text-center">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(user.id)}
                  title="ลบผู้ใช้งาน"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={allPermissions.length + 2} className="text-center">
                ยังไม่มีผู้ใช้งาน
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSave}>
          บันทึกสิทธิ์
        </button>
      </div>
    </div>
  );
}

export default UserPermissions;
