import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM"
];

const SERVICE_PRICING = {
  "general service": 500,
  "oil change": 700,
  "brake repair": 1200,
  "engine repair": 2500,
  "battery replacement": 900,
  "wheel alignment": 800,
  "full service": 3000
};

const ManageSlots = () => {
  const navigate = useNavigate();

  const [slots, setSlots] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  const [form, setForm] = useState({
    date: "",
    city: "",
    vehicleType: "",
    serviceName: "",
    mechanicId: "",
    timeRange: ""
  });

  // 🔔 Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")) || []);
    setMechanics(JSON.parse(localStorage.getItem("mechanics")) || []);
  }, []);

  const saveSlots = (data) => {
    setSlots(data);
    localStorage.setItem("slots", JSON.stringify(data));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === "city" && { vehicleType: "", serviceName: "", mechanicId: "", timeRange: "" }),
      ...(name === "vehicleType" && { serviceName: "", mechanicId: "", timeRange: "" }),
      ...(name === "serviceName" && { mechanicId: "", timeRange: "" }),
      ...(name === "mechanicId" && { timeRange: "" })
    }));
  };

  const cities = [...new Set(mechanics.map(m => m.city))];

  const vehicleTypes = form.city
    ? [...new Set(mechanics.filter(m => m.city === form.city).map(m => m.vehicleType))]
    : [];

  const services = form.city && form.vehicleType
    ? [...new Set(
        mechanics
          .filter(m => m.city === form.city && (m.vehicleType === form.vehicleType || m.vehicleType === "Both"))
          .map(m => m.serviceName)
      )]
    : [];

  const filteredMechanics =
    form.city && form.vehicleType && form.serviceName
      ? mechanics.filter(
          m =>
            m.city === form.city &&
            (m.vehicleType === form.vehicleType || m.vehicleType === "Both") &&
            m.serviceName === form.serviceName
        )
      : [];

  const bookedTimes = slots
    .filter(s => s.date === form.date && String(s.mechanicId) === String(form.mechanicId))
    .map(s => s.timeRange);

  const availableTimes = TIME_SLOTS.filter(t => !bookedTimes.includes(t));

  const addSlot = () => {
    if (Object.values(form).some(v => !v)) {
      showToast("danger", "Please fill all fields");
      return;
    }

    const normalizedService = form.serviceName.trim().toLowerCase();
    const serviceCharge = SERVICE_PRICING[normalizedService] || 0;

    const newSlot = {
      id: Date.now(),
      ...form,
      mechanicId: Number(form.mechanicId),
      booked: false,
      bookedUserName: "",
      bookedUserEmail: "",
      bookedUserPhone: "",
      serviceCharge,
      gst: +(serviceCharge * 0.18).toFixed(2),
      totalAmount: serviceCharge + +(serviceCharge * 0.18).toFixed(2)
    };

    saveSlots([...slots, newSlot]);
    showToast("success", "Slot added successfully");

    setForm({
      date: "",
      city: "",
      vehicleType: "",
      serviceName: "",
      mechanicId: "",
      timeRange: ""
    });
  };

  const cancelBooking = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    saveSlots(
      slots.map(s =>
        s.id === id
          ? { ...s, booked: false, bookedUserName: "", bookedUserPhone: "", bookedUserEmail: "" }
          : s
      )
    );

    showToast("warning", "Booking cancelled");
  };

  const deleteSlot = (id) => {
    if (!window.confirm("Delete this slot?")) return;

    saveSlots(slots.filter(s => s.id !== id));
    showToast("danger", "Slot deleted");
  };

  return (
    <>
      <AdminNavbar />

      {/* 🔔 Toast */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
        {toast.show && (
          <div className={`toast show text-bg-${toast.type} border-0`}>
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setToast({ show: false })}
              ></button>
            </div>
          </div>
        )}
      </div>

      <div className="container py-4">
        <h3 className="mb-4">Manage Slots</h3>

        {/* FORM */}
        <div className="row g-2 mb-3">
          <div className="col-md-2">
            <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} />
          </div>
          <div className="col-md-2">
            <select className="form-control" name="city" value={form.city} onChange={handleChange}>
              <option value="">City</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-control" name="vehicleType" value={form.vehicleType} onChange={handleChange} disabled={!form.city}>
              <option value="">Vehicle</option>
              {vehicleTypes.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-control" name="serviceName" value={form.serviceName} onChange={handleChange} disabled={!form.vehicleType}>
              <option value="">Service</option>
              {services.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-control" name="mechanicId" value={form.mechanicId} onChange={handleChange} disabled={!form.serviceName}>
              <option value="">Provider</option>
              {filteredMechanics.map(m => (
                <option key={m.id} value={m.id}>{m.mechanicName}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select className="form-control" name="timeRange" value={form.timeRange} onChange={handleChange} disabled={!form.mechanicId}>
              <option value="">Time</option>
              {availableTimes.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button className="btn btn-success mb-4" onClick={addSlot}>Add Slot</button>

        {/* TABLE */}
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle</th>
              <th>City</th>
              <th>Service</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map(s => (
              <tr key={s.id}>
                <td>{s.date}</td>
                <td>{s.timeRange}</td>
                <td>{s.vehicleType}</td>
                <td>{s.city}</td>
                <td>{s.serviceName}</td>
                <td>{mechanics.find(m => m.id === s.mechanicId)?.mechanicName}</td>
                <td className={s.booked ? "text-danger" : "text-success"}>
                  {s.booked ? "Booked" : "Available"}
                </td>
                <td>
                  {s.booked && (
                    <>
                      <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/admin/view-booking/${s.id}`)}>View User</button>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => navigate(`/admin/create-job-card/${s.id}`)}>Create Job Card</button>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => cancelBooking(s.id)}>Cancel</button>
                    </>
                  )}
                  <button className="btn btn-danger btn-sm" onClick={() => deleteSlot(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageSlots;
