import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Signup/Login";
import Signup from "./components/Signup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard/Dashboard";
import EventDetails from "./components/Dashboard/EventDetails";
import Bookings from "./components/Dashboard/Bookings";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import RequireAuth from "./components/Signup/RequireAuth";
import AddAdmin from "./components/AdminDashboard/AddAdmin";
import AllBookings from "./components/AdminDashboard/AllBookings";
import RequireAdmin from "./components/Signup/RequireAdmin";
import AllEvents from "./components/AdminDashboard/AllEvents";
import EditEvent from "./components/AdminDashboard/EditEvent";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <RequireAuth>
              <Bookings />
            </RequireAuth>
          }
        />{" "}
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />{" "}
        <Route path="/adminDashboard/admin" element={<AddAdmin />} />{" "}
        <Route path="/adminDashboard/events" element={<AllEvents />} />{" "}
        <Route path="/adminDashboard/bookings" element={<AllBookings />} />{" "}
        <Route path="/adminDashboard/editEvent/:id" element={<EditEvent />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
