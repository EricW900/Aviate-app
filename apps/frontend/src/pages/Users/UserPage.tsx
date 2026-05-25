import UserSection from "../Users/Components/UserForm"

const UserPage = () => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-aviation-navy">User Management</h1>
                <p className="mt-2 text-sm text-slate-500">Manage user information and settings.</p>
            </div>
            <UserSection />
        </div>
    )
}

export default UserPage;