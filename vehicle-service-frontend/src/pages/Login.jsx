// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AppNavbar from "../components/AppNavbar";
// import { Link } from "react-router-dom";
// const Login = () => {

//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setLoginData({ ...loginData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     if (
//       loginData.email === "admin@vehicleservice.com" &&
//       loginData.password === "admin123"
//     ) {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/user/dashboard");
//     }
//   };

//   return (

//     <>
//         <AppNavbar />
   
//     <div className="container py-5">
   
//       <div className="row justify-content-center">
//         <div className="col-md-4">
//           <div className="card shadow p-4">
//             <h3 className="text-center mb-4">Login</h3>

//             <form onSubmit={handleLogin}>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   required
//                   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-3">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control"
//                   required
//                   onChange={handleChange}
//                 />
//               </div>

//               <button className="btn btn-primary w-100">
//                 Login
//               </button>
//               <p className="py-3">
//                 Don't have an account?{' '}
//                 <Link to="/register">Click Here!</Link>
//               </p>
//             </form>

//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Automatically add default admin if it doesn't exist
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(u => u.email === "admin@gmail.com");

    if (!adminExists) {
      users.push({ email: "admin@gmail.com", password: "admin123" });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      toast.error("Invalid email or password ❌");
      return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    toast.success("Login successful 🎉");

    setTimeout(() => {
      if (user.email === "admin@gmail.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    }, 1200);
  };

  return (
    <>
      <AppNavbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
          <h3 className="text-center fw-bold mb-3">Welcome Back </h3>
          <p className="text-center text-muted mb-4">
            Please login to your account
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-primary w-100 py-2 fw-semibold">
              Login
            </button>
          </form>

          <p className="text-center mt-4 mb-0">
            New user?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
