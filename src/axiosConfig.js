import axios from "axios";
import { backendURL } from "./constants";

const axiosInstance = axios.create({
  baseURL: `${backendURL}`, // Your backend URL here
});

export default axiosInstance;
