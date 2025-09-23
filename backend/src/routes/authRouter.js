import express from "express";
import { signup, login ,logOut} from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

router.get("/logOut", logOut);

export default router;
