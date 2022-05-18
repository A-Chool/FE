import axios from "axios";

const api = axios.create({
  baseURL: "https://13.209.21.57:8090",
});

export default api;

export const baseUrl = "https://13.209.21.57:8090";
