import axios from "axios";

export const axioxInstance = axios.create({
  baseURL: "https://legalbackedn-login-585300090217.us-central1.run.app",
  headers: {
    "Content-Type": "application/json",
    // "x-auth-token": localStorage.getItem("token"),
  },
});

// Add a request interceptor
axioxInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Set the token in the headers
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
