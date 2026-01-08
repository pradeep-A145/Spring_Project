import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";

const SERVICE_PRICING = {
  "general service": 500,
  "oil change": 700,
  "brake repair": 1200,
  "engine repair": 2500,
  "battery replacement": 900,
  "wheel alignment": 800,
  "full service": 3000
};

const MyBills = () => {
  const [bills, setBills] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    if (!loggedUser) return;

    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const userBills = slots.filter(
      s => s.booked && s.bookedUserEmail === loggedUser.email
    );

    const calculatedBills = userBills.map(slot => {
      const normalizedService = slot.serviceName?.trim().toLowerCase();
      const serviceCharge =
        slot.serviceCharge || SERVICE_PRICING[normalizedService] || 0;
      const gst = +(serviceCharge * 0.18).toFixed(2);
      const totalAmount = slot.totalAmount || serviceCharge + gst;

      return { ...slot, serviceCharge, gst, totalAmount };
    });

    setBills(calculatedBills);
  }, [loggedUser]);

  return (
    <>
      <UserNavbar />

      <div className="container py-4">
        {/* Header with Back Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">My Bills & Charges</h3>
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={() => (window.location.href = "/user/dashboard")}
          >
            <i className="bi bi-arrow-left-circle"></i>
            Back to Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Vehicle</th>
                <th>City</th>
                <th>Service Charge ₹</th>
                <th>GST (18%) ₹</th>
                <th>Total Amount ₹</th>
              </tr>
            </thead>
            <tbody>
              {bills.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No bills available
                  </td>
                </tr>
              ) : (
                bills.map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.date}</td>
                    <td>{bill.timeRange}</td>
                    <td>{bill.serviceName}</td>
                    <td>{bill.vehicleType}</td>
                    <td>{bill.city}</td>
                    <td>₹ {bill.serviceCharge}</td>
                    <td>₹ {bill.gst}</td>
                    <td className="fw-bold text-success">₹ {bill.totalAmount}</td>
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

export default MyBills;
