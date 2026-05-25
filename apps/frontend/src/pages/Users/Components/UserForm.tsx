import { useEffect, useState } from "react";
import { useAlert } from "../../../context/AlertContext";
import { createUser, editUser, listUsers, type User } from "../Services/UserService";

const UserSection = () => {
    const { showAlert } = useAlert();

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [creating, setCreating] = useState(false);

    const [users, setUsers] = useState<User[]>([]);

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingFirstName, setEditingFirstName] = useState("");
    const [editingLastName, setEditingLastName] = useState("");
    const [editingEmail, setEditingEmail] = useState("");
    const [editingRole, setEditingRole] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);

            const [usersResult] = await Promise.allSettled([
                listUsers(),
            ]);

            if (usersResult.status === "fulfilled") {
                const response = usersResult.value.data;
                const users = response.data;

                setUsers(Array.isArray(users) ? users : []);
            } else {
                console.error("Failed to load users:", usersResult.reason);
                showAlert("Failed to load users", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!firstName.trim()) {
            showAlert("User first name is required", "error");
            return;
        }

        if (!lastName.trim()) {
            showAlert("User last name is required", "error");
            return;
        }

        if (!email.trim()) {
            showAlert("User email is required", "error");
            return;
        }

        if (!password.trim()) {
            showAlert("User password is required", "error");
            return;
        }

        try {
            setCreating(true);

            await createUser({
                email: email.trim(),
                firstName: firstName.trim().toUpperCase(),
                lastName: lastName.trim().toUpperCase(),
                password,
                role: role || "SYSTEM_USER",
            });

            showAlert("User created successfully", "success");

            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setRole("");

            await loadData();
        } catch (error: any) {
            showAlert(
                error?.response?.data?.message || "Failed to create user",
                "error"
            );
        } finally {
            setCreating(false);
        }
    };

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditingFirstName(user.firstName || "");
        setEditingLastName(user.lastName || "");
        setEditingEmail(user.email);
        setEditingRole(user.role || "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingFirstName("");
        setEditingLastName("");
        setEditingEmail("");
        setEditingRole("");
    };

    const saveEdit = async () => {
        if (!editingId) {
            showAlert("No user selected for editing", "error");
            return;
        }

        if (!editingFirstName.trim()) {
            showAlert("User first name is required", "error");
            return;
        }

        if (!editingLastName.trim()) {
            showAlert("User last name is required", "error");
            return;
        }

        if (!editingEmail.trim()) {
            showAlert("User email is required", "error");
            return;
        }

        if (!editingRole.trim()) {
            showAlert("User role is required", "error");
            return;
        }

        try {
            setSaving(true);

            await editUser({
                userId: editingId,
                email: editingEmail.trim(),
                firstName: editingFirstName.trim().toUpperCase(),
                lastName: editingLastName.trim().toUpperCase(),
                role: editingRole,
            });

            showAlert("User updated successfully", "success");
            cancelEdit();
            await loadData();
        } catch (error: any) {
            showAlert(
                error?.response?.data?.message || "Failed to update user",
                "error"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-aviation-navy">
                    Create User
                </h2>

                <form
                    onSubmit={handleCreate}
                    className="mt-4 space-y-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            First Name
                        </label>

                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Last Name
                        </label>

                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-aviation-blue"
                        >
                            <option value="">Select a Role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="PILOT">Pilot</option>
                            <option value="FIRST_OFFICER">First Officer</option>
                            <option value="FLIGHT_ENGINEER">
                                Flight Engineer
                            </option>
                            <option value="CABIN_CREW">Cabin Crew</option>
                            <option value="SYSTEM_USER">System User</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={creating}
                            className="rounded-xl bg-aviation-blue px-4 py-3 text-white hover:bg-aviation-dark-blue focus:outline-none focus:ring-2 focus:ring-aviation-blue disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {creating ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-aviation-navy">
                    Registered User List
                </h2>

                {loading ? (
                    <p className="text-sm text-slate-500">Loading users...</p>
                ) : users.length === 0 ? (
                    <p className="text-sm text-slate-500">
                        No users found or registered yet.
                    </p>
                ) : (
                    <div>
                        <table className="border-b border-slate-200 text-slate-500">
                            <thead>
                                <tr className="border-b border-slate-200 text-slate-500">
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Surname</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => {
                                    const isEditing = editingId === user.id;

                                    return (
                                        <tr
                                            key={user.id}
                                            className="border-b border-slate-200 text-slate-500"
                                        >
                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={editingFirstName}
                                                            onChange={(e) => setEditingFirstName(e.target.value)}
                                                            className="w-32 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                        />
                                                    </div>
                                                ) : (
                                                    `${user.firstName}`
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={editingLastName}
                                                            onChange={(e) => setEditingLastName(e.target.value)}
                                                            className="w-32 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                        />
                                                    </div>
                                                ) : (
                                                    `${user.lastName}`
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        value={editingEmail}
                                                        onChange={(e) => setEditingEmail(e.target.value)}
                                                        className="w-56 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                    />
                                                ) : (
                                                    user.email
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <select
                                                        value={editingRole}
                                                        onChange={(e) => setEditingRole(e.target.value)}
                                                        className="w-44 rounded-lg border border-slate-200 px-3 py-2 outline-none focus:border-aviation-blue"
                                                    >
                                                        <option value="">Select a Role</option>
                                                        <option value="ADMIN">Admin</option>
                                                        <option value="PILOT">Pilot</option>
                                                        <option value="FIRST_OFFICER">First Officer</option>
                                                        <option value="FLIGHT_ENGINEER">Flight Engineer</option>
                                                        <option value="CABIN_CREW">Cabin Crew</option>
                                                        <option value="SYSTEM_USER">System User</option>
                                                    </select>
                                                ) : (
                                                    user.role
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
                                                        onClick={() =>
                                                            startEdit(user)
                                                        }
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

export default UserSection;