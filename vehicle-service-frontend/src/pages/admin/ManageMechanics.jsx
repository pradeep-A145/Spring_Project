import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const ManageMechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [form, setForm] = useState({
    serviceName: "",
    city: "",
    vehicleType: "",
    mechanicName: "",
    experience: ""
  });

  // Load mechanics from localStorage
  useEffect(() => {
    setMechanics(JSON.parse(localStorage.getItem("mechanics")) || []);
  }, []);

  // Save mechanics to localStorage
  const saveMechanics = (data) => {
    setMechanics(data);
    localStorage.setItem("mechanics", JSON.stringify(data));
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new service/mechanic
  const addMechanic = () => {
    if (!form.serviceName || !form.city || !form.vehicleType || !form.mechanicName || !form.experience) {
      alert("Please fill all fields");
      return;
    }

    const newMechanic = {
      id: Date.now(),
      serviceName: form.serviceName,
      city: form.city,
      vehicleType: form.vehicleType,
      mechanicName: form.mechanicName,
      experience: form.experience,
      active: true
    };

    saveMechanics([...mechanics, newMechanic]);

    setForm({
      serviceName: "",
      city: "",
      vehicleType: "",
      mechanicName: "",
      experience: ""
    });
  };

  // Toggle active/inactive status
  const toggleStatus = (id) => {
    saveMechanics(
      mechanics.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m
      )
    );
  };

  // Delete mechanic/service
  const deleteMechanic = (id) => {
    if (!window.confirm("Delete this service/mechanic?")) return;
    saveMechanics(mechanics.filter((m) => m.id !== id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Manage Services & Mechanics</h3>

        {/* Add Service/Mechanic Form */}
        <div className="card p-4 mb-4 shadow">
          <h5>Add Service / Mechanic</h5>

          <input
            className="form-control mb-2"
            placeholder="Service Name"
            name="serviceName"
            value={form.serviceName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-2"
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <select
            className="form-control mb-2"
            name="vehicleType"
            value={form.vehicleType}
            onChange={handleChange}
          >
            <option value="">Vehicle Type</option>
            <option>Two Wheeler</option>
            <option>Four Wheeler</option>
            <option>Both</option>
          </select>

          <input
            className="form-control mb-2"
            placeholder="Provider Name"
            name="mechanicName"
            value={form.mechanicName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Experience (e.g. 5 Years)"
            name="experience"
            value={form.experience}
            onChange={handleChange}
          />

          <button className="btn btn-primary" onClick={addMechanic}>
            Add Service
          </button>
        </div>

        {/* Mechanics Table */}
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Service</th>
              <th>City</th>
              <th>Vehicle</th>
              <th>Provider</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {mechanics.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No services added
                </td>
              </tr>
            ) : (
              mechanics.map((m) => (
                <tr key={m.id}>
                  <td>{m.serviceName}</td>
                  <td>{m.city}</td>
                  <td>{m.vehicleType}</td>
                  <td>{m.mechanicName}</td>
                  <td>{m.experience}</td>
                  <td className={m.active ? "text-success" : "text-danger"}>
                    {m.active ? "Active" : "Inactive"}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => toggleStatus(m.id)}
                    >
                      Toggle
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteMechanic(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageMechanics;
