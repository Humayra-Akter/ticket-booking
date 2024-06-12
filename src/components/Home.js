import React, { useState } from "react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to the Ultimate Event Experience
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Join us for an unforgettable experience with live music, exciting
          performances, and much more. Get your tickets now and be part of the
          excitement!
        </p>
      </div>

      <div className="w-3/4 bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">How to Book Your Ticket</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Select the event you want to attend</li>
          <li>Choose your preferred seats</li>
          <li>Enter your details and proceed to payment</li>
          <li>Receive your ticket via email</li>
        </ol>
      </div>

      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Login / Signup
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">Login / Signup</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
