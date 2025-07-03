import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// ✅ EXPORT all used functions
export const updateStatus = (id, status) =>
  API.patch(`/tasks/${id}/status`, { status });

export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`); // ✅ <-- this was missing!

export default API;
