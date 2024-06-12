import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Event Booking</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">{event.name}</h2>
            <p>{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Location: {event.location}</p>
            <Link
              to={`/event/${event._id}`} 
              className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
