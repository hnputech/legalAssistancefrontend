import axios from "axios";

export const axioxInstance = axios.create({
  // baseURL: "https://legalbackedn-aondtyyl6a-uc.a.run.app",
  // baseURL: "http://localhost:3001/",
  // baseURL: "https://legalbackedn2-aondtyyl6a-uc.a.run.app/",
  baseURL: "https://legalbackedn2-aondtyyl6a-uc.a.run.app",
  headers: {
    "Content-Type": "application/json",
  },
});
