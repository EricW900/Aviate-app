import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import AircraftPage from "../pages/Aircraft/AircraftPage";
import UserPage from "../pages/Users/UserPage";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layout/DashboardLayout";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/dashboard/aircrafts" element={<AircraftPage />} />
                        <Route path="/dashboard/user" element={<UserPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

