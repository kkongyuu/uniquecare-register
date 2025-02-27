import axios from "axios";

// Create an axios instance with a pre-configured base URL
const api = axios.create({
  // baseURL: 'https://api.uniquecarestationthailand.com/api',  // Base URL for your API
  baseURL: "https://dev-api.uniquecarestationthailand.com/api",
  // baseURL: "http://192.168.1.50:9000/api",
});
export default api;
