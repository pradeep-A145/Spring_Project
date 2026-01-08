import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const nav = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const loadBookings = () => {
    if (!loggedUser) return;

    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    const jobCards = JSON.parse(localStorage.getItem("jobCards")) || [];

    let userBookings = slots.filter(
      (s) =>
        s.booked &&
        s.bookedUserEmail === loggedUser.email &&
        (selectedDate === "" || s.date === selectedDate)
    );

    userBookings = userBookings.map((s) => {
      const provider = mechanics.find((m) => m.id === s.mechanicId);
      const relatedJobCard = jobCards.find(
        (j) => j.slotId === s.id && j.status === "Completed"
      );

      return {
        ...s,
        providerName: provider?.mechanicName || "-",
        place: s.place || provider?.city || "-",
        status: relatedJobCard ? "Completed" : "Not Completed",
      };
    });

    const filteredBookings =
      statusFilter === "All"
        ? userBookings
        : statusFilter === "Completed"
        ? userBookings.filter((b) => b.status === "Completed")
        : userBookings.filter((b) => b.status !== "Completed");

    setBookings(filteredBookings);
  };

  useEffect(() => {
    loadBookings();
  }, [selectedDate, statusFilter]);

  const cancelBooking = (id, status) => {
    if (status === "Completed") {
      toast.warning("Completed services cannot be cancelled");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const updatedSlots = slots.map((slot) =>
      slot.id === id
        ? {
            ...slot,
            booked: false,
            bookedUserName: "",
            bookedUserPhone: "",
            bookedUserEmail: "",
          }
        : slot
    );

    localStorage.setItem("slots", JSON.stringify(updatedSlots));
    toast.success("Booking cancelled successfully");
    loadBookings();
  };

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" />

      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">My Bookings</h3>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => nav("/user/view")}
            >
              <i className="bi bi-arrow-left me-1"></i>
              Back
            </button>

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => nav("/user/dashboard")}
            >
              <i className="bi bi-receipt me-1"></i>
              Dashboard
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-4 mb-2">
            <label className="form-label">Filter by Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-2">
            <label className="form-label">Filter by Status</label>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="NotCompleted">Not Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Vehicle</th>
                <th>Place</th>
                <th>Service</th>
                <th>Provider</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.date}</td>
                    <td>{b.timeRange}</td>
                    <td>{b.vehicleType}</td>
                    <td>{b.place}</td>
                    <td>{b.serviceName}</td>
                    <td>{b.providerName}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "Completed"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        disabled={b.status === "Completed"}
                        onClick={() => cancelBooking(b.id, b.status)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
