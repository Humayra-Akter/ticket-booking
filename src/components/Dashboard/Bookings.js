import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import auth from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";


const Bookings = () => {
const [user, loading, error] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/bookings/${user?.email}`
        );
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  if (!user) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
          {bookings.length === 0 && (
            <p className="text-gray-600">You haven't booked any events yet.</p>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-md overflow-hidden shadow-md mb-4"
              >
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {booking.event.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {booking.event.description}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Date: {booking.event.date}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Location: {booking.event.location}
                  </p>
                  {booking.event.free ? (
                    <p className="text-green-600 font-semibold">Free Event</p>
                  ) : (
                    <p className="text-red-600 font-semibold">
                      Paid Event: ${booking.event.price}
                    </p>
                  )}
                  <button
                    onClick={() => handleViewDetails(booking.event)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Bookings;