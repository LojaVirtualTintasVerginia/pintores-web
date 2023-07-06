import axios from 'axios';

const api = axios.create({
  baseURL: 'https://encontre-pintores.onrender.com/'
});

export default api;