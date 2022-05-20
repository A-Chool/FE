import axios from "axios";

const api = axios.create({
  baseURL: "https://a-chool.com:443/"
});
export default api;
