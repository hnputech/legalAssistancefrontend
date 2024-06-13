import axios from "axios";

export const axioxInstance = axios.create({
  baseURL: "http://localhost:3001/",
  // baseURL: "https://legalai-aondtyyel6a-uc.a.run.app",
  // baseURL: "https://legalai-aondtyyl6a-uc.a.run.app",
  headers: {
    "Content-Type": "application/json",
  },
});
