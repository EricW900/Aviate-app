import { FormEvent, useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import {
    createAircraftModel,
    editAircraftModel,
    listAircraftModels,
    listManufacturers,
} from "../services/aircraftModelService";

import type {
    AircraftModel,
    Manufacturer,
} from "../services/aircraftModelService";

const ModelSection = () => {
    const { showAlert } = useAlert();

    const [models, setModels] = useState<AircraftModel[]>([]);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");
    const [manufacturerId, setManufacturerId] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");
    const [editingManufacturerId, setEditingManufacturerId] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);

            const [modelsResult, manufacturersResult] = await Promise.allSettled([
                listAircraftModels(),
                listManufacturers(),
            ]);

            if (manufacturersResult.status === "fulfilled") {
                const manufacturersData =
                    manufacturersResult.value.data?.data ??
                    manufacturersResult.value.data?.manufacturers ??
                    manufacturersResult.value.data ??
                    [];

                setManufacturers(
                    Array.isArray(manufacturersData) ? manufacturersData : []
                );
            } else {
                console.error("Failed to load manufacturers:", manufacturersResult.reason);
                showAlert("Failed to load manufacturers", "error");
            }

            if (modelsResult.status === "fulfilled") {
                const modelsData =
                    modelsResult.value.data?.data ??
                    modelsResult.value.data?.models ??
                    modelsResult.value.data ??
                    [];

                setModels(Array.isArray(modelsData) ? modelsData : []);
            } else {
                console.error("Failed to load aircraft models:", modelsResult.reason);
                showAlert("Failed to load aircraft models", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (model: AircraftModel) => {
        setEditingId(model.id);
        setEditingName(model.name);
        setEditingManufacturerId(model.manufacturerId);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingName("");
        setEditingManufacturerId("");
    };

    const saveEdit = async () => {
        // if (!editingId) return;

        if (!editingId) {
            showAlert("Aircraft Model id is required", "error");
            return;
        }

        if (!editingName.trim()) {
            showAlert("Aircraft Model name is required", "error");
            return;
        }

        if (!editingManufacturerId) {
            showAlert("Manufacturer is required", "error");
            return;
        }

        try {
            setSaving(true);

            await editAircraftModel({
                aircraftModelId: editingId,
                aircraftModelName: editingName.trim().toUpperCase(),
                manufacturerId: editingManufacturerId,
            });

            showAlert("Aircraft Model updated successfully", "success");

            cancelEdit();

            await loadData();
        } catch (error: any) {
            showAlert(
                error?.response?.data?.message ||
                "Could not update aircraft model",
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            showAlert("Model name is required", "error");
            return;
        }

        if (!manufacturerId) {
            showAlert("Manufacturer is required", "error");
            return;
        }

        try {
            setSaving(true);

            await createAircraftModel({
                name: name.trim().toUpperCase(),
                manufacturerId,
            });

            showAlert("Model created successfully", "success");
            setName("");
            setManufacturerId("");
            await loadData();
        } catch (error: any) {
            showAlert(
                error?.response?.data?.message || "Could not create model",
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-aviation-navy">
                    Create Aircraft Model
                </h2>

                <form onSubmit={handleCreate} className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Model name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Example: A320"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Manufacturer
                        </label>

                        <select
                            value={manufacturerId}
                            onChange={(e) => setManufacturerId(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        >
                            <option value="">Select a manufacturer</option>
                            {manufacturers.map((manufacturer) => (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-aviation-muted disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {saving ? "Saving..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-aviation-navy">
                    Registered Models
                </h2>

                {loading ? (
                    <p className="mt-4 text-sm text-slate-500">Loading...</p>
                ) : models.length === 0 ? (
                    <p className="mt-4 text-sm text-slate-500">
                        No aircraft models registered yet.
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Manufacturer</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {models.map((model) => {
                                    const isEditing = editingId === model.id;

                                    return (
                                        <tr
                                            key={model.id}
                                            className="border-b border-slate-100"
                                        >
                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editingName}
                                                        onChange={(e) =>
                                                            setEditingName(e.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    <span className="font-medium text-slate-800">
                                                        {model.name}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-4 py-3 text-slate-600">
                                                {isEditing ? (
                                                    <select
                                                        value={editingManufacturerId}
                                                        onChange={(e) =>
                                                            setEditingManufacturerId(e.target.value)
                                                        }
                                                        className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                    >
                                                        <option value="">
                                                            Select manufacturer
                                                        </option>

                                                        {manufacturers.map((manufacturer) => (
                                                            <option
                                                                key={manufacturer.id}
                                                                value={manufacturer.id}
                                                            >
                                                                {manufacturer.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    model.manufacturer?.name ?? "-"
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={saveEdit}
                                                            disabled={saving}
                                                            className="rounded-lg bg-aviation-blue px-4 py-2 text-xs font-medium text-white transition hover:bg-aviation-muted disabled:opacity-70"
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={cancelEdit}
                                                            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => startEdit(model)}
                                                        className="rounded-lg bg-aviation-navy px-4 py-2 text-xs font-medium text-white transition hover:bg-aviation-blue"
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

export default ModelSection;