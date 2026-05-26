import { useEffect, useState } from 'react';
import { useAlert } from "../../../context/AlertContext";

const AirportsSection = () => {
    const { showAlert } = useAlert();

    // Seting up state for form fields
    const [airportName, setAirportName] = useState("");
    const [iataCode, setIataCode] = useState("");
    const [icaoCode, setIcaoCode] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");


    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        showAlert("Airport created successfully!", "success");
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-aviation-navy">Add New Airport</h2>
                <p className="mt-2 text-sm text-slate-500">Fill in the details to add a new airport or edit airports in table.</p>
                <form
                    onSubmit={handleCreate}
                    className="mt-4 grid gap-x-2 gap-y-3 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-3"
                >
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Airport Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="Enter airport name"
                            value={airportName}
                            onChange={(e) => setAirportName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            IATA Code
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="SDU, GIG, GRU, etc."
                            value={iataCode}
                            onChange={(e) => setIataCode(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            ICAO Code
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="SBSP, KJFK, EGLL, etc."
                            value={icaoCode}
                            onChange={(e) => setIcaoCode(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            City
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="São Paulo, New York, London, etc."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700">
                            Country
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3"
                            placeholder="Brazil, United Kingdom, etc."
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="col-span-full flex pt-2">
                        <button
                            type="submit"
                            className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                            Create Airport
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AirportsSection;
