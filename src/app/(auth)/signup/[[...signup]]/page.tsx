"use client";

import React, { useEffect, useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { signup, clearMessages } from "@/lib/store/features/userSlice";
import { FormikHelpers } from "formik";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import Link from "next/link";

interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { error, successMessage } = useAppSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please re-enter your password"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    dispatch(clearMessages());
    const resultAction = await dispatch(
      signup({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
    );

    if (signup.fulfilled.match(resultAction)) {
      router.push("/verify-otp?email=" + values.email);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl">
          <div className="w-1/2 p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-green-500 mb-2">
                Create Account
              </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <p className="mb-6 text-gray-500">
                Please fill in the details below to create your account.
              </p>
            </div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="flex flex-col space-y-4">
                  <div className="relative">
                    <AiOutlineUser className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineUser className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    <div
                      className="absolute right-3 top-3 cursor-pointer text-gray-400"
                      onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  <div className="relative">
                    <AiOutlineLock className="absolute left-3 top-3 text-gray-400" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-green-500 focus:ring-green-500"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                  {(successMessage || error) && (
                    <div
                      className={`text-center mb-4 ${
                        successMessage ? "text-green-600" : "text-red-600"
                      }`}>
                      {successMessage || error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className={`w-full border-2 border-green-500 text-green-500 rounded-md px-12 py-3 font-semibold hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className="w-1/2 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl flex flex-col justify-center items-center p-10 relative">
            <div className="absolute top-4 right-4 text-left font-bold">
              <span className="text-white text-2xl">Do</span>
              <span className="text-black text-2xl">que</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Welcome to Doque!
            </h2>
            <Image
              width={1024}
              height={768}
              src="/images/onboarding1.jpg"
              alt="Onboarding Illustration"
              className="rounded-full shadow-lg w-72 h-72 object-cover"
            />
            <p className="mb-2 text-center mt-4">
              Already have an account? Sign in to continue.
            </p>
            <Link
              href="/signin"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
