import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const nav = useNavigate();

  return (
    <Navbar sticky="top" expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => nav("/user/dashboard")}
        >
          Dashboard
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link onClick={() => nav("/user/view")}>
              Book Service
            </Nav.Link>

            <Nav.Link onClick={() => nav("/user/mybookings")}>
              My Bookings
            </Nav.Link>

            <Nav.Link onClick={() => nav("/user/bills")}>
              Bills & Charges
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
              onClick={() => nav("/login")}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
