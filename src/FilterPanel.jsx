import React from "react";

const FilterPanel = ({ filters, setFilters, serviceRecords }) => {
  const types = [...new Set(serviceRecords.map((s) => s.service_type))];

  return (
    <div className="card">
      <h3>Filters</h3>

      <label>Min Cost</label>
      <input
        type="number"
        value={filters.minCost || ""}
        onChange={(e) => setFilters({ ...filters, minCost: e.target.value })}
      />

      <label>Max Cost</label>
      <input
        type="number"
        value={filters.maxCost || ""}
        onChange={(e) => setFilters({ ...filters, maxCost: e.target.value })}
      />

      <label>Service Type</label>
      <select
        value={filters.serviceType || ""}
        onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })}
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <button className="btn btn-secondary" onClick={() => setFilters({})}>
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;
