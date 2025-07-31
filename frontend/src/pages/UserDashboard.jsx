import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./UserDashboard.css";

const UserDashboard = () => {
  const { user } = useAuth();
    const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currentPassword: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: "",
          currentPassword: "",
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (formData.password && formData.password === formData.currentPassword) {
      alert("New password must be different from current password.");
      return;
    }

    try {
      await axios.put(
        "http://localhost:5000/api/update/me",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          currentPassword: formData.currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="user-dashboard">
      <h2>My Account</h2>
      <div className="form-group">
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>New Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button className="update-btn_user" onClick={handleUpdate}>
        Update Self
      </button>
    </div>
  );
};

export default UserDashboard;
