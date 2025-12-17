import express from 'express';
import { registerUser, loginUser, me, logout } from "../controllers/auth.controller.js"; 
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// 1. REMOVED the bad line: router.get('/me', me)

// 2. KEPT the good line with middleware:
router.get('/me', isAuth, me); 

// 3. Logout (GET or POST is fine, usually GET for simple links)
router.get('/logout', logout); 

export default router;