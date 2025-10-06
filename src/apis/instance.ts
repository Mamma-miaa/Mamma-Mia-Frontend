import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

api.interceptors.response.use(({ data }) => data);

export const apiWithAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

apiWithAuth.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    window.location.href = "/login";
  }
  return config;
});

apiWithAuth.interceptors.response.use(({ data }) => {
  return data;
});
