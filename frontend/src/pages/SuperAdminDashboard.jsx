import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "./AdminDashboard.css";
import { useState, useEffect } from "react";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [normalUsers, setNormalUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");

  const token = localStorage.getItem("token");

  const fetchNormalUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/non-super-users", {
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
      await axios.delete(`http://localhost:5000/api/normal-users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNormalUsers(); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error.response?.data?.message || error.message);
    }
  };

  const handleUpdate = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/api/usersUpdate/${userId}`, 
        { role: updatedRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingUserId(null);
      setUpdatedRole("");
      fetchNormalUsers(); // Refresh after update
    } catch (error) {
      console.error("Update failed:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchNormalUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Super Admin Dashboard</h2>
      <h3>Normal Users and Admin Users</h3>

      {normalUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-list">
          {normalUsers.map((u) => (
            <li key={u._id} className="user-item">
              <span>{u.name} ({u.email}) - Role: {u.role}</span>
              <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>

              {editingUserId === u._id ? (
                <>
                  <input
                    type="text"
                    className="role-input"
                    placeholder="Enter new role (e.g., admin)"
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                  />
                  <button className="update-btn" onClick={() => handleUpdate(u._id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditingUserId(null)}>Cancel</button>
                </>
              ) : (
                <button className="update-btn" onClick={() => setEditingUserId(u._id)}>Update</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
