import { useState } from "react";

import AirportsSection from "../Airports/components/AirportsForm"
import AirportsTable from "../Airports/components/AirportsTable";

const AirportsPage = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshAirports = () => {
        setRefreshKey((current) => current + 1);
    }

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-aviation-navy">Airports</h1>
                <p className="mt-2 text-sm text-slate-500">View and manage airport information.</p>
            </div>
            <AirportsSection onAirportCreated={refreshAirports} />
            <AirportsTable key={refreshKey} />
        </div>
    )
}

export default AirportsPage;