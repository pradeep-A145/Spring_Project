import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const CreateJobCard = () => {
  const { id } = useParams(); // slotId
  const navigate = useNavigate();

  const [slot, setSlot] = useState(null);
  const [jobCards, setJobCards] = useState([]);
  const [form, setForm] = useState({
    issuesReported: "",
    workDone: "",
    spareParts: "",
    serviceCharge: "",
    status: "Not Completed", // ← default status
  });

  useEffect(() => {
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const foundSlot = slots.find((s) => s.id === Number(id));
    setSlot(foundSlot);

    setJobCards(JSON.parse(localStorage.getItem("jobCards")) || []);
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const createJobCard = () => {
    if (!form.issuesReported || !form.workDone || !form.serviceCharge) {
      alert("Please fill required fields");
      return;
    }

    const serviceCharge = Number(form.serviceCharge);
    const gst = +(serviceCharge * 0.18).toFixed(2);
    const totalAmount = serviceCharge + gst;

    const newJobCard = {
      id: Date.now(),
      slotId: slot.id,
      serviceName: slot.serviceName,
      vehicleType: slot.vehicleType,
      providerName: slot.mechanicName || "Assigned Provider",
      customerName: slot.bookedUserName,
      customerPhone: slot.bookedUserPhone,
      customerEmail: slot.bookedUserEmail,
      issuesReported: form.issuesReported,
      workDone: form.workDone,
      spareParts: form.spareParts,
      serviceCharge,
      gst,
      totalAmount,
      status: form.status, // ← use selected status
      createdAt: new Date().toLocaleString(),
    };

    // Save job card
    localStorage.setItem("jobCards", JSON.stringify([...jobCards, newJobCard]));
    setJobCards([...jobCards, newJobCard]);

    // Update the slot in localStorage
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const updatedSlots = slots.map((s) =>
      s.id === slot.id ? { ...s, serviceCharge, gst, totalAmount, status: form.status } : s
    );
    localStorage.setItem("slots", JSON.stringify(updatedSlots));

    alert("Job Card Created Successfully");
    navigate("/admin/job-cards");
  };

  if (!slot) return <p className="text-center">Loading...</p>;

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Create Job Card</h3>

        <div className="card p-3 mb-3">
          <h5>Customer Details</h5>
          <p><b>Name:</b> {slot.bookedUserName}</p>
          <p><b>Phone:</b> {slot.bookedUserPhone}</p>
          <p><b>Email:</b> {slot.bookedUserEmail}</p>
        </div>

        <div className="card p-4 shadow">
          <textarea
            className="form-control mb-2"
            placeholder="Issues Reported"
            name="issuesReported"
            onChange={handleChange}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Work Done"
            name="workDone"
            onChange={handleChange}
          />
          <input
            className="form-control mb-2"
            placeholder="Spare Parts Used"
            name="spareParts"
            onChange={handleChange}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Service Charge"
            name="serviceCharge"
            onChange={handleChange}
            value={form.serviceCharge}
          />

          {/* ✅ Status Dropdown */}
          <select
            className="form-select mb-3"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Not Completed">Not Completed</option>
            <option value="Completed">Completed</option>
          </select>

          <button className="btn btn-success" onClick={createJobCard}>
            Create Job Card
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateJobCard;
