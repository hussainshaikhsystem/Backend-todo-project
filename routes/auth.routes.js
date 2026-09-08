import express from "express";
import { loginuser, signupuser } from "../controllers/auth.controller.js";

const router = express.Router();
router.post('/signup', signupuser)
router.post('/login', loginuser)
export default router;