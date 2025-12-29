import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminBookedSlots = () => {
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSlots = JSON.parse(localStorage.getItem("slots")) || [];
    const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];

    // Map booked slots and ensure "place" is set
    const bookedSlots = storedSlots
      .filter((s) => s.booked)
      .map((slot) => {
        const mechanic = mechanics.find((m) => m.id === slot.mechanicId);
        return {
          ...slot,
          place: slot.place || mechanic?.city || "-", // fallback
        };
      });

    setSlots(bookedSlots);
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Booked Service Slots</h3>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Vehicle</th>
              <th>Place</th>
              <th>Service</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No bookings found
                </td>
              </tr>
            ) : (
              slots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.date}</td>
                  <td>{slot.timeRange}</td>
                  <td>{slot.vehicleType}</td>
                  <td>{slot.place}</td>
                  <td>{slot.serviceName}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        navigate(`/admin/view-booking/${slot.id}`)
                      }
                    >
                      View User Details
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

export default AdminBookedSlots;
