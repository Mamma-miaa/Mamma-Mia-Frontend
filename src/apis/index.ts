import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

api.interceptors.response.use(({ data }) => data);

export default api;
