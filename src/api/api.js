import axios from "axios";

const api = axios.create({
  // baseURL: "https://achool.shop:8090",
  baseURL: "https://achool.shop",
  // baseURL: "http://a-chool.com:8080",
});

export default api;

// export const baseUrl = "https://achool.shop:8090";
export const baseUrl = "https://a-chool.com:443";
// export const baseUrl = "http://a-chool.com:8080";
