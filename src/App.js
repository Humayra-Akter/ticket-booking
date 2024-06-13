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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/dashboard/bookings" element={<Bookings />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
