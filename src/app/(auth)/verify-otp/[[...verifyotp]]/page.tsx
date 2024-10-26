'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from "@/lib/store/features/userSlice";
import { AppDispatch, RootState } from "@/lib/store";

export default function VerifyEmail() {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);

    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setStatusMessage(null);

            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-${index + 1}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (pastedData.length === 6) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);
            setStatusMessage(null);
            const lastInput = document.getElementById(`otp-${pastedData.length - 1}`);
            if (lastInput) {
                lastInput.focus();
            }
        }
    };

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const handleSubmit = async () => {
        const fullOtp = otp.join('');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setStatusMessage("Invalid email address.");
            return;
        }

        setStatusMessage(null);
        const response = await dispatch(verifyOtp({ email, otp: fullOtp }));

        if (verifyOtp.fulfilled.match(response)) {
            setStatusMessage("OTP verified successfully!");
            router.push('/signin');
        } else {
            setStatusMessage(error || "Failed to verify OTP.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[#353535]">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md dark:bg-[#1F1A30]">
                <div className="flex justify-center mb-6">
                    <div className="text-center font-bold text-3xl">
                        <span className="text-green-500">Do</span>
                        <span className="text-black dark:text-gray-500">que</span>
                    </div>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4 text-green-500 dark:text-white">
                    Verify Your Email
                </h1>
                <p className="text-sm sm:text-base text-gray-600 text-center mb-6 dark:text-gray-400">
                    An OTP has been sent to your email. Please enter the 6-digit OTP to verify your account.
                </p>
                <p className="text-sm font-semibold text-left mb-4 sm:mb-6 text-gray-800 dark:text-white">
                    Enter OTP
                </p>
                {statusMessage && (
                    <div className="text-center mb-4 text-red-500">{statusMessage}</div>
                )}
                <div className="grid grid-cols-6 gap-2 sm:gap-4 mb-6 sm:mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyDown={(e) => handleBackspace(e, index)}
                            onPaste={handlePaste}
                            className="w-full h-12 sm:h-14 text-center text-xl border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-[#383150] dark:text-white"
                            onFocus={() => setStatusMessage(null)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-green-500 text-base sm:text-xl text-white font-semibold px-4 py-2 sm:py-3 rounded-2xl shadow-md hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    {loading ? 'Verifying...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}
