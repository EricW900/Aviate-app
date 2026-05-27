import { useEffect, useState } from 'react';
import { useAlert } from "../../../context/AlertContext";

import { editAirport, listAirports, type Airport } from '../services/AirportsService';

const AirportsTable = () => {
    const { showAlert } = useAlert();

    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [airportEditing, setAirportEditing] = useState<Airport | null>(null);
    const [saving, setSaving] = useState(false);

    const loadAirports = async () => {
        try {
            setLoading(true);

            const response = await listAirports();

            setAirports(response.data.data);
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                "Error loading airports.";

            showAlert(message, "error");
        }
        finally {
            setLoading(false);
        }
    }

    const startEdit = (airport: Airport) => {
        setAirportEditing(airport);
    }

    const cancelEdit = () => {
        setAirportEditing(null);
    }

    const saveEdit = async (airport: Airport) => {
        if (!airportEditing) {
            showAlert("No airport selected for editing.", "error");
            return;
        };

        try {
            setSaving(true);

            await editAirport({
                airportId: airportEditing.id,
                name: airport.name,
                iataCode: airport.iataCode,
                icaoCode: airport.icaoCode,
                city: airport.city,
                country: airport.country
            })

            showAlert("Airport updated successfully!", "success");
            cancelEdit();
            await loadAirports();
        } catch (error: any) {
            showAlert(error?.response?.data?.message || "Error updating airport.", "error");
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        loadAirports();
    }, []);

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-aviation-navy">
                    Airports List
                </h2>

                {loading ? (
                    <p className="text-sm text-slate-500">
                        Loading airports...
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        IATA Code
                                    </th>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        ICAO Code
                                    </th>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        City
                                    </th>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        Country
                                    </th>
                                    <th className="px-4 py-2 font-medium text-aviation-navy">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {airports.map((airport: any) => (
                                    <tr key={airport.id} className="border-b">
                                        <td className="px-4 py-2">
                                            {airport.name}
                                        </td>
                                        <td className="px-4 py-2">
                                            {airport.iataCode.toUpperCase()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {airport.icaoCode.toUpperCase()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {airport.city}
                                        </td>
                                        <td className="px-4 py-2">
                                            {airport.country}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                            className="rounded-lg bg-aviation-navy px-4 py-2 text-xs font-medium text-white transition hover:bg-aviation-blue"
                                            onclick={() => saveEdit(airport)}
                                            disabled={saving}
                                            >
                                                Edit
                                            </button>
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
}

export default AirportsTable;