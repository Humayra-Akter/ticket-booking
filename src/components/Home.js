import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebaseConfig";
import { signOut } from "firebase/auth";
import AdminLoginModal from "./Signup/AdminLoginModal";

const Home = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");
    if (adminEmail) {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const adminLogout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminEmail");
    setIsAdminLoggedIn(false);
  };

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const handleAdminLogin = () => {
    setShowAdminLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Banner Section */}
      <div className="w-full bg-gray-800 text-white text-center py-8 mb-8 rounded">
        <h1 className="text-4xl font-bold">Welcome to Event-Master</h1>
        <p className="mt-4 text-xl">
          Your one-stop solution for booking events, both free and paid,
          seamlessly.
        </p>
      </div>
      {user ? (
        <>
          <Link
            to="/dashboard"
            className="bg-gray-800 w-40 text-center text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </>
      ) : (
        <></>
      )}{" "}
      {isAdminLoggedIn ? (
        <>
          <Link
            to="/adminDashboard"
            className="bg-gray-800 w-40 text-center text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </>
      ) : (
        <></>
      )}
      {/* Steps Section */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Get Started in 3 Easy Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded shadow-lg transform transition hover:scale-105">
            <h3 className="text-xl font-bold mb-2">1. Sign Up</h3>
            <p>Create your account to get started with booking events.</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg transform transition hover:scale-105">
            <h3 className="text-xl font-bold mb-2">2. Browse Events</h3>
            <p>Explore a wide range of events available for booking.</p>
          </div>
          <div className="bg-white p-6 rounded shadow-lg transform transition hover:scale-105">
            <h3 className="text-xl font-bold mb-2">3. Book & Enjoy</h3>
            <p>Select your event, book your tickets, and enjoy!</p>
          </div>
        </div>
      </div>
      {/* Sign Up/Login Button */}
      <div className="mt-8">
        {!user && !isAdminLoggedIn ? (
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 w-40 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Sign Up / Login
          </button>
        ) : null}
      </div>
      {/* Sign Out Button for User */}
      <div className="mt-8">
        {user && !isAdminLoggedIn && (
          <button
            onClick={logout}
            className="bg-red-600 w-40 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Sign Out
          </button>
        )}
      </div>
      {/* Admin Sign Out Button */}
      <div className="mt-8">
        {isAdminLoggedIn && (
          <button
            onClick={adminLogout}
            className="bg-red-600 w-40 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Admin Sign Out
          </button>
        )}
      </div>
      {/* Admin Login Button */}
      <div>
        {!user && !isAdminLoggedIn && (
          <button
            onClick={() => setShowAdminLoginModal(true)}
            className="bg-gray-800 w-40 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Admin Login
          </button>
        )}
      </div>
      {/* Admin Login Modal */}
      {showAdminLoginModal && (
        <AdminLoginModal
          onClose={() => setShowAdminLoginModal(false)}
          onAdminLogin={handleAdminLogin}
        />
      )}
    </div>
  );
};

export default Home;
