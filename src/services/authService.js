import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

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