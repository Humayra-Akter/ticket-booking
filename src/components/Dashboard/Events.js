import React from "react";

const Events = ({ events }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event) => (
          <div key={event.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">{event.name}</h2>
            <p>{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
