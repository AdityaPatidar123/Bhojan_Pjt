import express from "express";
import { signup, login ,logOut,ResetPassword,SendOTP} from "../controllers/authController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

router.get("/logOut", logOut);

router.patch("/resetpassword", Protect, ResetPassword);

router.post("/sendOtp",SendOTP);

export default router;
