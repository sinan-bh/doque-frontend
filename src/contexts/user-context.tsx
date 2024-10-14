"use client";

import { User, loginUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface UserContextType {
  loggedUser: loginUser | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<{ statusCode: number | null, error: string | null }>;
  logout: () => void;
  signup: (userData: User) => Promise<{ statusCode: number | null, error: string | null }>;
  verifyOtp: (email: string, otp: string) => Promise<{ statusCode: number | null, error: string | null }>;
  forgotPassword: (email: string) => Promise<{ statusCode: number | null, error: string | null }>;
  resetPassword: (token: string, newPassword: string) => Promise<{ statusCode: number | null, error: string | null }>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [loggedUser, setLoggedUser] = useState<loginUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const loginUser = async (email: string, password: string) => {
    const result = {
      statusCode: null,
      error: null,
    } as { statusCode: number | null; error: string | null };

    try {
      const response = await axios.post("https://daily-grid-rest-api.onrender.com/api/login", { email, password });
      const { statusCode, message, data, token } = response.data;
      console.log(data);
      
      if (statusCode === 200) {
        const user: loginUser = {
          email: data.email,
          token: token,
          id: data._id
        };
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedUser(user);
        router.push("/");
      }
      result.statusCode = statusCode;
      result.error = message;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          result.statusCode = error.response.status;
          result.error = error.response.data.message || "An error occurred. Please try again.";
        } else {
          result.error = error.message;
        }
      } else if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Something went wrong.";
      }
    }
    return result;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedUser(null);
    router.push("/signin");
  };

  const signup = async (userData: User) => {
    const result = {
      statusCode: null,
      error: null,
    } as { statusCode: number | null; error: string | null };
    try {
      const response = await axios.post("https://daily-grid-rest-api.onrender.com/api/register", userData);
      const { statusCode } = response.data;
      result.statusCode = statusCode;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          result.statusCode = error.response.status;
          result.error = error.response.data.message;
        } else {
          result.error = error.message;
        }
      } else if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Something went wrong";
      }
    }
    return result;
  };

  const verifyOtp = async (email: string, otp: string) => {
    const result = {
      statusCode: null,
      error: null,
    } as { statusCode: number | null; error: string | null };

    try {
      const response = await axios.post("https://daily-grid-rest-api.onrender.com/api/verifyotp", { email, otp });
      const { statusCode, message } = response.data;
      result.statusCode = statusCode;
      console.log(message);

    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          result.statusCode = error.response.status;
          if (error.response.status === 400) {
            result.error = "Invalid OTP. Please try again.";
          } else if (error.response.status === 500) {
            result.error = "Internal server error. Please try again later.";
          } else {
            result.error = error.response.data.message;
          }
        } else {
          result.error = error.message;
        }
      } else if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Something went wrong.";
      }
    }

    return result;
  };

  const forgotPassword = async (email: string) => {
    const result = { statusCode: null, error: null, } as { statusCode: number | null; error: string | null };

    try {
      const response = await axios.post("https://daily-grid-rest-api.onrender.com/api/forgotpassword", { email });
      const { statusCode, message } = response.data;
      result.statusCode = statusCode;
      result.error = message;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          result.statusCode = error.response.status;
          result.error = error.response.data.message || "An error occurred. Please try again.";
        } else {
          result.error = error.message;
        }
      } else if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Something went wrong";
      }
    }
    return result;
  }

  const resetPassword = async (token: string, newPassword: string) => {
    const result = { statusCode: null, error: null, } as { statusCode: number | null; error: string | null };

    try {
      const response = await axios.patch(`https://daily-grid-rest-api.onrender.com/api/reset-password/${token}`, { newPassword });
      const { statusCode, message } = response.data;
      result.statusCode = statusCode;

      if (statusCode === 200) {
        result.error = message;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          result.statusCode = error.response.status;
          result.error = error.response.data.message || "An error occurred. Please try again.";
        } else {
          result.error = error.message;
        }
      } else if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Something went wrong";
      }
    }
    return result;
  }

  const values = { loggedUser, loading, loginUser, logout, signup, verifyOtp, forgotPassword, resetPassword };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
