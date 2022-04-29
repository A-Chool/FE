import axios from "axios";

const api = axios.create({
  baseURL: "http://34.228.32.139:8080/",
});
export default api;
