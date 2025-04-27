import axios from 'axios';

const API_URL = 'http://localhost:8000/';

export const register = (email, password) => axios.post(`${API_URL}register/`, { email, password });
export const login = (email, password) => axios.post(`${API_URL}login/`, { email, password });
export const getProtectedData = (token) => axios.get(`${API_URL}protected/`, { headers: { Authorization: `Bearer ${token}` } });