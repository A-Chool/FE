import axios from "axios";

const api = axios.create({
  baseURL: "https://www.a-chool.com:443/"
});
export default api;
