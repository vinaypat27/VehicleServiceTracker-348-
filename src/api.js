// If you set up a Vite proxy, keep BASE as "".
// Without a proxy, set BASE to "http://localhost:3001".
const BASE = "";

async function http(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!res.ok) {
    const msg = await res.json().catch(() => ({}));
    throw new Error(msg.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  getVehicles: () => http("/api/vehicles"),
  addVehicle: (body) => http("/api/vehicles", { method: "POST", body: JSON.stringify(body) }),
  updateVehicle: (id, body) =>
    http(`/api/vehicles/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteVehicle: (id) => http(`/api/vehicles/${id}`, { method: "DELETE" }),

  getServices: () => http("/api/services"),
  addService: (body) => http("/api/services", { method: "POST", body: JSON.stringify(body) }),
  updateService: (id, body) =>
    http(`/api/services/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteService: (id) => http(`/api/services/${id}`, { method: "DELETE" })
};
