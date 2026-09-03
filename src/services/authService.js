import axios from "axios";

const API_URL = "https://skillpath-ai-backend-5vgc.onrender.com/api/auth";

export const loginUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    name,
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });

  return response.data;
};