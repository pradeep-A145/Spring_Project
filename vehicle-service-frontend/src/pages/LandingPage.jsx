import React from "react";
import AppNavbar from "../components/AppNavbar";
const LandingPage = () => {
  return (
    <>
      <AppNavbar />
      <section
        className="text-light py-5"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold display-5">
                Smart Vehicle <br /> Service Booking
              </h1>
              <p className="lead mt-3">
                Book service slots, track job cards, and manage vehicle services
                effortlessly.
              </p>
              <div className="mt-4">
                <button className="btn btn-light btn-lg me-3">
                  <i className="bi bi-calendar-check"></i> Book Service
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="bi bi-person"></i> Login
                </button>
              </div>
            </div>

            <div className="col-md-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1625047509168-a7026f36de04"
                  alt="Vehicle Service"
                  className="img-fluid hero-img py-2"
                  style={{
                    maxHeight: "420px",
                    maxWidth: "200%",
                    borderRadius: "20px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                />
              </div>

          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-2">Why Choose Us?</h2>
          <p className="text-muted mb-5">
            Everything you need to manage vehicle servicing in one place
          </p>

          <div className="row g-4">
            {[
              {
                icon: "bi-clock-history",
                title: "Service History",
                desc: "Access complete service records anytime.",
              },
              {
                icon: "bi-wrench-adjustable",
                title: "Expert Mechanics",
                desc: "Certified mechanics managed by admin.",
              },
              {
                icon: "bi-receipt",
                title: "Job Cards",
                desc: "Track job progress with digital job cards.",
              },
              {
                icon: "bi-currency-rupee",
                title: "Fair Pricing",
                desc: "Clear and transparent service charges.",
              },
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="card border-0 shadow-sm h-100 feature-card">
                  <div className="card-body text-center p-4">
                    <i
                      className={`bi ${item.icon} fs-1 text-primary`}
                    ></i>
                    <h5 className="mt-3">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">Popular Services</h2>

          <div className="row g-4">
            {[
              { icon: "bi-tools", title: "General Service" },
              { icon: "bi-car-front", title: "Engine Repair" },
              { icon: "bi-battery-charging", title: "Battery Service" },
              { icon: "bi-droplet-half", title: "Oil Change" },
            ].map((service, index) => (
              <div className="col-md-3" key={index}>
                <div className="card service-card border-0 shadow h-100">
                  <div className="card-body text-center p-4">
                    <i
                      className={`bi ${service.icon} fs-1 text-success`}
                    ></i>
                    <h5 className="mt-3">{service.title}</h5>
                    <button className="btn btn-outline-success mt-3">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">How It Works</h2>

          <div className="row g-4">
            {[
              { icon: "bi-person-plus", title: "Register" },
              { icon: "bi-calendar-event", title: "Book Slot" },
              { icon: "bi-tools", title: "Service" },
              { icon: "bi-receipt-cutoff", title: "View Bill" },
            ].map((step, index) => (
              <div className="col-md-3" key={index}>
                <div className="p-4 rounded shadow-sm bg-white h-100">
                  <i className={`bi ${step.icon} fs-1 text-primary`}></i>
                  <h6 className="mt-3">{step.title}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 text-center text-light bg-primary">
        <div className="container">
          <h2 className="fw-bold">Book Your Service Today</h2>
          <p className="mb-4">
            Save time and manage vehicle service with ease.
          </p>
          <button className="btn btn-light btn-lg">
            <i className="bi bi-arrow-right"></i> Get Started
          </button>
        </div>
      </section>

      <footer className="bg-dark text-white pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Vehicle Service System</h5>
              <p >
                A modern platform for vehicle service management.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled ">
                <li><i className="bi bi-chevron-right"></i> Home</li>
                <li><i className="bi bi-chevron-right"></i> Services</li>
                <li><i className="bi bi-chevron-right"></i> User Login</li>
                <li><i className="bi bi-chevron-right"></i> Admin Login</li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Contact</h5>
              <p className="">
                <i className="bi bi-geo-alt"></i> India
              </p>
              <p className="">
                <i className="bi bi-envelope"></i> support@vehicleservice.com
              </p>
            </div>
          </div>

          <hr className="text-secondary" />
          <div className="text-center pb-3">
            © 2025 Vehicle Service Booking System
          </div>
        </div>
      </footer>
    </>
  );
  
};
export default LandingPage;
