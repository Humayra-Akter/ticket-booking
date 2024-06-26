import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditEvent from "./EditEvent";
import EventDetailsModal from "./EventDetailsModal";
import { toast } from "react-toastify";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    fetch("https://ticket-booking-server-ocgh.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleSeeDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const openEditModal = (event) => {
    setEditEvent(event);
  };

  const closeEditModal = () => {
    setEditEvent(null);
  };

  const handleSaveEvent = (updatedEvent) => {
    fetch(
      `https://ticket-booking-server-ocgh.onrender.com/events/${updatedEvent._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const updatedEvents = events.map((event) =>
          event._id === data._id ? data : event
        );
        setEvents(updatedEvents);
        closeEditModal();
        toast.success("Event updated successfully");
      });
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      fetch(
        `https://ticket-booking-server-ocgh.onrender.com/events/${eventId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("Event deleted successfully");

          const updatedEvents = events.filter((event) => event._id !== eventId);
          setEvents(updatedEvents);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {events?.map((event) => (
          <div key={event._id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-bold mb-2">{event.name}</h2>
            <p>{event.description}</p>
            <p className="text-gray-500">Date: {event.date}</p>
            <p className="text-gray-500">Location: {event.location}</p>
            <div className="flex gap-2 justify-center mt-2">
              <button
                className="btn rounded bg-indigo-500 w-1/4 text-white"
                onClick={() => handleSeeDetails(event)}
              >
                See details
              </button>

              <>
                <button
                  className="btn w-1/4 rounded bg-green-600 text-white"
                  onClick={() => openEditModal(event)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-500 rounded text-white w-1/4"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete
                </button>
              </>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={handleCloseModal} />
      )}
      {editEvent && (
        <EditEvent
          event={editEvent}
          onClose={closeEditModal}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default AllEvents;
