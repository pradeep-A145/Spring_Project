import React from "react";
import {useNavigate} from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
const UserNavbar=()=>{
    const nav = useNavigate();
    return(
       <Navbar expand="lg" sticky="top" className="shadow-sm bg-white">
            <Container>
                <Navbar.Brand className="fw-bold" style={{background:"linear-gradient(90deg, #0d6efd, #6610f2)",
                    WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                    cursor:"pointer"
                }} onClick={()=>nav("/user/dashboard")}>
                    DashBoard
                </Navbar.Brand>
                
                <Navbar.Toggle/>

                <Navbar.Collapse>

                <Nav className="mx-auto">
                    <Nav.Link onClick={()=>nav('/user/view')}>Book Service</Nav.Link>
                    <Nav.Link onClick={()=>nav('/user/mybookings')}>My Bookings</Nav.Link>
                    <Nav.Link onClick={()=>nav('/user/bills')}>Bills & Charges</Nav.Link>
                    {/* <Nav.Link onClick={()=>nav('/user/history')}>History</Nav.Link> */}
                </Nav>

                <div class="d-flex gap-2">
                    <button class="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 rounded-pill " onClick={()=>nav('/login')}>
                        <i class="bi bi-box-arrow-right"></i>
                        Logout
                    </button>
                </div>

                </Navbar.Collapse>

            </Container>
       </Navbar>
    )
}
export default UserNavbar;