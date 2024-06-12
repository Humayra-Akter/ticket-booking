import React from "react";

const Bookings = ({ bookings }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
      <ul>
        {bookings?.map((booking) => (
          <li
            key={booking.id}
            className="bg-white shadow-md rounded-md p-4 mb-4"
          >
            <p>
              <strong>Event:</strong> {booking.event}
            </p>
            <p>
              <strong>Date:</strong> {booking.date}
            </p>
            <p>
              <strong>Quantity:</strong> {booking.quantity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
