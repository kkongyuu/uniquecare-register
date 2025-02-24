import axios from "axios";

// Create an axios instance with a pre-configured base URL
const api = axios.create({
  // baseURL: 'https://api.uniquecarestationthailand.com/api',  // Base URL for your API
  // baseURL: "http://192.168.1.74:8080/api",
  baseURL: "http://192.168.1.74:9000/api",
});
export default api;
