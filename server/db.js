import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.sqlite");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vehicles (
      vehicle_id INTEGER PRIMARY KEY AUTOINCREMENT,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      owner_name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS service_records (
      service_id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicle_id INTEGER NOT NULL,
      service_date TEXT NOT NULL,
      service_type TEXT NOT NULL,
      cost REAL NOT NULL,
      notes TEXT,
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
    );
  `);
}

function seedIfEmpty() {
  const count = db.prepare("SELECT COUNT(*) AS c FROM vehicles").get().c;
  if (count > 0) return;

  const insertVehicle = db.prepare(
    "INSERT INTO vehicles (make, model, year, owner_name) VALUES (?, ?, ?, ?)"
  );

  const insertService = db.prepare(
    "INSERT INTO service_records (vehicle_id, service_date, service_type, cost, notes) VALUES (?, ?, ?, ?, ?)"
  );

  const tx = db.transaction(() => {
    const vehicles = [
      ["Toyota", "Camry", 2016, "Vinay P."],
      ["Honda", "Civic", 2019, "Alex M."],
      ["Ford", "F-150", 2014, "Sam R."],
      ["Tesla", "Model 3", 2022, "Jordan K."],
      ["BMW", "X5", 2018, "Priya S."],
      ["Subaru", "Outback", 2020, "Chris L."],
      ["Hyundai", "Elantra", 2021, "Maya D."],
      ["Chevrolet", "Malibu", 2017, "Ryan T."],
      ["Audi", "A4", 2019, "Nina K."],
      ["Nissan", "Altima", 2015, "Daniel W."]
    ];

    const vehicleIds = vehicles.map(v =>
      insertVehicle.run(v[0], v[1], v[2], v[3]).lastInsertRowid
    );

    const services = [
      [0, "2025-01-10", "Oil Change", 65.99, "Synthetic oil"],
      [0, "2025-03-15", "Tire Rotation", 35.0, "Rotated all tires"],
      [0, "2025-06-01", "Brake Inspection", 40.0, "Front brakes checked"],

      [1, "2024-11-20", "Brake Pads", 225.5, "Front pads replaced"],
      [1, "2025-04-05", "Alignment", 90.0, "Wheel alignment"],

      [2, "2024-09-12", "Battery Replacement", 180.0, "New AGM battery"],
      [2, "2025-02-18", "Transmission Service", 320.0, "Fluid flush"],
      [2, "2025-07-02", "Oil Change", 75.0, "High mileage oil"],

      [3, "2025-05-08", "Tire Replacement", 1100.0, "4 all-season tires"],
      [3, "2025-07-22", "Software Update", 0.0, "OTA update"],
      [3, "2025-08-15", "Brake Service", 450.0, "Pads and rotors"],

      [4, "2024-10-30", "Oil Change", 120.0, "BMW-approved oil"],
      [4, "2025-02-14", "Brake Fluid Flush", 150.0, "Preventive maintenance"],
      [4, "2025-06-09", "Suspension Repair", 980.0, "Control arm replacement"],

      [5, "2025-01-05", "Oil Change", 75.0, "Synthetic blend"],
      [5, "2025-03-28", "Suspension Check", 60.0, "No issues found"],
      [5, "2025-08-01", "Wheel Bearing", 340.0, "Rear left bearing"],

      [6, "2025-02-02", "Oil Change", 60.0, "Standard oil"],
      [6, "2025-04-19", "AC Recharge", 130.0, "Coolant refill"],

      [7, "2024-12-11", "Coolant Flush", 140.0, "System flush"],
      [7, "2025-05-23", "Radiator Replacement", 850.0, "OEM radiator"],

      [8, "2025-03-03", "Oil Change", 110.0, "Full synthetic"],
      [8, "2025-06-18", "Timing Belt", 1250.0, "Major service"],

      [9, "2024-11-07", "Oil Change", 55.0, "Conventional oil"],
      [9, "2025-01-29", "Spark Plugs", 210.0, "All plugs replaced"],
      [9, "2025-07-14", "Fuel System Cleaning", 180.0, "Injector cleaning"]
    ];

    services.forEach(s =>
      insertService.run(
        vehicleIds[s[0]],
        s[1],
        s[2],
        s[3],
        s[4]
      )
    );
  });

  tx();
}


export { db, initSchema, seedIfEmpty };
