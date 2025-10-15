require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app password
  },
});

const sendOtpEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Sports-Cart" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    });
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
};

module.exports = sendOtpEmail;
