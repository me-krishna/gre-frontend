import axios from "axios";
import { error } from "./notify";

const pathName = window.location.pathname;
const useApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

useApi.interceptors.response.use((response) => {
  
  if (response.status === 401) {
    alert("You are not authorized");
  }
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    if (error.response.status === 401) {
      localStorage.clear();
      error("Session expired. Please login again.");
      window.location.href = "/login";
    } else {
      return Promise.reject(error.response.data);
    }
  }
  return Promise.reject(error.message);
});

export default useApi;
