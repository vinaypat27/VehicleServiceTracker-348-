import React, { useEffect, useMemo, useState } from "react";
import VehicleForm from "./VehicleForm";
import ServiceForm from "./ServiceForm";
import FilterPanel from "./FilterPanel";
import ServiceReport from "./ServiceReport";
import { api } from "./api";

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [serviceRecords, setServiceRecords] = useState([]);

  const [activeTab, setActiveTab] = useState("vehicles");
  const [currentItem, setCurrentItem] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [error, setError] = useState("");

  const loadAll = async () => {
    const [v, s] = await Promise.all([api.getVehicles(), api.getServices()]);
    setVehicles(v);
    setServiceRecords(s);
  };

  useEffect(() => {
    loadAll().catch((e) => setError(e.message));
  }, []);

  const addVehicle = async (data) => {
    try {
      setError("");
      await api.addVehicle(data);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const updateVehicle = async (id, data) => {
    try {
      setError("");
      await api.updateVehicle(id, data);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteVehicle = async (id) => {
    try {
      setError("");
      await api.deleteVehicle(id);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const addService = async (data) => {
    try {
      setError("");
      await api.addService(data);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const updateService = async (id, data) => {
    try {
      setError("");
      await api.updateService(id, data);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteService = async (id) => {
    try {
      setError("");
      await api.deleteService(id);
      await loadAll();
    } catch (e) {
      setError(e.message);
    }
  };

  const filteredRecords = useMemo(() => {
    let rec = [...serviceRecords];

    if (filters.minCost) rec = rec.filter((r) => r.cost >= Number(filters.minCost));
    if (filters.maxCost) rec = rec.filter((r) => r.cost <= Number(filters.maxCost));
    if (filters.serviceType) rec = rec.filter((r) => r.service_type === filters.serviceType);
    if (filters.vehicleId) rec = rec.filter((r) => r.vehicle_id === Number(filters.vehicleId));

    if (filters.startDate) rec = rec.filter((r) => r.service_date >= filters.startDate);
    if (filters.endDate) rec = rec.filter((r) => r.service_date <= filters.endDate);

    return rec;
  }, [serviceRecords, filters]);

  return (
    <div className="container">
      <h1>Vehicle Service Tracker</h1>

      {error ? <div className="error">{error}</div> : null}

      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "vehicles" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("vehicles");
            setCurrentItem(null);
          }}
        >
          Vehicles
        </button>

        <button
          className={`tab-btn ${activeTab === "services" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("services");
            setCurrentItem(null);
          }}
        >
          Service Records
        </button>

        <button
          className={`tab-btn ${activeTab === "report" ? "active" : ""}`}
          onClick={() => setActiveTab("report")}
        >
          Report
        </button>
      </div>

      {activeTab === "vehicles" && (
        <>
          <div className="toolbar">
            <button
              className="btn btn-primary"
              onClick={() => {
                setFormMode("add");
                setCurrentItem(null);
              }}
            >
              Add Vehicle
            </button>
          </div>

          {formMode === "add" && !currentItem && (
            <VehicleForm vehicle={null} onSave={addVehicle} onCancel={() => setCurrentItem(null)} />
          )}

          {formMode === "edit" && currentItem && (
            <VehicleForm
              vehicle={currentItem}
              onSave={(data) => updateVehicle(currentItem.vehicle_id, data)}
              onCancel={() => setCurrentItem(null)}
            />
          )}

          <div className="card">
            <h2>Vehicles</h2>

            {vehicles.map((v) => (
              <div className="row" key={v.vehicle_id}>
                <div className="row-main">
                  <div className="row-title">
                    {v.year} {v.make} {v.model}
                  </div>
                  <div className="row-sub">Owner: {v.owner_name}</div>
                </div>

                <div className="row-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormMode("edit");
                      setCurrentItem(v);
                    }}
                  >
                    Edit
                  </button>

                  <button className="btn btn-danger" onClick={() => deleteVehicle(v.vehicle_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "services" && (
        <>
          <div className="toolbar">
            <button
              className="btn btn-primary"
              onClick={() => {
                setFormMode("add");
                setCurrentItem(null);
              }}
            >
              Add Service
            </button>

            <button className="btn btn-secondary" onClick={() => setShowFilter((s) => !s)}>
              {showFilter ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilter && (
            <FilterPanel filters={filters} setFilters={setFilters} serviceRecords={serviceRecords} />
          )}

          {formMode === "add" && !currentItem && (
            <ServiceForm
              vehicles={vehicles}
              service={null}
              onSave={addService}
              onCancel={() => setCurrentItem(null)}
            />
          )}

          {formMode === "edit" && currentItem && (
            <ServiceForm
              vehicles={vehicles}
              service={currentItem}
              onSave={(data) => updateService(currentItem.service_id, data)}
              onCancel={() => setCurrentItem(null)}
            />
          )}

          <div className="card">
            <h2>Service Records</h2>

            {filteredRecords.map((r) => (
              <div className="row" key={r.service_id}>
                <div className="row-main">
                  <div className="row-title">
                    {r.service_date} · {r.service_type} · ${Number(r.cost).toFixed(2)}
                  </div>
                  <div className="row-sub">
                    Vehicle ID: {r.vehicle_id}
                    {r.notes ? ` · ${r.notes}` : ""}
                  </div>
                </div>

                <div className="row-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setFormMode("edit");
                      setCurrentItem(r);
                    }}
                  >
                    Edit
                  </button>

                  <button className="btn btn-danger" onClick={() => deleteService(r.service_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "report" && (
        <ServiceReport vehicles={vehicles} serviceRecords={serviceRecords} filters={filters} />
      )}
    </div>
  );
};

export default App;
