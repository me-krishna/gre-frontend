import axios from "axios";
import { error } from "./notify"; // Re-enable custom notification system

const useApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

useApi.interceptors.request.use((config) => {
  console.log(config);
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.log(config);
    if (config.url !== "/login") {
      error("Token not found or expired, please login again.");
      delete config.headers.Authorization;
    }
  }
  return config;
});

useApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response) {
    if(error.response.status === 401) {
      localStorage.clear();
      window.history.pushState({}, '', process.env.PUBLIC_URL + "/login");
      window.location.reload();
    }
  } else {
    // error("Network error or server is unreachable.");
  }
  return Promise.reject(error);
});

export default useApi;