import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-aviation-blue/15 bg-white/70 px-6 py-4 backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold text-aviation-navy">
          Dashboard
        </h2>

        <p className="text-sm text-slate-600">
          Manage airline operations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#DDF9C1] px-3 py-1 text-sm text-aviation-navy">
          {user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-aviation-blue px-4 py-2 text-sm font-medium text-white transition hover:bg-aviation-muted"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;