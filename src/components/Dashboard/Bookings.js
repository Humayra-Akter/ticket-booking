import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Loading from "../Shared/Loading";
import auth from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

const Bookings = () => {
  const [user, loading, error] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(
        `https://ticket-booking-server-ocgh.onrender.com/bookings/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const uniqueBookings = Array.from(
              new Map(data.map((item) => [item.event._id, item])).values()
            );
            setBookings(uniqueBookings);
          } else {
            toast.warning(`No notifications for ${user.displayName}`);
          }
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [user]);

  const handleDownloadTicket = (event) => {
    const ticketData = `
      Event: ${event.name}
      Date: ${event.date}
      Location: ${event.location}
      Description: ${event.description}
    `;
    const blob = new Blob([ticketData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.name}_ticket.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error.message}</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        Please log in to see your bookings.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
          {bookings.length === 0 ? (
            <p className="text-gray-600">You haven't booked any events yet.</p>
          ) : (
            <div>
              {bookings.map((booking) => (
                <div
                  key={booking._id}
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
                    <div className="justify-end flex">
                      <button
                        onClick={() => handleDownloadTicket(booking.event)}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                      >
                        Download Ticket
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
