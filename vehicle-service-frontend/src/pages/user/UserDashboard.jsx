import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const nav = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
  });

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) return;

    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const jobCards = JSON.parse(localStorage.getItem("jobCards")) || [];

    const userBookings = slots.filter(
      (s) => s.booked && s.bookedUserEmail === loggedUser.email
    );

    const completedBookings = userBookings.filter((slot) =>
      jobCards.some(
        (jc) => jc.slotId === slot.id && jc.status === "Completed"
      )
    );

    setStats({
      total: userBookings.length,
      completed: completedBookings.length,
      upcoming: userBookings.length - completedBookings.length,
    });
  }, []);

  const actions = [
    {
      title: "Book Service",
      desc: "Schedule a new service",
      icon: "bi-calendar-plus",
      color: "primary",
      path: "/user/view",
    },
    {
      title: "Service History",
      desc: "View past services",
      icon: "bi-clock-history",
      color: "success",
      path: "/user/mybookings",
    },
    {
      title: "Bills & Payments",
      desc: "View invoices & charges",
      icon: "bi-receipt",
      color: "warning",
      path: "/user/bills",
    },
  ];

  return (
    <>
      <UserNavbar />

      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">

          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="fw-bold mb-2">Welcome Back!</h1>
            <p className="text-muted fs-5">
              Here’s a quick overview of your service activity
            </p>
          </div>

          {/* Stats Section */}
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 text-center p-4 bg-white rounded-4">
                <div className="mb-3">
                  <i className="bi bi-tools fs-1 text-primary"></i>
                </div>
                <h3 className="fw-bold">{stats.total}</h3>
                <p className="text-muted mb-0">Total Services</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 text-center p-4 bg-white rounded-4">
                <div className="mb-3">
                  <i className="bi bi-calendar-event fs-1 text-warning"></i>
                </div>
                <h3 className="fw-bold">{stats.upcoming}</h3>
                <p className="text-muted mb-0">Upcoming Services</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 text-center p-4 bg-white rounded-4">
                <div className="mb-3">
                  <i className="bi bi-check-circle fs-1 text-success"></i>
                </div>
                <h3 className="fw-bold">{stats.completed}</h3>
                <p className="text-muted mb-0">Completed Services</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <h4 className="fw-semibold mb-3">Quick Actions</h4>
          <div className="row g-4">
            {actions.map((item, index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card h-100 border-0 shadow-sm dashboard-action rounded-4 p-3`}
                  role="button"
                  onClick={() => nav(item.path)}
                >
                  <div className={`d-flex align-items-center mb-3 text-${item.color}`}>
                    <i className={`bi ${item.icon} fs-1`}></i>
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips / Info */}
          <div className="alert alert-info border-0 shadow-sm mt-5 rounded-4 d-flex align-items-center">
            <i className="bi bi-info-circle-fill me-2 fs-5"></i>
            <div>
              Keep your profile updated to receive timely reminders and notifications for upcoming services.
            </div>
          </div>

        </div>
      </div>

      {/* Hover & card effects */}
      <style>
        {`
          .dashboard-action {
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .dashboard-action:hover {
            transform: translateY(-5px);
            box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
          }
        `}
      </style>
    </>
  );
};

export default UserDashboard;
