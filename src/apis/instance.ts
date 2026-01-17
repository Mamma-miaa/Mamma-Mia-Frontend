import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
})

api.interceptors.request.use((config) => {
  const accessToken = sessionStorage.getItem("accessToken")
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  ({ data }) => {
    return data
  },
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("accessToken")
      sessionStorage.removeItem("refreshToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)
