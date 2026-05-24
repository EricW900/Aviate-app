import { useState } from "react";
import ManufacturerSection from "./components/ManufacturerForm";
import ModelSection from "./components/ModelForm";
import AircraftSection from "./components/AircraftForm";

type Tab = "manufacturers" | "models" | "aircraft";

const AircraftPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("manufacturers");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-aviation-navy">
          Aircraft Management
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage manufacturers, models and aircraft.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("manufacturers")}
          className={
            activeTab === "manufacturers"
              ? "rounded-xl bg-aviation-blue px-4 py-2 text-sm font-medium text-white"
              : "rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          }
        >
          Manufacturers
        </button>

        <button
          onClick={() => setActiveTab("models")}
          className={
            activeTab === "models"
              ? "rounded-xl bg-aviation-blue px-4 py-2 text-sm font-medium text-white"
              : "rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          }
        >
          Models
        </button>

        <button
          onClick={() => setActiveTab("aircraft")}
          className={
            activeTab === "aircraft"
              ? "rounded-xl bg-aviation-blue px-4 py-2 text-sm font-medium text-white"
              : "rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          }
        >
          Aircraft
        </button>
      </div>

      {activeTab === "manufacturers" && <ManufacturerSection />}
      {activeTab === "models" && <ModelSection />}
      {activeTab === "aircraft" && <AircraftSection />}

      {/* {activeTab === "aircraft" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          Aircraft coming next.
        </div>
      )} */}
    </div>
  );
};

export default AircraftPage;