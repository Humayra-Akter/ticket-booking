import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLoginModal = ({ onClose, onAdminLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    fetch(
      `https://ticket-booking-server-ocgh.onrender.com/admin?email=${email}`
    )
      .then((res) => res.json())
      .then((adminData) => {
        const admin = adminData.find((admin) => admin?.email === email);

        if (admin) {
          if (admin?.password === password) {
            toast.success("Login successful", { appearance: "success" });
            localStorage.setItem("adminEmail", admin.email);
            onAdminLogin(admin);
            onClose();
            navigate("/adminDashboard");
          } else {
            toast.error("Incorrect password", { appearance: "error" });
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-md text-center w-full hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md text-center w-full mt-2 hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminLoginModal;
