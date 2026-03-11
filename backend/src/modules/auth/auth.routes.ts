import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  googleLogin 
} from "./auth.controller";

import { authenticate } from "./auth.middleware";


const router = Router();
router.use("/api/auth", router);


// Public Routes  
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Google Auth 
router.post("/google", googleLogin);

// Protected Routes  
router.patch("/change-password", authenticate, changePassword);

export default router;