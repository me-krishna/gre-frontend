import axios from "axios";
import { error } from "./notify";

const pathName = window.location.pathname;
const useApi = axios.create({
  baseURL: "http://localhost:3040/api/v1",
  headers: {
    'Content-Type': 'application/json',
  },
});

useApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    pathName !== "/login" && error("Token expired, please login again.");
    delete config.headers.Authorization;
  }
  return config;
});

export default useApi;
