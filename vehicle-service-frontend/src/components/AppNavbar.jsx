import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" sticky="top" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand
          className="fw-bold"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #6610f2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Vehicle Service
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          
          <div className="d-flex gap-2 ms-auto">
            <Button
              variant="outline-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="primary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
