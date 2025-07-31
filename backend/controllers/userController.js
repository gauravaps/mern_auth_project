import User from '../models/User.js';
import bcrypt from 'bcryptjs';


// Admin → Get all normal users
export const getNormalUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'normal' }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};



// Admin → Delete a normal user
export const deleteNormalUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.role !== 'normal') {
      return res.status(404).json({ message: 'Normal user not found' });
    }

    await user.deleteOne();
    res.status(200).json({ message: 'Normal user deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};



// SuperAdmin → Delete any user (admin or normal)
export const deleteAnyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.status(200).json({ message: 'User deleted by SuperAdmin' });

  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};





// SuperAdmin → Update any user role

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    console.log("BODY:", req.body);


    const user = await User.findById(req.params.id);
    console.log('user id:' , user);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated', user });

  } catch (err) {
    res.status(500).json({ message: 'Error updating user role' });
  }
};



// SuperAdmin → Get normal + admin users 
export const getAllNonSuperAdmins = async (req, res) => {
  try {
    const users = await User.find({
      role: { $in: ['normal', 'admin'] }
    }).select('-password');

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};



export const getSelf = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load user" });
  }
};


// ✅ UPDATE Self
export const updateSelf = async (req, res) => {
  try {
    const { name, email, password, currentPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate current password
    if (password && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      if (password === currentPassword) {
        return res.status(400).json({ message: "New password must be different" });
      }
      user.password = await bcrypt.hash(password, 10);
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update Self Error:", err);
  res.status(500).json({ message: "Update failed", error: err.message });
  }
};







 