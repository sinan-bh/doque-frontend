"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AdminContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<{ statusCode: number; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ statusCode: number; error?: string }> => {
    try {
      const response = await fetch(
        "https://daily-grid-rest-api.onrender.com/api/admin/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("adminToken", data.data);
        setToken(data.data);
        console.log("Admin login successful");
        return { statusCode: 200 };
      } else {
        const errorData = await response.json();
        return {
          statusCode: response.status,
          error: errorData.message || "Invalid email or password",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { statusCode: 500, error: "An error occurred during login." };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("adminToken");
    console.log("Admin logged out");
  };

  const isAuthenticated = !!token;

  return (
    <AdminContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
