'use client'
import { useState } from "react";
import axios from "axios";

const TwoStepLogin = () => {
  const [step, setStep] = useState(1); // current step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/send-otp", { email });
      setStep(2); // go to OTP step
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });

      console.log("Login successful", res.data);
      // store token or redirect user
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Login - Step 1</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Login - Step 2</h2>
          <p className="mb-2 text-gray-700">OTP sent to: {email}</p>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) setOtp(value);
            }}
            className="w-full p-2 mb-4 border rounded text-center"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <p
            className="mt-4 text-sm text-blue-500 cursor-pointer hover:underline"
            onClick={() => setStep(1)}
          >
            Change Email
          </p>
        </div>
      )}
    </div>
  );
};

export default TwoStepLogin;
