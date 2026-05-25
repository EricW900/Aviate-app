import { FormEvent, useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";

import {
  createAircraft,
  editAircraft,
  listAircraft,
  listAircraftModels,
} from "../services/aircraftService";

import type { Aircraft } from "../services/aircraftService";
import type { AircraftModel } from "../services/aircraftService";

const AircraftSection = () => {
  const { showAlert } = useAlert();

  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [models, setModels] = useState<AircraftModel[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // create form
  const [prefix, setPrefix] = useState("");
  const [modelId, setModelId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [rangeKm, setRangeKm] = useState("");

  // edit
  const [editingId, setEditingId] = useState<string | null>(null);

  const [editingPrefix, setEditingPrefix] = useState("");
  const [editingModelId, setEditingModelId] = useState("");
  const [editingCapacity, setEditingCapacity] = useState("");
  const [editingRangeKm, setEditingRangeKm] = useState("");
  const [editingStatus, setEditingStatus] = useState<
    "ACTIVE" | "DEACTIVATED"
  >("ACTIVE");

  const loadData = async () => {
    try {
      setLoading(true);

      const [aircraftResponse, modelResponse] =
        await Promise.all([
          listAircraft(),
          listAircraftModels(),
        ]);

      const aircraftData =
        aircraftResponse.data?.data ??
        aircraftResponse.data ??
        [];

      const modelData =
        modelResponse.data?.data ??
        modelResponse.data ??
        [];

      setAircraft(
        Array.isArray(aircraftData)
          ? aircraftData
          : []
      );

      setModels(
        Array.isArray(modelData)
          ? modelData
          : []
      );
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message ||
          "Failed to load aircraft",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await createAircraft({
        prefix: prefix.trim().toUpperCase(),
        modelId,
        capacity: Number(capacity),
        rangeKm: Number(rangeKm),
      });

      showAlert(
        "Aircraft created successfully",
        "success"
      );

      setPrefix("");
      setModelId("");
      setCapacity("");
      setRangeKm("");

      await loadData();
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message ||
          "Could not create aircraft",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (aircraft: Aircraft) => {
    setEditingId(aircraft.id);

    setEditingPrefix(aircraft.prefix);
    setEditingModelId(aircraft.modelId);

    setEditingCapacity(
      aircraft.capacity.toString()
    );

    setEditingRangeKm(
      aircraft.rangeKm.toString()
    );

    setEditingStatus(aircraft.status);
  };

  const cancelEdit = () => {
    setEditingId(null);

    setEditingPrefix("");
    setEditingModelId("");
    setEditingCapacity("");
    setEditingRangeKm("");

    setEditingStatus("ACTIVE");
  };

  const saveEdit = async () => {
    if (!editingId) return;

    try {
      setSaving(true);

      await editAircraft({
        aircraftId: editingId,
        prefix: editingPrefix.trim().toUpperCase(),
        modelId: editingModelId,
        capacity: Number(editingCapacity),
        rangeKm: Number(editingRangeKm),
        status: editingStatus,
      });

      showAlert(
        "Aircraft updated successfully",
        "success"
      );

      cancelEdit();

      await loadData();
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message ||
          "Could not update aircraft",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* CREATE */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-aviation-navy">
          Create Aircraft
        </h2>

        <form
          onSubmit={handleCreate}
          className="mt-4 grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Prefix"
            value={prefix}
            onChange={(e) =>
              setPrefix(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <select
            value={modelId}
            onChange={(e) =>
              setModelId(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          >
            <option value="">
              Select model
            </option>

            {models.map((model) => (
              <option
                key={model.id}
                value={model.id}
              >
                {model.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <input
            type="number"
            placeholder="Range (km)"
            value={rangeKm}
            onChange={(e) =>
              setRangeKm(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4 py-3"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white"
            >
              {saving
                ? "Saving..."
                : "Create Aircraft"}
            </button>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-aviation-navy">
          Aircraft Fleet
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">
            Loading...
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3">
                    Prefix
                  </th>

                  <th className="px-4 py-3">
                    Model
                  </th>

                  <th className="px-4 py-3">
                    Capacity
                  </th>

                  <th className="px-4 py-3">
                    Range
                  </th>

                  <th className="px-4 py-3">
                    Status
                  </th>

                  <th className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {aircraft.map((item) => {
                  const isEditing =
                    editingId === item.id;

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100"
                    >
                      {/* PREFIX */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            value={editingPrefix}
                            onChange={(e) =>
                              setEditingPrefix(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2"
                          />
                        ) : (
                          item.prefix
                        )}
                      </td>

                      {/* MODEL */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={
                              editingModelId
                            }
                            onChange={(e) =>
                              setEditingModelId(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2"
                          >
                            {models.map(
                              (model) => (
                                <option
                                  key={model.id}
                                  value={
                                    model.id
                                  }
                                >
                                  {model.name}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          `${item.model?.manufacturer?.name} ${item.model?.name}`
                        )}
                      </td>

                      {/* CAPACITY */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={
                              editingCapacity
                            }
                            onChange={(e) =>
                              setEditingCapacity(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2"
                          />
                        ) : (
                          item.capacity
                        )}
                      </td>

                      {/* RANGE */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={
                              editingRangeKm
                            }
                            onChange={(e) =>
                              setEditingRangeKm(
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2"
                          />
                        ) : (
                          `${item.rangeKm} km`
                        )}
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <select
                            value={
                              editingStatus
                            }
                            onChange={(e) =>
                              setEditingStatus(
                                e.target
                                  .value as
                                  | "ACTIVE"
                                  | "DEACTIVATED"
                              )
                            }
                            className="rounded-lg border border-slate-200 px-3 py-2"
                          >
                            <option value="ACTIVE">
                              ACTIVE
                            </option>

                            <option value="DEACTIVATED">
                              DEACTIVATED
                            </option>
                          </select>
                        ) : (
                          item.status
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <button
                              onClick={
                                saveEdit
                              }
                              className="rounded-lg bg-aviation-blue px-4 py-2 text-xs font-medium text-white"
                            >
                              Save
                            </button>

                            <button
                              onClick={
                                cancelEdit
                              }
                              className="rounded-lg border border-slate-200 px-4 py-2 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              startEdit(
                                item
                              )
                            }
                            className="rounded-lg bg-aviation-navy px-4 py-2 text-xs font-medium text-white"
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

export default AircraftSection;