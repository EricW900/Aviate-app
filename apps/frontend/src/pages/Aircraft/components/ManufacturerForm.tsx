import { FormEvent, useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import {
  createManufacturer,
  editManufacturer,
  listManufacturers,
} from "../services/aircraftService";

import type { Manufacturer } from "../services/aircraftService";

const ManufacturerSection = () => {
  const { showAlert } = useAlert();

  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [newName, setNewName] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingActive, setEditingActive] = useState(true);

  const loadManufacturers = async () => {
    try {
      setLoading(true);

      const response = await listManufacturers();

      const data =
        response.data?.data ??
        response.data?.manufacturers ??
        response.data ??
        [];

      setManufacturers(Array.isArray(data) ? data : []);
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message || "Failed to load manufacturers",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManufacturers();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    if (!newName.trim()) {
      showAlert("Manufacturer name is required", "error");
      return;
    }

    try {
      setSaving(true);

      await createManufacturer({ name: newName.trim() });

      showAlert("Manufacturer created successfully", "success");
      setNewName("");
      await loadManufacturers();
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message || "Could not create manufacturer",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (manufacturer: Manufacturer) => {
    setEditingId(manufacturer.id);
    setEditingName(manufacturer.name);
    setEditingActive(manufacturer.active);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingActive(true);
  };

  const saveEdit = async () => {
    if (!editingId) return;

    if (!editingName.trim()) {
      showAlert("Manufacturer name is required", "error");
      return;
    }

    try {
      setSaving(true);

      await editManufacturer({
        manufacturerId: editingId,
        name: editingName.trim(),
        active: editingActive,
      });

      showAlert("Manufacturer updated successfully", "success");
      cancelEdit();
      await loadManufacturers();
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message || "Could not update manufacturer",
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
          Create Manufacturer
        </h2>

        <form onSubmit={handleCreate} className="mt-4 flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Example: Airbus"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
          />

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-aviation-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-aviation-muted disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Create"}
          </button>
        </form>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-aviation-navy">
          Registered Manufacturers
        </h2>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading...</p>
        ) : manufacturers.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No manufacturers registered yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {manufacturers.map((manufacturer) => {
                  const isEditing = editingId === manufacturer.id;

                  return (
                    <tr key={manufacturer.id} className="border-b border-slate-100">
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                          />
                        ) : (
                          <span className="font-medium text-slate-800">
                            {manufacturer.name}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        {isEditing ? (
                          <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input
                              type="checkbox"
                              checked={editingActive}
                              onChange={(e) => setEditingActive(e.target.checked)}
                              className="h-4 w-4"
                            />
                            Active
                          </label>
                        ) : (
                          <span
                            className={
                              manufacturer.active
                                ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                                : "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                            }
                          >
                            {manufacturer.active ? "Active" : "Inactive"}
                          </span>
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
                            onClick={() => startEdit(manufacturer)}
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

export default ManufacturerSection;