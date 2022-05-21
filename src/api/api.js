import axios from "axios";

const api = axios.create({
  // baseURL: "https://13.209.21.57:8090",
  baseURL: "https://a-chool.com:443",
  // baseURL: "http://a-chool.com:8080",
});

export default api;

// export const baseUrl = "https://13.209.21.57:8090";
export const baseUrl = "https://a-chool.com:443";
// export const baseUrl = "http://a-chool.com:8080";
