"use client";

import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user-context";
import { FormikHelpers } from "formik";
import { User } from "@/types/user";

interface FormValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
}

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const { signup } = useUser();
    const router = useRouter();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string().required("Please re-enter your password"),
    });

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, setErrors }: FormikHelpers<FormValues>
    ) => {
        setStatusMessage(null);
        if (values.password !== values.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match. Please try again." });
            return;
        }
        const user: User = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            image: 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
            password: values.password,
        };

        const response = await signup(user);

        if (response.error) {
            setStatusMessage(response.error);
        } else if (response.statusCode === 200) {
            setStatusMessage("OTP sent to email. Please verify.");
            router.push("/verify-otp");
        } else {
            setStatusMessage("Something went wrong, please try again later.");
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-white to-[#E0F7FF] w-full flex justify-center items-center">
            <div className="bg-gradient-to-br from-[#E0F7FF] to-white p-8 rounded-2xl shadow-gray-300 shadow-lg w-[550px]">
                <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-lg p-3 flex justify-center items-center shadow-md">
                        <BiLogIn className="text-4xl text-black" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
                <p className="text-gray-600 text-center mb-6">Please fill in the details below to create your account.</p>
                {statusMessage && (
                    <div className={`text-center mb-4 ${statusMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                        {statusMessage}
                    </div>
                )}

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="relative">
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="block w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="relative">
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="block w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="relative">
                                <AiOutlineMail className="absolute left-3 top-4 text-[#5E6061]" />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="block w-full px-4 py-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="relative">
                                <AiOutlineLock className="absolute left-3 top-4 text-[#5E6061]" />
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="block w-full px-4 py-3 pl-10 pr-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                                />
                                <div className="absolute right-3 top-4 cursor-pointer text-[#5E6061]" onClick={togglePasswordVisibility}>
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="block w-full px-4 py-3 pl-10 pr-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#93D8EE]"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button
                                type="submit"
                                className={`w-full bg-[#8BF376] text-xl text-gray-700 font-semibold px-4 py-3 rounded-2xl shadow-md hover:bg-[#6BBE4D] focus:outline-none focus:ring-2 focus:ring-[#93D8EE] ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Registering..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
