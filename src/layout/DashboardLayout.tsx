import { Outlet } from "react-router-dom"
import Sidebar from "../components/dashboard/Sidebar"
import Header from "../components/dashboard/Header"
import Footer from "../components/dashboard/Footer"

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-[#E0E1DD]">
            <div className="flex min-h-screen">
                <Sidebar />

                <div className="flex flex-1 flex-col">
                    <Header />

                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
