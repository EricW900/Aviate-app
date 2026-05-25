export interface LoginPayload {
    email: string;
    password: string;
}

export interface User {
    userId: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}