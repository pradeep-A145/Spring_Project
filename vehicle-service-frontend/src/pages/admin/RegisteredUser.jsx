import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const RegisteredUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const location = useLocation();

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    // Filter out the admin user
    const nonAdminUsers = storedUsers.filter(user => user.email !== "admin@gmail.com");
    setUsers(nonAdminUsers);
  }, [location.pathname]);

  // Remove user by email
  const removeUser = (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);

    // Also update localStorage including admin
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const remainingUsers = allUsers.filter(user => user.email !== email);
    localStorage.setItem("users", JSON.stringify(remainingUsers));
  };

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(search.toLowerCase())) ||
    (user.phone && user.phone.includes(search))
  );

  return (
    <>
      <AdminNavbar />
      <div className="container py-4">
        <h2 className="mb-4 text-center">Registered Users</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-responsive shadow-sm">
          <table className="table table-bordered table-hover table-striped align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.email}>
                    <td>{user.name || "-"}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || "-"}</td>
                    <td>{user.city || "-"}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeUser(user.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RegisteredUser;
