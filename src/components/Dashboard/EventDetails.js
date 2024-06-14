import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "./Modal";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://ticket-booking-server-ocgh.onrender.com/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [id]);

  if (!event) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="mb-4">
            <p className="text-gray-600">Date: {event.date}</p>
            <p className="text-gray-600">Location: {event.location}</p>
            <p className="text-gray-600">
              Free Event: {event.free ? "Yes" : "No"}
            </p>
            {!event.free && (
              <p className="text-gray-600">Price: ${event.price}</p>
            )}
            <p className="text-gray-600">Capacity: {event.capacity}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Highlights:</h2>
            <ul className="list-disc list-inside text-gray-600">
              {event.highlights?.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Featured Performers:</h2>
            <ul className="list-disc list-inside text-gray-600">
              {event.featuredPerformers?.map((performer, index) => (
                <li key={index}>
                  <strong>{performer.name}</strong> ({performer.genre}) -{" "}
                  {performer.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Schedule:</h2>
            <ul className="list-disc list-inside text-gray-600">
              {event?.schedule?.map((item, index) => (
                <li key={index}>
                  <strong>{item.time}</strong> - {item.event}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center"
            >
              Book Now
            </button>
            <Link
              to="/dashboard"
              className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        event={event}
      />
    </div>
  );
};

export default EventDetails;
