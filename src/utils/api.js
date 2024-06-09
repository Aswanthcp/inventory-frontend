// api.js
import axios from "axios";
import { baseUrl } from "./constants";

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
