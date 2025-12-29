// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AppNavbar from "../components/AppNavbar";

// const Register = () => {
//   const nav = useNavigate();

//   const [users, setUsers] = useState([]);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [city, setCity] = useState("");
//   const [vehicleNumber, setVehicleNumber] = useState("");
//   const [password, setPassword] = useState("");

//   // Load users ONCE
//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     setUsers(storedUsers);
//   }, []);

//   const handleRegister = (e) => {
//     e.preventDefault();

//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

//     // Prevent duplicate email
//     const emailExists = storedUsers.some(user => user.email === email);
//     if (emailExists) {
//       alert("Email already registered!");
//       return;
//     }

//     const newUser = {
//       name,
//       email,
//       mobile,
//       city,
//       vehicleNumber,
//       password
//     };

//     const updatedUsers = [...storedUsers, newUser];

//     // ✅ Save appended users
//     localStorage.setItem("users", JSON.stringify(updatedUsers));

//     alert("Registration Successful!");

//     // Reset form
//     setName("");
//     setEmail("");
//     setMobile("");
//     setCity("");
//     setVehicleNumber("");
//     setPassword("");

//     nav("/login");
//   };

//   return (
//     <>
//       <AppNavbar />
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-5">
//             <div className="card shadow p-4">
//               <h3 className="text-center mb-4">User Registration</h3>

//               <form onSubmit={handleRegister}>
//                 <div className="mb-3">
//                   <label>Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={name}
//                     required
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>Email</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={email}
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>Mobile Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     value={mobile}
//                     required
//                     onChange={(e) => setMobile(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>City</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={city}
//                     required
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>Vehicle Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={vehicleNumber}
//                     required
//                     onChange={(e) => setVehicleNumber(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     value={password}
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <button className="btn btn-success w-100">
//                   Register
//                 </button>
//               </form>

//               <p className="text-center mt-3">
//                 Already have an account? <Link to="/login">Login</Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;


import React, { useState } from "react";
import AppNavbar from "../components/AppNavbar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === form.email)) {
      toast.error("User already exists ❌");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Registration successful 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <AppNavbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card shadow-lg p-4"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <h3 className="text-center fw-bold mb-3">Create Account</h3>
          <p className="text-center text-muted mb-4">
            Fill in the details to get started
          </p>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                className="form-control"
                name="name"
                placeholder="Enter your name"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                name="password"
                type="password"
                placeholder="Create a password"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                className="form-control"
                name="phone"
                placeholder="Enter phone number"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">City</label>
              <input
                className="form-control"
                name="city"
                placeholder="Enter city"
                required
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success w-100 py-2 fw-semibold">
              Register
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            Already have an account?{" "}
            <span
              className="fw-semibold text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
