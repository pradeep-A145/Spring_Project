import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const ViewBookedUser = () => {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    const found = slots.find((s) => String(s.id) === id);

    if (found) {
      // Get the mechanic for this slot
      const provider = mechanics.find((m) => m.id === found.mechanicId);

      setSlot({
        ...found,
        place: found.place || provider?.city || "-", // fallback to mechanic city
      });
    }
  }, [id]);

  if (!slot) {
    return (
      <>
        <AdminNavbar />
        <div className="container py-4">
          <h5>No booking found</h5>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Booked User Details</h3>

        <div className="card p-4 shadow">
          <h5>User Information</h5>
          <p><b>Name:</b> {slot.bookedUserName}</p>
          <p><b>Email:</b> {slot.bookedUserEmail}</p>
          <p><b>Phone:</b> {slot.bookedUserPhone}</p>

          <hr />

          <h5>Service Details</h5>
          <p><b>Date:</b> {slot.date}</p>
          <p><b>Time:</b> {slot.timeRange}</p>
          <p><b>Vehicle:</b> {slot.vehicleType}</p>
          <p><b>Place:</b> {slot.place}</p>
          <p><b>Service:</b> {slot.serviceName}</p>

          <hr />

          <h5>Billing Details</h5>
          <p><b>Base Amount:</b> ₹{slot.baseAmount || slot.serviceCharge || 0}</p>
          <p><b>GST (18%):</b> ₹{slot.gst || 0}</p>
          <h5 className="text-success">
            Total: ₹{slot.totalAmount || 0}
          </h5>
        </div>
      </div>
    </>
  );
};

export default ViewBookedUser;
