import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebaseConfig";
import BackHome from "../Shared/BackHome";
import AllBookings from "./AllBookings";
import AddEvent from "./AddEvent";
import AddAdmin from "./AddAdmin";
import AllEvents from "./AllEvents";
import EditEvent from "./EditEvent";

const AdminDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("event");
  const [user] = useAuthState(auth);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 max-h-screen text-white w-64 flex flex-col">
        <div className="p-4 bg-gray-900 text-xl font-bold">Admin</div>

        <div className="flex-1 overflow-y-auto">
          <ul>
            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "event" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("event")}
            >
              <Link to="/adminDashboard">Events</Link>
            </li>
            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "admin" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("admin")}
            >
              <Link to="/adminDashboard/admin">Add Admin</Link>
            </li>{" "}
            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "events" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("events")}
            >
              <Link to="/adminDashboard/events">All Events</Link>
            </li>{" "}
            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "bookings" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("bookings")}
            >
              <Link to="/adminDashboard/bookings">Bookings</Link>
            </li>
          </ul>
        </div>
        <BackHome />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {selectedMenuItem === "event" && <AddEvent />}
        {selectedMenuItem === "admin" && <AddAdmin />}
        {selectedMenuItem === "events" && <AllEvents />}
        {selectedMenuItem === "bookings" && <AllBookings />}
      </div>
    </div>
  );
};

export default AdminDashboard;
