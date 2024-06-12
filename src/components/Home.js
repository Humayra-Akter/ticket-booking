import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Banner Section */}
      <div className="w-full bg-gray-800 text-white text-center py-8 mb-8 rounded">
        <h1 className="text-4xl font-bold">Welcome to EventMaster</h1>
        <p className="mt-4 text-xl">
          Your one-stop solution for booking events, both free and paid,
          seamlessly.
        </p>
      </div>

      {/* Sign Up/Login Button */}
      <div className="mt-8">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-gray-800 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Dashboard
          </Link>
        ) : (
          <></>
        )}
      </div>
      {/* Steps Section */}
      <div className="w-full max-w-4xl">
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
        {user ? (
          <button
            onClick={logout}
            className="bg-red-600 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
          >
            Sign Up / Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
