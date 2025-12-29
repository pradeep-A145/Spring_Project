import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const AdminBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const loadBookings = () => {
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    setBookings(slots.filter(slot => slot.booked));
  };

  useEffect(() => {
    loadBookings();

    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  const filtered = bookings.filter(b =>
    b.bookedUserName.toLowerCase().includes(search.toLowerCase()) ||
    b.bookedUserPhone.includes(search) ||
    b.place.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Booking History</h3>

        <input
          className="form-control mb-3"
          placeholder="Search user / phone / place"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle</th>
              <th>Place</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No bookings
                </td>
              </tr>
            ) : (
              filtered.map(b => (
                <tr key={b.id}>
                  <td>{b.bookedUserName}</td>
                  <td>{b.bookedUserPhone}</td>
                  <td>{b.date}</td>
                  <td>{b.timeRange}</td>
                  <td>{b.vehicleType}</td>
                  <td>{b.place}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminBookingHistory;
