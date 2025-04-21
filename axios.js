import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
  withCredentials: true, // If using cookies or sessions
});

export default API;
