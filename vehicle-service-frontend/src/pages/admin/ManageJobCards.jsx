import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const ManageJobCards = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [form, setForm] = useState({
    bookingId: "",
    mechanic: "",
    labourCost: "",
    partsCost: ""
  });
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    setBookedSlots(slots.filter(s => s.booked));

    const storedMechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    setMechanics(storedMechanics);

    const storedJobCards = JSON.parse(localStorage.getItem("jobCards")) || [];
    setJobCards(storedJobCards);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateBill = () => {
    if (!form.bookingId || !form.mechanic || !form.labourCost || !form.partsCost) {
      alert("Fill all fields");
      return;
    }

    const total = parseFloat(form.labourCost) + parseFloat(form.partsCost);

    const newJobCard = { ...form, total };

    const updatedJobCards = [...jobCards, newJobCard];
    setJobCards(updatedJobCards);
    localStorage.setItem("jobCards", JSON.stringify(updatedJobCards));

    alert("Bill generated successfully!");
    setForm({ bookingId: "", mechanic: "", labourCost: "", partsCost: "" });
  };

  const cancelJobCard = (bookingId) => {
    if (!window.confirm("Cancel this job card?")) return;

    const updated = jobCards.filter(j => j.bookingId !== bookingId);
    setJobCards(updated);
    localStorage.setItem("jobCards", JSON.stringify(updated));
    alert("Job card cancelled!");
  };

  return (
    <>
      <AdminNavbar />

      <div className="container py-4">
        <h3 className="mb-4">Job Cards</h3>

        <div className="card shadow p-4 mb-4">
          <h5>Create Job Card</h5>

          <select
            className="form-control mb-2"
            name="bookingId"
            value={form.bookingId}
            onChange={handleChange}
          >
            <option value="">Select Booking</option>
            {bookedSlots.map(slot => (
              <option key={slot.id} value={slot.id}>
                {slot.date} | {slot.vehicleType} | {slot.place} | {slot.bookedUserName}
              </option>
            ))}
          </select>

          <select
            className="form-control mb-2"
            name="mechanic"
            value={form.mechanic}
            onChange={handleChange}
          >
            <option value="">Select Mechanic</option>
            {mechanics.map((m, idx) => (
              <option key={idx} value={m.name}>
                {m.name} | {m.city} | {m.vehicleType}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-2"
            placeholder="Labour Cost"
            name="labourCost"
            value={form.labourCost}
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Parts Cost"
            name="partsCost"
            value={form.partsCost}
            onChange={handleChange}
          />

          <button className="btn btn-primary" onClick={generateBill}>
            Generate Bill
          </button>
        </div>

        <div className="card shadow p-4">
          <h5>Completed Jobs</h5>

          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Mechanic</th>
                <th>Total Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No jobs yet</td>
                </tr>
              ) : (
                jobCards.map((job, idx) => {
                  const slot = bookedSlots.find(s => s.id === job.bookingId);
                  return (
                    <tr key={idx}>
                      <td>{job.bookingId}</td>
                      <td>{job.mechanic}</td>
                      <td>₹{job.total}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => cancelJobCard(job.bookingId)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageJobCards;
