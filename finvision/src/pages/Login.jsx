import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    // Later you can connect backend authentication
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">

      <div className="w-[900px] h-[550px] bg-slate-800 rounded-2xl shadow-2xl flex overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 p-10 text-white flex flex-col justify-center items-center">

          <h1 className="text-3xl font-bold mb-4">
            Welcome to FinVision
          </h1>

          <p className="text-center text-sm opacity-90 mb-8">
            FinVision helps you understand how investments grow through
            SIP, compounding, and long-term financial planning.
          </p>

          <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
            Create Account
          </button>

          <img
            src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
            alt="finance"
            className="w-40 mt-10 opacity-90"
          />

        </div>

        {/* RIGHT SIDE LOGIN FORM */}
        <div className="w-1/2 p-12 flex flex-col justify-center text-white">

          <h2 className="text-2xl font-bold mb-6">
            Sign In
          </h2>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="mb-4 p-3 rounded-lg bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-3 rounded-lg bg-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Remember + Forgot */}
          <div className="flex justify-between text-sm mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

          {/* Demo Account Info */}
          <div className="text-xs text-gray-400 mt-6 text-center">
            <p>Demo Account</p>
            <p>Email: 1234 </p>
            <p>Password: 1234 </p>
          </div>

        </div>

      </div>

    </div>
  );
}