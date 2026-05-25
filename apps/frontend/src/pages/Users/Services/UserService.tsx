import api from "../../../api/axios";

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
    return api.post("/auth/register", payload);
};

export const listUsers = async() => {
    return api.get("/auth/list-users");
}

export const editUser = async (payload: editUserRequest) => {
    return api.post("/auth/edit", payload);
}