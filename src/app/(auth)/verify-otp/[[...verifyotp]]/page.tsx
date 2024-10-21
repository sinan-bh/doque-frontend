'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BiLogIn } from "react-icons/bi";
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
    console.log(email);

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
        <div className="min-h-screen bg-gradient-to-r from-white to-[#E0F7FF] w-full flex justify-center items-center">
            <div className="bg-gradient-to-br from-[#E0F7FF] to-white p-8 rounded-2xl shadow-gray-300 shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg p-3 flex justify-center items-center shadow-md">
                        <BiLogIn className="text-4xl text-black" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center mb-4">
                    Verify Your Email
                </h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    An OTP has been sent to your email. Please enter the 6-digit OTP to verify your account.
                </p>
                <p className="text-sm font-semibold text-left mb-6 text-[#5E6061]">
                    Enter OTP
                </p>
                {statusMessage && (
                    <div className="text-center mb-4 text-red-500">{statusMessage}</div>
                )}
                <div className="flex justify-between mb-8">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(e, index)}
                            className="w-14 h-14 text-center text-xl border border-gray-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                            onFocus={() => setStatusMessage(null)}
                        />
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#8BF376] text-xl text-gray-700 font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-[#6BBE4D] focus:outline-none focus:ring-2 focus:ring-[#93D8EE] mb-8"
                >
                    {loading ? 'Verifying...' : 'Submit'}
                </button>
            </div>
        </div>
    );
}
