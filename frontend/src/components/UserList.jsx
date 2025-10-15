import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);     // state lưu danh sách người dùng
  const [loading, setLoading] = useState(true); // trạng thái loading

  useEffect(() => {
    // Gọi API từ server (đang kết nối MongoDB Atlas)
    axios.get("http://localhost:5000/api/users")
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu người dùng:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <h2>Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p>Chưa có người dùng nào.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tên</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u._id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;