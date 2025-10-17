'use client'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import useAuthStore from '@/useAuth'

const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const{token,userName}=useAuthStore()

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ email: '' });
  const [otp, setOtp] = useState('');

  const submitEmail = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post('http://localhost:5000/api/login', data);
      return res.data;
    },
    onSuccess: () => {
      console.log("OTP sent successfully");
      setStep(2);
    },
    onError: (error) => {
      console.error("Error in sending OTP", error);
    },
  });

  const otpMutation = useMutation({
    mutationFn: async (otpValue) => {
      const res = await axios.post('http://localhost:5000/api/verify-login', {
        email: formData.email,
        otp: otpValue,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      

      setAuth({
        token: data.token,
        userName:data.userName
      });

      console.log('Login Successful', data,token,userName);
      
    },
    onError: (error) => {
      console.error('OTP verification error:', error);
    },
  });

  const handleMail = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOtp = (e) => setOtp(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitEmail.mutate(formData);
  };

  const submitOtp = (e) => {
    e.preventDefault();
    otpMutation.mutate(otp);
  };

  return (
    <div className='flex items-center justify-center p-10'>
      <div className='bg-white w-full md:w-[600px] rounded-2xl shadow-lg p-4'>
        <h2 className="text-3xl font-bold text-center mb-6">
          {step === 1 ? "Login Account" : "Verify OTP"}
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2].map((num) => (
            <div
              key={num}
              className={`h-3 w-3 rounded-full transition-colors ${step >= num ? "bg-black" : "bg-gray-300"}`}
            />
          ))}
        </div>

        <form className='space-y-6'>
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium">Enter the email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleMail}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Enter the 6-digit OTP sent to <strong>{formData.email}</strong>
                </p>
              </div>

              <div className="flex justify-center py-8">
                <input
                  type='text'
                  name="otp"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black outline-none"
                  value={otp}
                  onChange={handleOtp}
                />
              </div>

              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 transition"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={submitOtp}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  {otpMutation.isPending ? "Verifying..." : "Verify & Login"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
