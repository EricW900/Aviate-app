import api from "../api/axios";
import type { ApiResponse } from "../types/api";
import type { AuthResponse, LoginPayload, User } from "../types/auth";

export const loginRequest = async (data: LoginPayload) => {
  const response = await api.post<ApiResponse<AuthResponse>>("/auth/login", data);
  return response.data;
};

export const getProfile = async () => {
    const response = await api.get<ApiResponse<User>>("/auth/profile");

    return response.data;
}
