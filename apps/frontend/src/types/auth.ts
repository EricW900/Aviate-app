export interface LoginPayload {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: "ADMIN" | "PILOT" | "FIRST_OFFICER" | "FLIGHT_ENGINEER" | "CABIN_CREW" | "SYSTEM_USER";
    employee_code: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
