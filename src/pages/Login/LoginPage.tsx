import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import React from "react";

const LoginPage = () => {
    const { login } = useAuth();

    const navigate = useNavigate();

    const { showAlert } = useAlert();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await login(email, password);

            showAlert("Login Feito com Sucesso!", "success");

            navigate("/dashboard");
        } catch (error: any) {
            const message = error?.response?.data?.message || "Credenciais Inválidas";

            showAlert(message, "error");
        }
    };

    return (
        // <div>
        //     <h1>Login</h1>

        //     <form onSubmit={handleSubmit}>
        //         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        //         <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />

        //         <button type="submit">
        //             Login
        //         </button>
        //     </form>
        // </div>
        <div>
            <section className="bg-white min-h-screen">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md"
                    >
                        <div className="flex justify-center mx-auto">
                            <h1 className="text-3xl font-bold">
                                AVIATE
                            </h1>
                        </div>

                        <div className="mt-8">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="
            block w-full px-4 py-3 mt-4
            text-gray-700 bg-white border
            rounded-lg focus:border-blue-400
            focus:outline-none
          "
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="
            block w-full px-4 py-3 mt-4
            text-gray-700 bg-white border
            rounded-lg focus:border-blue-400
            focus:outline-none
          "
                            />

                            <button
                                type="submit"
                                className="
                                    w-full px-6 py-3 mt-6
                                    text-white bg-blue-500
                                    rounded-lg hover:bg-blue-400
                                "
                            >
                                Login
                            </button>

                            <p className="mt-6 text-center">
                                <Link to="/register" className="text-sm text-blue-500 hover:underline">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;