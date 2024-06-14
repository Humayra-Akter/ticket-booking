import React from "react";

const EventDetailsModal = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">{event.name}</h2>
        <p>{event.description}</p>
        <p className="text-gray-500">Date: {event.date}</p>
        <p className="text-gray-500">Location: {event.location}</p>
        <p className="text-gray-600">Free Event: {event.free ? "Yes" : "No"}</p>
        {!event.free && <p className="text-gray-800">Price: ${event.price}</p>}
        <p className="text-gray-600">Capacity: {event.capacity}</p>
        <p className="text-gray-600">
          Categories:{" "}
          {Array.isArray(event?.categories)
            ? event.categories.join(", ")
            : event.categories}
        </p>

        <div className="mt-2">
          <h3 className="font-semibold">Featured Artists/Speakers:</h3>
          <ul className="list-disc list-inside">
            {event?.featuredArtists?.map((artist, index) => (
              <li key={index}>
                <strong>{artist.name}</strong> - {artist.description}
              </li>
            ))}
            {event?.featuredSpeakers?.map((speaker, index) => (
              <li key={index}>
                <strong>{speaker.name}</strong> - {speaker.bio}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2">
          <h3 className="font-semibold">Organizers:</h3>
          {event?.organizer && (
            <div>
              <p>
                <strong>{event.organizer.name}</strong>
              </p>
              <p>
                Website:{" "}
                <a href={event.organizer.website} className="text-blue-500">
                  {event.organizer.website}
                </a>
              </p>
              <p>Email: {event.organizer.contact.email}</p>
              <p>Phone: {event.organizer.contact.phone}</p>
            </div>
          )}
          {event?.organizers?.map((org, index) => (
            <div key={index}>
              <p>
                <strong>{org.name}</strong>
              </p>
              <p>
                Website:{" "}
                <a href={org.website} className="text-blue-500">
                  {org.website}
                </a>
              </p>
              <p>Email: {org.contact.email}</p>
              <p>Phone: {org.contact.phone}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center mt-2">
          <button
            className="btn rounded bg-green-600 w-1/4 text-white"
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
