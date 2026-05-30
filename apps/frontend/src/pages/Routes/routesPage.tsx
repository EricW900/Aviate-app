import { useState } from "react";
import RouteSection from "./components/routesForm";
import RoutesTable from "./components/routesTable";

const RoutesPage = () => {
    // const [refreshKey, setRefreshKey] = useState(0);

    // const refreshRoutes = () => {
    //     setRefreshKey((current) => current + 1);
    // }

    return (
        <div className="space-y-6">
            <div className="rounded-2x1 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-aviation-navy">Routes</h1>
                <p className="mt-2 text-sm text-slate-500">View and manage routes informations.</p>
            </div>
            <RouteSection />
            <RoutesTable />
        </div>
    )
}

export default RoutesPage;