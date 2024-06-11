import axios from "axios";

export const axioxInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
  // baseURL: "https://legalai-aondtyyel6a-uc.a.run.app",
  // baseURL: "https://legalai-aondtyyl6a-uc.a.run.app",
  headers: {
    "Content-Type": "application/json",
  },
});
