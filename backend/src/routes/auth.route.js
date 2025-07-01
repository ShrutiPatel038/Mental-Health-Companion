import express from 'express'
import { signup, login, logout , getProfile } from '../controllers/auth.controller.js'; // import auth controller functions

const router = express.Router()

router.post('/signup',signup);  
router.post('/login',login);
router.post('/logout',logout);
router.get("/me", getProfile) // <-- Add this line

export default router;


