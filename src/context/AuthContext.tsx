import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { loginRequest, getProfile } from "../services/authService";
import type { User } from "../types/auth";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext({} as AuthContextType);

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token;

    const login = async (email: string, password: string) => {
        const response = await loginRequest({ email, password });

        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);

        setToken(token);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!token) return;

                const response = await getProfile();

                setUser(response.data.data ?? response.data);
            } catch (error) {
                logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);