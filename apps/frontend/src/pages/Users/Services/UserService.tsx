import api from "../../../api/axios";
import type { ApiResponse } from "../../../types/api";

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    employee_code: string;
}

export interface editUserRequest {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface CreateUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export const createUser = async (payload: CreateUserRequest) => {
    return api.post<ApiResponse<User>>("/auth/create-user", payload);
};

export const listUsers = async() => {
    return api.get<ApiResponse<User[]>>("/auth/list-users");
}

export const editUser = async (payload: editUserRequest) => {
    const { userId, ...data } = payload;
    return api.patch<ApiResponse<User>>(`/auth/edit/${userId}`, data);
}
