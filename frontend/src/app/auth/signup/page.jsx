"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import useAuthStore from "@/useAuth";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    pincode: "",
    location: "",
  });

  const [otp, setOtp] = useState('');

  // --- Fetch States ---
  const { data: states = [], isLoading: stateLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/api/state", {
        headers: { Country: "India" },
      });
      return res.data.data.states;
    },
  });

  // --- Fetch Localities ---
  const { data: localities = [], isLoading: localityLoading } = useQuery({
    queryKey: ["localities", formData.pincode],
    queryFn: async () => {
      if (!formData.pincode) return [];
      const res = await axios.get(
        `http://localhost:3000/api/pincode/${formData.pincode}`
      );
      const postOffices = res.data?.[0]?.PostOffice || [];
      return postOffices.map((po) => po.Name);
    },
    enabled: !!formData.pincode,
  });

  // --- Handle OTP Change ---
 const handleOtpChange = (e) => {
  const value = e.target.value;

  if (/^\d{0,6}$/.test(value)) {
    setOtp(value);
  }
};

  const submitDetailsMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "http://localhost:5000/api/signup",
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("OTP sent successfully:", data);
      console.log(formData)
      setSuccessMsg("OTP sent to your email. Check your inbox.");
      setErrorMsg("");
      setTimeout(() => setSuccessMsg(""), 3000);
      setStep(2);
    },
    onError: (error) => {
      console.error("Error sending OTP:", error);
      setErrorMsg(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    },
  });

  // --- OTP Verification Mutation ---
  const otpMutation = useMutation({
    mutationFn: async () => {
      if(otp.length!==6){
        console.log('OTP must be of 6 digit')
        return
      }

      const res = await axios.post(
        "http://localhost:5000/api/verify-signup",
        {
          email: formData.email,
          userName:formData.userName,
          address:formData.address,
          state:formData.state,
          pincode:formData.pincode,
          location:formData.location,
          phone:formData.phone,
          otp: otp,
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("OTP verification successful:", data);
      setErrorMsg("");

      if (data.token && data.user) {
        setAuth({
          userName: data.user.userName,
          token: data.token,
        });
      }

      setSuccessMsg("Account created successfully!");
      setTimeout(() => {
        setStep(1);
        setFormData({
          userName: "",
          email: "",
          phone: "",
          address: "",
          state: "",
          pincode: "",
          location: "",
        });
        setOtp();
      }, 2000);
    },
    onError: (error) => {
      console.error("OTP verification error:", error);
      console.log(otp)
      setErrorMsg(
        error.response?.data?.message || "OTP verification failed. Please try again."
      );
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  // --- Handle Step 1 Submission ---
  const handleStep1Submit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !formData.userName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.state ||
      !formData.pincode ||
      !formData.location
    ) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    submitDetailsMutation.mutate(formData);
  };

  // --- Handle OTP Submission ---
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    otpMutation.mutate();
  };

  return (
    <div className="flex justify-center mt-5 bg-gray-100 px-4">
      <div className="bg-white w-full md:w-1/2 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          {step === 1 ? "Create an Account" : "Verify Your Account"}
        </h2>

        {/* Step Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2].map((num) => (
            <div
              key={num}
              className={`h-3 w-3 rounded-full transition-colors ${
                step >= num ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {errorMsg}
          </div>
        )}

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
            {successMsg}
          </div>
        )}

        <form className="space-y-6">
          {/* STEP 1 - ALL DETAILS */}
          {step === 1 && (
            <>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium ">Full Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium ">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>
              </div>


             <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>
              </div>
 
             
              <div>
                <label className="block text-sm font-medium">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                >
                  <option value="">Select a state</option>
                  {stateLoading ? (
                    <option disabled>Loading states...</option>
                  ) : (
                    states.map((s, idx) => (
                      <option key={idx} value={s.name}>
                        {s.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter Pincode"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                >
                  <option value="">Select Locality</option>
                  {localityLoading ? (
                    <option disabled>Loading localities...</option>
                  ) : (
                    localities.map((name, idx) => (
                      <option key={idx} value={name}>
                        {name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  onClick={handleStep1Submit}
                  disabled={submitDetailsMutation.isPending}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {submitDetailsMutation.isPending ? "Sending OTP..." : "Continue →"}
                </button>
              </div>
            </>
          )}

          {/* STEP 2 - OTP VERIFICATION */}
          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Enter the 6-digit OTP sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="flex justify-center py-8">
               <input type='text' name="otp"  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none" value={otp} onChange={handleOtpChange}/>
              </div>

              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setErrorMsg("");
                    
                  }}
                  disabled={otpMutation.isPending}
                  className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800  transition"
                >
                  {otpMutation.isPending ? "Verifying..." : "Verify & Create"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;