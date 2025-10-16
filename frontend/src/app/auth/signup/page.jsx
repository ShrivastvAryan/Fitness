"use client";
import React, { useState,useEffect } from "react";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const SignupPage = () => {
  // step tracker
  const [step, setStep] = useState(1);

  // form data
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    address:"",
    state:"",
    pincode:"",
    location:""
  });

  // errors
  const [errors, setErrors] = useState({});
  const[state,setState]=useState([]);
  const[locality,setLocality]=useState([])

  const fetchState=async()=>{
    try {
       const res = await axios.get("http://localhost:3000/api/state", {
      headers: {
        Country: "India",
      },
    });
       setState(res.data.data.states);
    } catch (error) {
      console.log(error)
    }
  }

 const fetchLocality = async () => {
  const { pincode } = formData;

  try {
    const res = await axios.get(`http://localhost:3000/api/pincode/${pincode}`);
    // extract PostOffice array
    const postOffices = res.data?.[0]?.PostOffice || [];
    setLocality(postOffices);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(()=>{
    fetchState();
    fetchLocality();
  },[])

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // basic validation per step
//   const validateStep = () => {
//     const newErrors = {};
//     if (step === 1) {
//       if (!formData.name.trim()) newErrors.name = "Name is required";
//       if (!formData.username.trim()) newErrors.username = "Username is required";
//     } else if (step === 2) {
//       if (!formData.email.trim()) newErrors.email = "Email is required";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//         newErrors.email = "Invalid email";
//       if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
//       else if (formData.phone.length < 10)
//         newErrors.phone = "Phone number is too short";
//     } else if (step === 3) {
//       if (!formData.password) newErrors.password = "Password is required";
//       else if (formData.password.length < 6)
//         newErrors.password = "Must be at least 6 characters";
//       if (formData.password !== formData.confirmPassword)
//         newErrors.confirmPassword = "Passwords do not match";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  // next / previous
  const nextStep = () => {
     setStep((prev) => prev + 1);
  };
  const prevStep = () => setStep((prev) => prev - 1);

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Signup Data:", formData);
      alert("Signup Successful ✅");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Create an Account
        </h2>

        {/* Step Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-3 w-3 rounded-full ${
                step >= num ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1 - BASIC INFO */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
                />
                
              </div>

              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91XXXXXXXXXX"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
                />
                
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  Next →
                </button>
              </div>
            </>
          )}

          {/* STEP 2 - CONTACT INFO */}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
  <label className="block text-sm font-medium">State</label>
  <select
    name="state"
    value={formData.state}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
  >
    <option value="">Select a state</option>
    {state?.map((s, index) => (
      <option key={index}>
        {s.name}
      </option>
    ))}
  </select>
</div>

              <div>
                <label className="block text-sm font-medium">pincode</label>
                <input
                 type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="pincode"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"/>
              </div>

              <div>
                <label className="block text-sm font-medium">Location</label>
                <select
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-black"
                >
                   
  <option value="">Select Locality</option>
  {locality.map((s, index) => (
    <option key={index} value={s.Name}>
      {s.Name}
    </option>
  ))}


                </select>
               
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  Create Account
                </button>
              </div>
            </>
          )}

          {/* STEP 3 - PASSWORD SETUP */}
          {step === 2 && (
            <>
            <div className="flex justify-center p-10">
             <InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
</div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800"
                >
                  Next
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
