import express from "express";
import cors from "cors";
import { db, initSchema, seedIfEmpty } from "./db.js";

initSchema();
seedIfEmpty();


initSchema();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

// Vehicles
app.get("/api/vehicles", (req, res) => {
  const rows = db.prepare("SELECT * FROM vehicles ORDER BY vehicle_id DESC").all();
  res.json(rows);
});

app.post("/api/vehicles", (req, res) => {
  const { make, model, year, owner_name } = req.body;
  if (!make || !model || !year || !owner_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const stmt = db.prepare(`
    INSERT INTO vehicles (make, model, year, owner_name)
    VALUES (?, ?, ?, ?)
  `);
  const info = stmt.run(make, model, Number(year), owner_name);
  const created = db.prepare("SELECT * FROM vehicles WHERE vehicle_id = ?").get(info.lastInsertRowid);
  res.status(201).json(created);
});

app.put("/api/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM vehicles WHERE vehicle_id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Vehicle not found" });

  const make = req.body.make ?? existing.make;
  const model = req.body.model ?? existing.model;
  const year = req.body.year ?? existing.year;
  const owner_name = req.body.owner_name ?? existing.owner_name;

  db.prepare(`
    UPDATE vehicles
    SET make = ?, model = ?, year = ?, owner_name = ?
    WHERE vehicle_id = ?
  `).run(make, model, Number(year), owner_name, id);

  const updated = db.prepare("SELECT * FROM vehicles WHERE vehicle_id = ?").get(id);
  res.json(updated);
});

app.delete("/api/vehicles/:id", (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare("DELETE FROM vehicles WHERE vehicle_id = ?").run(id);
  res.json({ deleted: info.changes > 0 });
});

// Service records
app.get("/api/services", (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM service_records
    ORDER BY service_date DESC, service_id DESC
  `).all();
  res.json(rows);
});

app.post("/api/services", (req, res) => {
  const { vehicle_id, service_date, service_type, cost, notes } = req.body;
  if (!vehicle_id || !service_date || !service_type || cost === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const vehicle = db.prepare("SELECT 1 FROM vehicles WHERE vehicle_id = ?").get(Number(vehicle_id));
  if (!vehicle) return res.status(400).json({ error: "Invalid vehicle_id" });

  const stmt = db.prepare(`
    INSERT INTO service_records (vehicle_id, service_date, service_type, cost, notes)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(Number(vehicle_id), service_date, service_type, Number(cost), notes ?? null);
  const created = db.prepare("SELECT * FROM service_records WHERE service_id = ?").get(info.lastInsertRowid);
  res.status(201).json(created);
});

app.put("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare("SELECT * FROM service_records WHERE service_id = ?").get(id);
  if (!existing) return res.status(404).json({ error: "Service record not found" });

  const vehicle_id = req.body.vehicle_id ?? existing.vehicle_id;
  const service_date = req.body.service_date ?? existing.service_date;
  const service_type = req.body.service_type ?? existing.service_type;
  const cost = req.body.cost ?? existing.cost;
  const notes = req.body.notes ?? existing.notes;

  const vehicle = db.prepare("SELECT 1 FROM vehicles WHERE vehicle_id = ?").get(Number(vehicle_id));
  if (!vehicle) return res.status(400).json({ error: "Invalid vehicle_id" });

  db.prepare(`
    UPDATE service_records
    SET vehicle_id = ?, service_date = ?, service_type = ?, cost = ?, notes = ?
    WHERE service_id = ?
  `).run(Number(vehicle_id), service_date, service_type, Number(cost), notes ?? null, id);

  const updated = db.prepare("SELECT * FROM service_records WHERE service_id = ?").get(id);
  res.json(updated);
});

app.delete("/api/services/:id", (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare("DELETE FROM service_records WHERE service_id = ?").run(id);
  res.json({ deleted: info.changes > 0 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
