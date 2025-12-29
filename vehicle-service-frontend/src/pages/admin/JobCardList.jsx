import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";

const JobCardList = () => {
  const [jobCards, setJobCards] = useState([]);

  useEffect(() => {
    setJobCards(JSON.parse(localStorage.getItem("jobCards")) || []);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this job card?")) {
      return;
    }

    const updatedJobCards = jobCards.filter((j) => j.id !== id);
    setJobCards(updatedJobCards);
    localStorage.setItem("jobCards", JSON.stringify(updatedJobCards));
  };

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h3>Job Cards</h3>

        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Charge ₹</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {jobCards.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No job cards found
                </td>
              </tr>
            ) : (
              jobCards.map((j) => (
                <tr key={j.id}>
                  <td>{j.customerName}</td>
                  <td>{j.serviceName}</td>
                  <td>{j.vehicleType}</td>
                  <td>{j.status}</td>
                  <td>{j.serviceCharge}</td>
                  <td>{j.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(j.id)}
                    >
                      Delete
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

export default JobCardList;
