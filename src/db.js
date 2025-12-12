export const initDB = () => {
    return {
      vehicles: [
        { vehicle_id: 1, make: "Toyota", model: "Camry", year: 2020, owner_name: "John Smith" },
        { vehicle_id: 2, make: "Honda", model: "Civic", year: 2019, owner_name: "Sarah Johnson" },
        { vehicle_id: 3, make: "Ford", model: "F-150", year: 2021, owner_name: "Mike Davis" },
        { vehicle_id: 4, make: "Tesla", model: "Model 3", year: 2022, owner_name: "Emily Carter" },
        { vehicle_id: 5, make: "BMW", model: "X5", year: 2018, owner_name: "David Lee" },
        { vehicle_id: 6, make: "Hyundai", model: "Elantra", year: 2020, owner_name: "Ava Thompson" },
        { vehicle_id: 7, make: "Jeep", model: "Wrangler", year: 2017, owner_name: "Mason Reyes" },
        { vehicle_id: 8, make: "Subaru", model: "Outback", year: 2021, owner_name: "Natalie Green" },
        { vehicle_id: 9, make: "Chevrolet", model: "Malibu", year: 2019, owner_name: "Mark Taylor" },
        { vehicle_id: 10, make: "Kia", model: "Sorento", year: 2022, owner_name: "Olivia Brown" }
      ],
  
      serviceRecords: [
    
        { service_id: 1, vehicle_id: 1, service_date: "2025-10-15", service_type: "Oil Change", cost: 45.99, notes: "Synthetic oil used" },
        { service_id: 2, vehicle_id: 1, service_date: "2025-09-01", service_type: "Tire Rotation", cost: 35.00, notes: "All tires rotated" },
        { service_id: 3, vehicle_id: 2, service_date: "2025-10-20", service_type: "Brake Service", cost: 250.00, notes: "Front brake pads replaced" },
        { service_id: 4, vehicle_id: 3, service_date: "2025-11-01", service_type: "Oil Change", cost: 55.99, notes: "Full synthetic" },
        { service_id: 5, vehicle_id: 4, service_date: "2025-10-10", service_type: "Battery Check", cost: 85.00, notes: "High-voltage battery check" },
        { service_id: 6, vehicle_id: 4, service_date: "2025-09-15", service_type: "Tire Alignment", cost: 120.00, notes: "Performed after tire swap" },
        { service_id: 7, vehicle_id: 5, service_date: "2025-08-12", service_type: "Engine Diagnostics", cost: 180.00, notes: "Fault code cleared" },
        { service_id: 8, vehicle_id: 5, service_date: "2025-07-20", service_type: "Brake Service", cost: 320.00, notes: "Rear brake pads replaced" },
        { service_id: 9, vehicle_id: 6, service_date: "2025-10-05", service_type: "Oil Change", cost: 40.00, notes: "Standard oil" },
        { service_id: 10, vehicle_id: 6, service_date: "2025-08-10", service_type: "Air Filter Replacement", cost: 25.00, notes: "Cabin + engine filter replaced" },
        { service_id: 11, vehicle_id: 7, service_date: "2025-11-02", service_type: "Suspension Check", cost: 95.00, notes: "Front shocks inspected" },
        { service_id: 12, vehicle_id: 7, service_date: "2025-09-28", service_type: "Tire Rotation", cost: 38.00, notes: "Rotated all-terrain tires" },
        { service_id: 13, vehicle_id: 8, service_date: "2025-10-18", service_type: "Oil Change", cost: 50.00, notes: "Full synthetic" },
        { service_id: 14, vehicle_id: 8, service_date: "2025-07-10", service_type: "Windshield Wiper Replacement", cost: 20.00, notes: "Replaced both blades" },
        { service_id: 15, vehicle_id: 9, service_date: "2025-10-02", service_type: "Transmission Fluid Flush", cost: 200.00, notes: "Performed routine flush" },
        { service_id: 16, vehicle_id: 9, service_date: "2025-08-18", service_type: "Brake Service", cost: 275.00, notes: "Replaced rotors + pads" },
        { service_id: 17, vehicle_id: 10, service_date: "2025-11-03", service_type: "Oil Change", cost: 48.00, notes: "Synthetic blend" },
        { service_id: 18, vehicle_id: 10, service_date: "2025-09-22", service_type: "Coolant Flush", cost: 90.00, notes: "Replaced coolant" },
        { service_id: 19, vehicle_id: 10, service_date: "2025-07-30", service_type: "Battery Replacement", cost: 160.00, notes: "Replaced 12V battery" },
        { service_id: 20, vehicle_id: 3, service_date: "2025-10-09", service_type: "Engine Tune-Up", cost: 300.00, notes: "Spark plugs + ignition coils replaced" },
        { service_id: 21, vehicle_id: 3, service_date: "2025-08-14", service_type: "Tire Alignment", cost: 110.00, notes: "Fixed left drift" },
        { service_id: 22, vehicle_id: 2, service_date: "2025-09-19", service_type: "Oil Change", cost: 42.00, notes: "Standard oil" },
        { service_id: 23, vehicle_id: 2, service_date: "2025-07-11", service_type: "Air Filter Replacement", cost: 30.00, notes: "Engine filter replaced" }
      ]
    };
  };
  