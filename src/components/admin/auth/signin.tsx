"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store/hooks";
import {
  login,
  selectError,
} from "../../../lib/store/features/admin/admin-auth-slice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const error = useAppSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async (values: { email: string; password: string }) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result) && isClient) {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      <Image
        src="/images/signin-admin.png"
        alt="Dashboard Background"
        layout="fill"
        objectFit="cover"
        className="hidden lg:block absolute inset-0 opacity-30"
      />
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Admin Login
        </h2>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full px-10 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 transition duration-200 ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <ErrorMessage name="email">
                  {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`w-full px-10 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 transition duration-200 ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <ErrorMessage name="password">
                  {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
                </ErrorMessage>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors duration-200 hover:opacity-90 flex items-center justify-center"
              >
                <FaLock className="mr-2" />
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
