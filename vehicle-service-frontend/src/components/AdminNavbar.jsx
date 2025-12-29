import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import {Nav} from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'


const AdminNavbar = () => {
const nav = useNavigate();
  return (
    <Navbar sticky='top' expand='lg' className='shadow-sm bg-white' >
        <Container>
            <Navbar.Brand className='fw-bold' style={{background:"linear-gradient(90deg, #0d6efd, #6610f2)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",cursor:"pointer"}} onClick={()=>nav('/admin/dashboard')}>
                DashBoard
            </Navbar.Brand>
             <Navbar.Toggle/>
             <Navbar.Collapse>
                <Nav className="mx-auto">
                    <Nav.Link onClick={()=>nav('/admin/mechanics')}>Manage Mechanice</Nav.Link>
                    <Nav.Link onClick={()=>nav('/admin/slots')}>Create Slot</Nav.Link>
                    <Nav.Link onClick={()=>nav('/admin/booked-slots')}>Booked Slots</Nav.Link>
                    <Nav.Link onClick={()=>nav('/admin/job-cards')}>Job Card</Nav.Link>
                    <Nav.Link onClick={()=>nav('/admin/registered-users')}>Registered Users</Nav.Link>
                </Nav>
                <div className='d-flex gap-2'>
                <button className='btn btn-outline-primary d-flex gap-2 align-items-center px-3 py-2 rounded-pill' onClick={()=>nav('/login')}>
                    <i class="bi bi-box-arrow-right"></i>
                    Logout
                </button>
            </div>
             </Navbar.Collapse>
            
             
        </Container>
    </Navbar>
   
  )
}

export default AdminNavbar