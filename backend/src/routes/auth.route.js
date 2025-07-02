import express from 'express'
import { signup, login, logout , getProfile } from '../controllers/auth.controller.js'; // import auth controller functions
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/signup',signup);  
router.post('/login',login);
router.post('/logout',logout);
router.get("/me", authenticateUser,getProfile) // <-- Add this line

export default router;


