import express from "express";
import { sendOtp, verifyOtp } from "../controllers/auth.controllers.js"
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// user protected route
router.get("/user/profile", verifyToken, (req, res) => {
  res.json({ message: "User profile data", userId: req.userId })
})

// admin protected route
router.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin dashboard data", adminId: req.userId })
})


export default router;