import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "./AdminDashboard.css"; 

const AdminDashboard = () => {
  const { user } = useAuth();
  const [normalUsers, setNormalUsers] = useState([]);

  const token = localStorage.getItem("token");

  const fetchNormalUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/normal-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNormalUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/api/normal-users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //  Refresh users list
    fetchNormalUsers();
  } catch (error) {
    console.error("Delete failed:", error.response?.data?.message || error.message);
  }
};


  useEffect(() => {
    fetchNormalUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h3>Normal Users</h3>

      {normalUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-list">
          {normalUsers.map((u) => (
            <li key={u._id} className="user-item">
              <span>{u.name} ({u.email})</span>
              <button className="delete-btn" onClick={() => handleDelete(u._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
