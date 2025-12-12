import React, { useEffect, useState } from "react";

const VehicleForm = ({ vehicle, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    owner_name: ""
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make ?? "",
        model: vehicle.model ?? "",
        year: vehicle.year ?? "",
        owner_name: vehicle.owner_name ?? ""
      });
      return;
    }

    setFormData({
      make: "",
      model: "",
      year: "",
      owner_name: ""
    });
  }, [vehicle]);

  const handleSave = () => {
    const cleaned = {
      ...formData,
      year: Number(formData.year) || 0
    };

    onSave(cleaned);
  };

  return (
    <div className="card">
      <h2>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>

      <div className="form-row">
        <div>
          <label>Make</label>
          <input
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
          />
        </div>

        <div>
          <label>Model</label>
          <input
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label>Year</label>
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          />
        </div>

        <div>
          <label>Owner Name</label>
          <input
            value={formData.owner_name}
            onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>

      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default VehicleForm;
