import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // New filter

  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const loadBookings = () => {
    if (!loggedUser) return;

    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    const today = new Date();

    const userBookings = slots
      .filter(
        (s) =>
          s.booked &&
          s.bookedUserEmail === loggedUser.email &&
          (selectedDate === "" || s.date === selectedDate)
      )
      .map((s) => {
        const provider = mechanics.find((m) => m.id === s.mechanicId);
        const bookingDate = new Date(s.date + " " + s.timeRange.split("-")[0]);
        const status = bookingDate < today ? "Completed" : "Upcoming";

        return {
          ...s,
          providerName: provider?.mechanicName || "-",
          place: s.place || provider?.city || "-",
          status,
        };
      });

    // Apply status filter
    const filteredBookings =
      statusFilter === "All"
        ? userBookings
        : userBookings.filter((b) => b.status === statusFilter);

    setBookings(filteredBookings);
  };

  useEffect(() => {
    loadBookings();
  }, [selectedDate, statusFilter]);

  const cancelBooking = (id, date) => {
    const today = new Date();
    const bookingDate = new Date(date);
    if (bookingDate < today) {
      toast.warning("Past bookings cannot be cancelled");
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

  const renderTable = (bookingList) => (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
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
          {bookingList.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                No bookings found
              </td>
            </tr>
          ) : (
            bookingList.map((b) => (
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
                      b.status === "Completed" ? "bg-success" : "bg-warning"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => cancelBooking(b.id, b.date)}
                    disabled={b.status === "Completed"}
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
  );

  const renderCards = (bookingList) =>
    bookingList.map((b) => (
      <div key={b.id} className="card mb-3 shadow-sm border-0">
        <div className="card-body">
          <h6 className="fw-bold mb-2">
            {b.date} | {b.timeRange}
          </h6>
          <p className="mb-1"><b>Vehicle:</b> {b.vehicleType}</p>
          <p className="mb-1"><b>Service:</b> {b.serviceName}</p>
          <p className="mb-1"><b>Provider:</b> {b.providerName}</p>
          <span
            className={`badge ${
              b.status === "Completed" ? "bg-success" : "bg-warning"
            } mb-2`}
          >
            {b.status}
          </span>
          <div>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => cancelBooking(b.id, b.date)}
              disabled={b.status === "Completed"}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <UserNavbar />
      <ToastContainer position="top-right" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">My Bookings</h3>
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
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="d-none d-md-block card shadow-sm border-0 mb-4">
          {renderTable(bookings)}
        </div>

        {/* Mobile Cards */}
        <div className="d-md-none">{renderCards(bookings)}</div>
      </div>
    </>
  );
};

export default MyBookings;
