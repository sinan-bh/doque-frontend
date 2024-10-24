'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { RiLockPasswordLine } from "react-icons/ri";
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearMessages } from '@/lib/store/features/userSlice';
import { AppDispatch, RootState } from '@/lib/store';

export default function ResetPassword() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, successMessage } = useSelector((state: RootState) => state.user);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();
    const { token }: { token?: string } = useParams();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearMessages());
        if (newPassword !== confirmPassword) {
            return;
        }
        if (!token) {
            return;
        }
        try {
            await dispatch(resetPassword({ token, newPassword })).unwrap();
            router.push('/signin');
        } catch (error) {
            console.error("Reset password failed:", error);
        }
    };

    useEffect(() => {
        dispatch(clearMessages());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-[#353535]">
            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md dark:bg-[#1F1A30]">
                <div className="flex justify-center mb-6">
                    <div className="top-4 right-4 text-center font-bold">
                        <span className="text-green-500 text-3xl">Do</span>
                        <span className="text-black text-3xl dark:text-gray-500">que</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-4 text-green-500 dark:text-white">Reset Password</h1>

                <p className="text-gray-600 text-center mb-6 dark:text-gray-400">
                    Enter your new password below.
                </p>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
                {newPassword !== confirmPassword && confirmPassword && (
                    <p className="text-red-600 text-center mb-4">Passwords do not match.</p>
                )}

                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div className="relative">
                        <RiLockPasswordLine className="absolute left-3 top-4 text-[#5E6061]" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                dispatch(clearMessages());
                            }}
                            className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 dark:bg-white text-black dark:bg-[#383150] dark:text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-4 text-[#5E6061]"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>

                    <div className="relative">
                        <RiLockPasswordLine className="absolute left-3 top-4 text-[#5E6061]" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                dispatch(clearMessages());
                            }}
                            className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 dark:bg-white text-black dark:bg-[#383150] dark:text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-4 text-[#5E6061]"
                            aria-label="Toggle confirm password visibility"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-xl text-white font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <div className="flex justify-center items-center mt-6 text-sm text-gray-700">
                    <Link href="/signin" className="text-[#242425] hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
