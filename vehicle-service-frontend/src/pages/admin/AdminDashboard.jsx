import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    mechanics: 0,
    slots: 0,
    completedJobs: 0,
    upcomingJobs: 0,
  });

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const mechanics = JSON.parse(localStorage.getItem("mechanics")) || [];
    const slots = JSON.parse(localStorage.getItem("slots")) || [];
    const jobCards = JSON.parse(localStorage.getItem("jobCards")) || [];

    setStats({
      users: users.length,
      mechanics: mechanics.length,
      slots: slots.length,
      completedJobs: jobCards.filter((j) => j.status === "Completed").length,
      upcomingJobs: jobCards.filter((j) => j.status === "Open").length,
    });
  }, []);

  const dashboardActions = [
    { title: "Manage Mechanics", desc: "Add or remove mechanics", icon: "bi-tools", color: "primary", path: "/admin/mechanics" },
    { title: "Manage Slots", desc: "Create service slots", icon: "bi-calendar-check", color: "success", path: "/admin/slots" },
    { title: "Job Cards", desc: "Track service jobs", icon: "bi-clipboard-data", color: "warning", path: "/admin/job-cards" },
    { title: "Registered Users", desc: "View all registered users", icon: "bi-people", color: "info", path: "/admin/registered-users" },
    { title: "History", desc: "Track service history", icon: "bi-clock-history", color: "secondary", path: "/admin/history" },
  ];

  return (
    <>
      <AdminNavbar />

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Admin Dashboard</h2>
          <p className="text-muted">Monitor and manage all system operations</p>
        </div>

        {/* Top Stats */}
        <div className="row g-4 mb-5">
          {[
            { label: "Users", value: stats.users, icon: "bi-people-fill", color: "primary" },
            { label: "Mechanics", value: stats.mechanics, icon: "bi-gear-fill", color: "success" },
            { label: "Slots", value: stats.slots, icon: "bi-calendar-event-fill", color: "warning" },
            { label: "Completed Jobs", value: stats.completedJobs, icon: "bi-check-circle-fill", color: "success" },
            { label: "Upcoming Jobs", value: stats.upcomingJobs, icon: "bi-hourglass-split", color: "warning" },
          ].map((stat, idx) => (
            <div key={idx} className="col-lg-2 col-md-4 col-sm-6">
              <div className="card shadow-sm rounded-4 text-center p-3 hover-card transition">
                <div className={`fs-2 mb-2 text-${stat.color}`}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
                <h5 className="fw-bold">{stat.value}</h5>
                <p className="text-muted small mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <h5 className="mb-3">Quick Actions</h5>
        <div className="row g-4">
          {dashboardActions.map((item, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 col-sm-12">
              <div
                className={`card h-100 rounded-4 shadow-sm action-card p-4 text-center transition`}
                role="button"
                onClick={() => navigate(item.path)}
              >
                <div className={`fs-2 mb-3 text-${item.color}`}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-muted small mb-3">{item.desc}</p>
                <button
                  className={`btn btn-${item.color} rounded-pill btn-sm`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(item.path);
                  }}
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for hover effects */}
      <style>{`
        .hover-card:hover, .action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
        .transition {
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AdminDashboard;
