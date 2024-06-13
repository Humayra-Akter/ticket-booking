import React, { useState } from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import Bookings from "./Bookings";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebaseConfig";
import BackHome from "../Shared/BackHome";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("home");
  const [user] = useAuthState(auth);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 flex flex-col">
        <div className="p-4 bg-gray-900 text-xl font-bold">Dashboard</div>

        <div className="flex-1 overflow-y-auto">
          <ul>
            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "home" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("home")}
            >
              <Link to="/dashboard">Events</Link>
            </li>

            <li
              className={`p-4 cursor-pointer ${
                selectedMenuItem === "bookings" && "bg-gray-700"
              }`}
              onClick={() => handleMenuItemClick("bookings")}
            >
              <Link to="/dashboard/bookings">Bookings</Link>
            </li>
          </ul>
        </div>
        <BackHome />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {selectedMenuItem === "home" && <Home />}
        {selectedMenuItem === "bookings" && <Bookings />}
      </div>
    </div>
  );
};

export default Dashboard;
