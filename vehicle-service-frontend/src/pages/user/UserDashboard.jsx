import React from "react";
import UserNavbar from "../../components/UserNavbar";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const nav = useNavigate();

  const stats = [
    {
      label: "Total Services",
      value: 12,
      icon: "bi-tools",
      color: "primary",
    },
    {
      label: "Upcoming Services",
      value: 2,
      icon: "bi-calendar-event",
      color: "warning",
    },
    {
      label: "Completed",
      value: 10,
      icon: "bi-check-circle",
      color: "success",
    },
  ];

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

      <div className="container-fluid bg-light min-vh-100 py-4">
        <div className="container">

          {/* Header */}
          <div className="mb-4">
            <h2 className="fw-bold">Dashboard</h2>
            <p className="text-muted mb-0">
              Overview of your service activity
            </p>
          </div>

          {/* Stats Section */}
          <div className="row g-4 mb-5">
            {stats.map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center">
                    <div
                      className={`bg-${item.color} bg-opacity-10 text-${item.color} rounded-circle p-3 me-3`}
                    >
                      <i className={`bi ${item.icon} fs-4`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-0">{item.value}</h4>
                      <small className="text-muted">{item.label}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions Section */}
          <h5 className="fw-semibold mb-3">Quick Actions</h5>
          <div className="row g-4">
            {actions.map((item, index) => (
              <div key={index} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm dashboard-action"
                  role="button"
                  onClick={() => nav(item.path)}
                >
                  <div className="card-body">
                    <div
                      className={`text-${item.color} mb-3`}
                    >
                      <i className={`bi ${item.icon} fs-2`}></i>
                    </div>
                    <h6 className="fw-semibold">{item.title}</h6>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="alert alert-info border-0 shadow-sm mt-5">
            <i className="bi bi-info-circle-fill me-2"></i>
            Tip: Keep your profile updated to receive service reminders.
          </div>

        </div>
      </div>

      {/* Dashboard Hover Effects */}
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
