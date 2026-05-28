import { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";

import {
    editAirport,
    listAirports,
    type Airport,
} from "../services/AirportsService";

type AirportsTableProps = {
    refreshKey: number;
}

const AirportsTable = ({ refreshKey }: AirportsTableProps) => {
    const { showAlert } = useAlert();

    const [airports, setAirports] = useState<Airport[]>([]);
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
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (airport: Airport) => {
        setAirportEditing({ ...airport }); // cria uma cópia para evitar mutações diretas no estado original
    };

    const cancelEdit = () => {
        setAirportEditing(null);
    };

    const handleEditChange = (field: keyof Airport, value: string) => {
        if (!airportEditing) return;

        setAirportEditing({ ...airportEditing, [field]: value, });
    };

    const saveEdit = async () => {
        if (!airportEditing) {
            showAlert("No airport selected for editing.", "error");
            return;
        }

        try {
            setSaving(true);

            await editAirport({
                airportId: airportEditing.id,
                name: airportEditing.name,
                iataCode: airportEditing.iataCode,
                icaoCode: airportEditing.icaoCode,
                city: airportEditing.city,
                country: airportEditing.country,
            });

            showAlert("Airport updated successfully!", "success");

            cancelEdit();
            await loadAirports();
        } catch (error: any) {
            showAlert(
                error?.response?.data?.message || "Error updating airport.",
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadAirports();
    }, [refreshKey]);

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-aviation-navy">
                    Airports List
                </h2>

                {loading ? (
                    <p className="text-sm text-slate-500">Loading airports...</p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-b border-slate-200 text-left text-slate-500">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">IATA Code</th>
                                    <th className="px-4 py-2">ICAO Code</th>
                                    <th className="px-4 py-2">City</th>
                                    <th className="px-4 py-2">Country</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {airports.map((airport) => {
                                    const isEditing = airportEditing?.id === airport.id;

                                    return (
                                        <tr
                                            key={airport.id}
                                            className="border-b border-slate-200 text-slate-500"
                                        >
                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={airportEditing.name}
                                                        onChange={(event) =>
                                                            handleEditChange("name", event.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    airport.name
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={airportEditing.iataCode}
                                                        maxLength={3}
                                                        onChange={(event) =>
                                                            handleEditChange(
                                                                "iataCode",
                                                                event.target.value.toUpperCase()
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    airport.iataCode?.toUpperCase()
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={airportEditing.icaoCode}
                                                        maxLength={4}
                                                        onChange={(event) =>
                                                            handleEditChange(
                                                                "icaoCode",
                                                                event.target.value.toUpperCase()
                                                            )
                                                        }
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    airport.icaoCode?.toUpperCase()
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={airportEditing.city}
                                                        onChange={(event) =>
                                                            handleEditChange("city", event.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    airport.city
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={airportEditing.country}
                                                        onChange={(event) =>
                                                            handleEditChange("country", event.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    airport.country
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {isEditing ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
                                                            onClick={saveEdit}
                                                            disabled={saving}
                                                        >
                                                            {saving ? "Saving..." : "Confirm"}
                                                        </button>

                                                        <button
                                                            className="rounded-lg bg-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-300 disabled:opacity-60"
                                                            onClick={cancelEdit}
                                                            disabled={saving}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="rounded-lg bg-aviation-navy px-4 py-2 text-xs font-medium text-white transition hover:bg-aviation-blue"
                                                        onClick={() => startEdit(airport)}
                                                        disabled={saving}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AirportsTable;