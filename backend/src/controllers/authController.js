import User from "../models/user.js";
import bcrypt from "bcrypt";


export const signup = async (req, res,next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    //await user.save();

    console.log("Signup Data:", { fullName, email });
    res.status(201).json({ message: "User registered successfully " });
  } catch (err) {
    next(err)
  }
};

// Login controller
export const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("Login Data:", { email });
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    next(err)
  }
};
