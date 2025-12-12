import React, { useEffect, useState } from "react";

const ServiceForm = ({ vehicles, service, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicle_id: "",
    service_date: "",
    service_type: "",
    cost: "",
    notes: ""
  });

  useEffect(() => {
    if (service) {
      setFormData({
        vehicle_id: service.vehicle_id ?? "",
        service_date: service.service_date ?? "",
        service_type: service.service_type ?? "",
        cost: service.cost ?? "",
        notes: service.notes ?? ""
      });
      return;
    }

    setFormData({
      vehicle_id: "",
      service_date: "",
      service_type: "",
      cost: "",
      notes: ""
    });
  }, [service]);

  const handleSave = () => {
    const cleaned = {
      vehicle_id: Number(formData.vehicle_id),
      service_date: formData.service_date,
      service_type: formData.service_type,
      cost: Number(formData.cost) || 0,
      notes: formData.notes
    };

    onSave(cleaned);
  };

  return (
    <div className="card">
      <h2>{service ? "Edit Service Record" : "Add Service"}</h2>

      <label>Vehicle</label>
      <select
        value={formData.vehicle_id}
        onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
      >
        <option value="">Select Vehicle</option>
        {vehicles.map((v) => (
          <option key={v.vehicle_id} value={v.vehicle_id}>
            {v.year} {v.make} {v.model}
          </option>
        ))}
      </select>

      <label>Date</label>
      <input
        type="date"
        value={formData.service_date}
        onChange={(e) => setFormData({ ...formData, service_date: e.target.value })}
      />

      <label>Service Type</label>
      <input
        value={formData.service_type}
        onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
      />

      <label>Cost</label>
      <input
        type="number"
        value={formData.cost}
        onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
      />

      <label>Notes</label>
      <textarea
        rows={3}
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>

      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default ServiceForm;
