import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:8000/api", // Substitua pelo endereço do seu servidor IP
});

export default api;