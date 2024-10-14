'use client';

import React, { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BiLogIn } from "react-icons/bi";
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/user-context';

export default function ForgotPassword() {
    // const router = useRouter();
    const { forgotPassword } = useUser();
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const result = await forgotPassword(email);
        if (result.statusCode === 200) {
            setMessage(result.error || "Password reset link has been sent to your email.");
            setTimeout(() => {
            }, 1000);
        } else {
            setError(result.error || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-white to-[#E0F7FF] w-full flex justify-center items-center">
            <div className="bg-gradient-to-br from-[#E0F7FF] to-white p-8 rounded-2xl shadow-gray-300 shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-4 flex justify-center items-center shadow-md">
                        <BiLogIn className="text-4xl text-black" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-6">
                    Forgot Password?
                </h1>
                <p className="text-gray-600 text-center mb-8">
                    Enter your email to receive an link to reset your password.
                </p>
                {message && <p className="text-green-600 text-center mb-4">{message}</p>}
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleForgotPassword} className="space-y-8">
                    <div className="relative">
                        <AiOutlineMail className="absolute left-3 top-4 text-[#5E6061]" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="block w-full px-4 py-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#8BF376] text-xl text-gray-700 font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-[#6BBE4D] focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                    >
                        Send Link
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
