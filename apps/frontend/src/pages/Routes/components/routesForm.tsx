import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useAlert } from "../../../context/AlertContext";
import { listAirports, type Airport } from "../../Airports/services/AirportsService";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createRoute } from "../services/routesService";

interface RouteSectionProps {
    onRouteCreated: () => void;
}

const RouteSection = ({ onRouteCreated }: RouteSectionProps) => {
    const { showAlert } = useAlert();
    const [airports, setAirports] = useState<Airport[]>([]);
    const [originId, setOriginId] = useState("");
    const [destinationId, setDestinationId] = useState("");
    const [distanceKm, setDistanceKm] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadAirports = async () => {
            try {
                const response = await listAirports();
                setAirports(response.data.data);
            } catch (error: unknown) {
                showAlert(getErrorMessage(error, "Error loading airports."), "error");
            }
        };

        void loadAirports();
    }, [showAlert]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (originId === destinationId) {
            showAlert("Origin and destination must be different.", "error");
            return;
        }

        try {
            setSaving(true);
            await createRoute({
                originId,
                destinationId,
                distanceKm: Number(distanceKm),
                estimatedTime: Number(estimatedTime),
            });

            setOriginId("");
            setDestinationId("");
            setDistanceKm("");
            setEstimatedTime("");
            showAlert("Route created successfully!", "success");
            onRouteCreated();
        } catch (error: unknown) {
            showAlert(getErrorMessage(error, "Error creating route."), "error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-aviation-navy">Add New Route</h2>
            <p className="mt-2 text-sm text-slate-500">
                Select the airports and provide the route distance and estimated time.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
                <select
                    value={originId}
                    onChange={(event) => setOriginId(event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                    required
                >
                    <option value="">Select origin airport</option>
                    {airports.map((airport) => (
                        <option key={airport.id} value={airport.id}>
                            {airport.iataCode} - {airport.name}
                        </option>
                    ))}
                </select>

                <select
                    value={destinationId}
                    onChange={(event) => setDestinationId(event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3"
                    required
                >
                    <option value="">Select destination airport</option>
                    {airports.map((airport) => (
                        <option key={airport.id} value={airport.id}>
                            {airport.iataCode} - {airport.name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    value={distanceKm}
                    onChange={(event) => setDistanceKm(event.target.value)}
                    placeholder="Distance in kilometers"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                    required
                />

                <input
                    type="number"
                    min="1"
                    value={estimatedTime}
                    onChange={(event) => setEstimatedTime(event.target.value)}
                    placeholder="Estimated time in minutes"
                    className="rounded-xl border border-slate-200 px-4 py-3"
                    required
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white hover:bg-aviation-muted disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? "Creating..." : "Create Route"}
                </button>
            </form>
        </div>
    );
};

export default RouteSection;
