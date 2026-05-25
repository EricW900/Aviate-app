import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Aircrafts", to: "/dashboard/aircrafts" },
  { label: "Routes", to: "/dashboard/routes" },
  { label: "Users", to: "/dashboard/user"},
];

const Sidebar = () => {
  return (
    <aside className="hidden w-64 flex-col border-r border-aviation-blue/15 bg-aviation-sidebar text-aviation-light md:flex">
      <div className="border-b border-white/10 px-6 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          AVIATE
        </h1>

        <p className="mt-1 text-xs text-[#DDF9C1]/80">
          Airline operations
        </p>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              [
                "block rounded-lg px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-aviation-blue text-white"
                  : "text-aviation-light hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;