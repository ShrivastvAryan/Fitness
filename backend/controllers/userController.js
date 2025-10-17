require("dotenv").config();
const jwt = require("jsonwebtoken");
const { db } = require("../models/db");
const User = require("../models/userSchema");
const userSchema = require("../validators/userValidator");
const { eq } = require("drizzle-orm");
const sendOtpEmail = require("../utils/sendOtpEmail");
const { randomInt } = require("crypto");

// Temporary OTP store
const otpStore = {};

// Generate JWT
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ---------------- SIGNUP (Send OTP) ----------------
const signup = async (req, res) => {
  try {
    const data = userSchema.parse(req.body);
    const { email } = data;

    const existingUser = await db.select().from(User).where(eq(User.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = randomInt(100000, 999999); // 6-digit OTP
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry

    // Send OTP
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

// ---------------- VERIFY SIGNUP OTP ----------------
const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp, userName, phone, address, state, city, pincode, location } = req.body;

    if (!otpStore[email] || otpStore[email].expires < Date.now()) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (otpStore[email].otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → create user
    const newUser = await db.insert(User).values({
      userName,
      email,
      phone,
      address,
      state,
      location,
      pincode
    }).returning();

    // Generate JWT
    const jwtToken = generateToken({ id: newUser[0].id, email: newUser[0].email });

    delete otpStore[email]; // remove OTP after verification

    return res.status(201).json({
      message: "Signup successful",
      user: newUser[0],
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
};

// ---------------- LOGIN (Send OTP) ----------------
const login = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await db.select().from(User).where(eq(User.email, email));
    if (existingUser.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = randomInt(100000, 999999);
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    // Send OTP
    await sendOtpEmail(email, otp);

    return res.status(200).json({ message: "OTP sent for login" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// ---------------- VERIFY LOGIN OTP ----------------
const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otpStore[email] || otpStore[email].expires < Date.now()) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (otpStore[email].otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP verified → get user
    const user = await db.select().from(User).where(eq(User.email, email));
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const foundUser = user[0];

   const jwtToken = generateToken({
      id: foundUser.id,
      email: foundUser.email,
    });

    delete otpStore[email]; // remove OTP

    return res.status(200).json({
      message: "Login successful",
      mail:foundUser.email,
      userName:foundUser.userName,
      token: jwtToken,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
};

module.exports = {
  signup,
  verifySignupOtp,
  login,
  verifyLoginOtp,
};
