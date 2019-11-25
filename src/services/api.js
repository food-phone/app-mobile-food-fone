import axios from "axios";

const api = axios.create({
  baseURL: "http://130.211.216.31:8080/api"
});

export default api;
