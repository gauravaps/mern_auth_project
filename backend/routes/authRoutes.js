import express from 'express';
import { registerUser ,loginUser} from '../controllers/authController.js';

const router = express.Router();

// POST /api/register route
router.post('/register', registerUser);

// POST /api/login  route
router.post('/login', loginUser);
  
export default router;
