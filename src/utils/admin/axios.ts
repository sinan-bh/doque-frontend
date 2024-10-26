import Cookies from "js-cookie";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://daily-grid-rest-api.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const adminCookie = Cookies.get("adminToken");
    if (adminCookie) {
      const adminToken = JSON.parse(adminCookie);
      const token = adminToken.token;      

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
