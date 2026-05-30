import { useState } from 'react';
import { useAlert } from '../../../context/AlertContext';

// type RouteSectionProps = {
//   onRouteCreated: () => void;
// };

const RouteSection = () => {
    const [departureAirportIcao, setDepartureAirportIcao] = useState('');
    const [arrivalAirportIcao, setArrivalAirportIcao] = useState('');

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-aviation-navy">
                    Add New Route
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Fill in the details to add a new route or edit routes in
                    table.
                </p>

                <form
                    onSubmit={() => {}}
                    className="mt-4 grid gap-x-2 gap-y-3 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-3"
                >
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Departure Airport ICAO
                        </label>

                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="Enter departure airport ICAO"
                            value={departureAirportIcao}
                            onChange={(e) =>
                                setDepartureAirportIcao(e.target.value)
                            }
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Arrival Airport ICAO
                        </label>

                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="Enter arrival airport ICAO"
                            value={arrivalAirportIcao}
                            onChange={(e) =>
                                setArrivalAirportIcao(e.target.value)
                            }
                        />
                    </div>
                    <div className="space-y-1">
                        <button type="submit" className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white hover:bg-aviation-muted disabled:cursor-not-allowed disabled:opacity-60 mt-7">
                            Create Route
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RouteSection;