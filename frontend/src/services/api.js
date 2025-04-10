import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/user', // Make sure backend is running on this
});

export default API;
