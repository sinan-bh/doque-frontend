"use client";

import React, { useState, useEffect } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "@/lib/store/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const error = useSelector((state: RootState) => state.user.error);
  const loading = useSelector((state: RootState) => state.user.loading);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous error messages
    dispatch(clearMessages());
    
    const result = await dispatch(loginUser({ email, password }));

    if (result.payload?.statusCode === 200) {
      router.push("/u/home");
    } 
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch, email, password]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-[#E0F7FF] w-full flex justify-center items-center">
      <div className="bg-gradient-to-br from-[#E0F7FF] to-white p-8 rounded-2xl shadow-gray-300 shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-3 flex justify-center items-center shadow-lg">
            <BiLogIn className="text-3xl text-black" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your credentials to access your account.
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-4 text-[#5E6061]" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
              required
              onFocus={() => dispatch(clearMessages())} 
            />
          </div>
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-4 text-[#5E6061]" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 pl-10 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
              required
              onFocus={() => dispatch(clearMessages())} 
            />
            <div
              className="absolute right-3 top-4 cursor-pointer text-[#5E6061]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>
          <div className="flex justify-end text-sm">
            <Link href="/forgot-password" className="text-[#5E6061] hover:text-[#333]">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8BF376] text-xl text-gray-700 font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-[#6BBE4D] focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="flex items-center justify-between my-4">
          <hr className="w-full border-t border-gray-500" />
          <span className="mx-2 text-gray-800 text-xs whitespace-nowrap">
            <Link href="/signup">
              Don&apos;t have an account?
            </Link>
          </span>
          <hr className="w-full border-t border-gray-500" />
        </div>
      </div>
    </div>
  );
}
