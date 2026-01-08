import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SERVICE_PRICING = {
  "general service": 500,
  "oil change": 700,
  "brake repair": 1200,
  "engine repair": 2500,
  "battery replacement": 900,
  "wheel alignment": 800,
  "full service": 3000
};

const ViewSlots = () => {
  const nav = useNavigate();

  const [slots, setSlots] = useState([]);
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];

  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")) || []);
  }, []);

  const bookSlot = (slot) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    if (!window.confirm("Confirm booking for this slot?")) return;

    const normalizedService = slot.serviceName?.trim().toLowerCase();
    const serviceCharge = SERVICE_PRICING[normalizedService] || 0;
    const gst = +(serviceCharge * 0.18).toFixed(2);
    const totalAmount = serviceCharge + gst;

    const updatedSlots = slots.map(s =>
      s.id === slot.id
        ? {
            ...s,
            booked: true,
            bookedUserName: user.name,
            bookedUserEmail: user.email,
            bookedUserPhone: user.phone,
            serviceCharge,
            gst,
            totalAmount
          }
        : s
    );

    setSlots(updatedSlots);
    localStorage.setItem("slots", JSON.stringify(updatedSlots));

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push({
      ...slot,
      userEmail: user.email,
      serviceCharge,
      gst,
      totalAmount,
      status: "Upcoming"
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    toast.success("Slot booked successfully 🚗");
  };

  const filteredSlots = slots.filter(slot =>
    slot.city.toLowerCase().includes(search.toLowerCase()) &&
    slot.serviceName.toLowerCase().includes(serviceFilter.toLowerCase())
  );

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" />

      <div className="container py-4">
        {/* Header Buttons */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Available Service Slots</h4>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => nav("/user/dashboard")}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Back
            </button>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => nav("/user/mybookings")}
            >
              <i className="bi bi-journal-text me-1"></i>
              My Bookings
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-3 g-2">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Search by city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Filter by service"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm border-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Vehicle</th>
                  <th>City</th>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Charge ₹</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlots.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No slots available
                    </td>
                  </tr>
                ) : (
                  filteredSlots.map(slot => {
                    const provider = mechanics.find(
                      m => m.id === slot.mechanicId
                    );
                    const charge =
                      slot.serviceCharge ||
                      SERVICE_PRICING[slot.serviceName?.toLowerCase()] ||
                      0;

                    return (
                      <tr key={slot.id}>
                        <td>{slot.date}</td>
                        <td>{slot.timeRange}</td>
                        <td>{slot.vehicleType}</td>
                        <td>{slot.city}</td>
                        <td>{slot.serviceName}</td>
                        <td>{provider?.mechanicName || "-"}</td>
                        <td>₹ {charge}</td>
                        <td>
                          {slot.booked ? (
                            <span className="badge bg-success">Booked</span>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => bookSlot(slot)}
                            >
                              Book
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSlots;
