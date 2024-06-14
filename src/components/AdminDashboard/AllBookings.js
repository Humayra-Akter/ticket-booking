import React, { useEffect, useState } from "react";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("https://ticket-booking-server-ocgh.onrender.com/booking")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  console.log(bookings);

  return (
    <div className="container mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">All Bookings</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings?.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">{booking.event.name}</h2>
            <p>{booking.event.description}</p>
            <p className="text-gray-500">Date: {booking.event.date}</p>
            <p className="text-gray-500">Location: {booking.event.location}</p>
            <p className="text-gray-600">
              Free Event: {booking.event.free ? "Yes" : "No"}
            </p>
            {!booking.event.free && (
              <p className="text-gray-800">Price: ${booking.event.price}</p>
            )}
            <p className="text-gray-700 mt-2">
              Booked by: {booking.user.displayName || booking.user.email}
            </p>
            {booking.payment && (
              <div className="mt-2">
                <p className="text-gray-500">
                  Payment Status: {booking.payment.status}
                </p>
                <a
                  href={booking.payment.receipt_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Receipt
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
