import api from "../api/axios";
// import type { LoginPayload, AuthResponse } from "../types/auth";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getProfile = async () => {
    const response = await api.get("auth/profile");

    return response.data;
}