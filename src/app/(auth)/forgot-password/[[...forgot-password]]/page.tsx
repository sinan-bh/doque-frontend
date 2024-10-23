'use client';

import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLogIn } from "react-icons/bi";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/lib/store/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';

export default function ForgotPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, forgetEmail } = useSelector((state: RootState) => state.user);
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');

        const resultAction = await dispatch(forgotPassword(email));

        if (forgotPassword.fulfilled.match(resultAction)) {
            setMessage(resultAction.payload.message);
        } else {
            setMessage(resultAction.payload as string);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (message || error) {
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#E0F7FF] to-white flex justify-center items-center">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-500 rounded-full p-4 flex justify-center items-center shadow-md">
                        <BiLogIn className="text-4xl text-white" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-4 text-green-500">
                    Forgot Password?
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    Enter your email to receive a link to reset your password.
                </p>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleForgotPassword} className="space-y-8">
                    <div className="relative">
                        <AiOutlineMail className="absolute left-3 top-4 text-[#5E6061]" />
                        <input
                            type="email"
                            value={forgetEmail || email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                            required
                            aria-label="Email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-green-500 text-green-500 text-xl font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        disabled={loading}
                        aria-label="Send reset link"
                    >
                        {loading ? "Sending..." : "Send Link"}
                    </button>
                </form>
                <div className="flex justify-center items-center mt-8 text-sm text-gray-700">
                    <Link href="/signup" className="text-[#242425] hover:underline">
                        Create New Account
                    </Link>
                    <span className="mx-4 text-gray-600">|</span>
                    <Link href="/signin" className="text-[#242425] hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
