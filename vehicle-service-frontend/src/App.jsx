import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import RegisteredUser from "./pages/admin/RegisteredUser";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageMechanics from "./pages/admin/ManageMechanics";
import ManageSlots from "./pages/admin/ManageSlots";
import ViewSlots from "./pages/user/ViewSlots";
import MyBookings from "./pages/user/MyBookings";
import AdminBookingHistory from "./pages/admin/AdminBookingHistory";
import MyBills from "./pages/user/MyBills";
import AdminBookedSlots from "./pages/admin/AdminBookedSlots";
import ViewBookedUser from "./pages/admin/ViewBookedUser";
import JobCardList from "./pages/admin/JobCardList";
import CreateJobCard from "./pages/admin/CreateJobCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/view" element={<ViewSlots />} />
      <Route path="/user/mybookings" element={<MyBookings />} />
      <Route path="/user/bills" element={<MyBills />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/registered-users" element={<RegisteredUser />} />
      <Route path="/admin/mechanics" element={<ManageMechanics />} />
      <Route path="/admin/slots" element={<ManageSlots />} />
      <Route path="/admin/history" element={<AdminBookingHistory />} />
      <Route path="/admin/booked-slots" element={<AdminBookedSlots />} />
      <Route path="/admin/view-booking/:id" element={<ViewBookedUser />} />
      <Route path="/admin/create-job-card/:id" element={<CreateJobCard />} />
      <Route path="/admin/job-cards" element={<JobCardList />} />
    </Routes>
  );
}

export default App;
