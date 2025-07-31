import express from 'express';
import {
  getNormalUsers,
  deleteNormalUser,
  deleteAnyUser,
  updateUserRole,
  getAllNonSuperAdmins,
  getSelf,
  updateSelf
  
} from '../controllers/userController.js';

import { verifyToken, isAdmin, isSuperAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();



// Admin access
router.get('/normal-users', verifyToken, isAdmin, getNormalUsers);
router.delete('/normal-users/:id', verifyToken, isAdmin, deleteNormalUser);
router.get('/user/me' ,verifyToken , getSelf)
router.put("/update/me", verifyToken, updateSelf); 


// SuperAdmin access
router.delete('/users/:id', verifyToken, isSuperAdmin, deleteAnyUser);
router.put('/usersUpdate/:id', verifyToken, isSuperAdmin, updateUserRole);
router.get('/non-super-users', verifyToken, isSuperAdmin, getAllNonSuperAdmins);


export default router;   