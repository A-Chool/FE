import axios from "axios";

const api = axios.create({
  baseURL: "https://52.79.243.124:8090",
});

export default api;

export const baseUrl = "https://52.79.243.124:8090";
