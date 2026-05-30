import { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";

import {
    listRoutes
} from "../services/routesService";

type RoutesTableProps = {
    refreshKey: number;
};

const RoutesTable = ({ refreshKey }: RoutesTableProps) => {
    const { showAlert } = useAlert();

    const [routes, setRoutes] = useState<Route[]>([]);
    const [loading, setLoading] = useState(true);

    const loadRoutes = async () => {
        try {
            setLoading(true);

            const response = await listRoutes();

            setRoutes(response.data.data);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Error loading routes.";

            showAlert(message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRoutes();
    }, [refreshKey]);

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-aviation-navy">
                    Routes List
                </h2>

                {loading ? (
                    <p className="text-sm text-slate-500">
                        Loading routes...
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-b border-slate-200 text-left text-slate-500">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-4 py-2">Origin</th>
                                    <th className="px-4 py-2">IATA</th>
                                    <th className="px-4 py-2">Destination</th>
                                    <th className="px-4 py-2">IATA</th>
                                    <th className="px-4 py-2">Distance</th>
                                    <th className="px-4 py-2">Estimated Time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {routes.map((route) => (
                                    <tr
                                        key={route.id}
                                        className="border-b border-slate-200 text-slate-500"
                                    >
                                        <td className="px-4 py-2">
                                            <div className="flex flex-col">
                                                <span>{route.origin.name}</span>
                                                <span className="text-xs text-slate-400">
                                                    {route.origin.city}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2">
                                            {route.origin.iata}
                                        </td>

                                        <td className="px-4 py-2">
                                            <div className="flex flex-col">
                                                <span>{route.destination.name}</span>
                                                <span className="text-xs text-slate-400">
                                                    {route.destination.city}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-2">
                                            {route.destination.iata}
                                        </td>

                                        <td className="px-4 py-2">
                                            {route.distanceKm} km
                                        </td>

                                        <td className="px-4 py-2">
                                            {route.estimatedTime} min
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoutesTable;