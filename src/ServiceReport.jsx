import React, { useMemo } from "react";

const ServiceReport = ({ vehicles, serviceRecords, filters = {} }) => {
  const filteredRecords = useMemo(() => {
    let records = [...serviceRecords];

    if (filters.minCost) records = records.filter((r) => r.cost >= parseFloat(filters.minCost));
    if (filters.maxCost) records = records.filter((r) => r.cost <= parseFloat(filters.maxCost));
    if (filters.serviceType) records = records.filter((r) => r.service_type === filters.serviceType);

    if (filters.vehicleId) records = records.filter((r) => r.vehicle_id === Number(filters.vehicleId));
    if (filters.startDate) records = records.filter((r) => r.service_date >= filters.startDate);
    if (filters.endDate) records = records.filter((r) => r.service_date <= filters.endDate);

    return records;
  }, [serviceRecords, filters]);

  const totalCost = filteredRecords.reduce((sum, r) => sum + Number(r.cost || 0), 0);

  return (
    <div className="card">
      <h2>Service Report</h2>

      <p>
        <strong>Total Records:</strong> {filteredRecords.length}
      </p>
      <p>
        <strong>Total Cost:</strong> ${totalCost.toFixed(2)}
      </p>
      <p>
        <strong>Avg Cost:</strong> ${(totalCost / (filteredRecords.length || 1)).toFixed(2)}
      </p>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((s) => {
            const v = vehicles.find((x) => x.vehicle_id === s.vehicle_id);
            return (
              <tr key={s.service_id}>
                <td>{s.service_date}</td>
                <td>{v ? `${v.year} ${v.make} ${v.model}` : "N/A"}</td>
                <td>{s.service_type}</td>
                <td>${Number(s.cost).toFixed(2)}</td>
                <td>{s.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceReport;
