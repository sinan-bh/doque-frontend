'use client';

import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
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

        const resultAction = await dispatch(forgotPassword(email || forgetEmail));

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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gray-100 dark:bg-[#353535] sm:px-6 lg:px-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md dark:bg-[#1F1A30]">
                <div className="flex justify-center mb-6">
                    <div className="text-center font-bold text-3xl">
                        <span className="text-green-500">Do</span>
                        <span className="text-black dark:text-gray-500">que</span>
                    </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-green-500 dark:text-white">
                    Forgot Password?
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-6 dark:text-gray-400">
                    Enter your email to receive a link to reset your password.
                </p>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleForgotPassword} className="space-y-6 sm:space-y-8">
                    <div className="relative">
                        <AiOutlineMail className="absolute left-3 top-4 text-[#5E6061]" />
                        <input
                            type="email"
                            value={forgetEmail || email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            className="block w-full px-4 py-3 sm:py-4 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out dark:bg-[#383150] dark:text-white"
                            required
                            aria-label="Email address"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full border-2 border-green-500 text-green-500 text-base sm:text-xl font-semibold px-4 py-2 sm:py-3 rounded-2xl shadow-md hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        disabled={loading}
                        aria-label="Send reset link"
                    >
                        {loading ? "Sending..." : "Send Link"}
                    </button>
                </form>
                <div className="flex justify-center items-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-700">
                    <Link href="/signup" className="text-[#242425] hover:underline dark:text-gray-300">
                        Create New Account
                    </Link>
                    <span className="mx-2 sm:mx-4 text-gray-600 dark:text-gray-300">|</span>
                    <Link href="/signin" className="text-[#242425] hover:underline dark:text-gray-300">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
