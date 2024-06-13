import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    free: false,
    price: 0,
    capacity: 0,
    categories: [""],
    organizer: {
      name: "",
      contact: "",
    },
    highlights: [""],
    featuredSpeakers: [""],
    schedule: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEventData({
        ...eventData,
        [name]: checked,
      });
    } else if (
      name.startsWith("highlight") ||
      name.startsWith("speaker") ||
      name.startsWith("schedule") ||
      name.startsWith("category")
    ) {
      const [field, index] = name.split("_");
      const updatedArray = [...eventData[field]];
      updatedArray[parseInt(index, 10)] = value;
      setEventData({
        ...eventData,
        [field]: updatedArray,
      });
    } else if (name.startsWith("organizer")) {
      const [field, subField] = name.split("_");
      setEventData({
        ...eventData,
        [field]: {
          ...eventData[field],
          [subField]: value,
        },
      });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

  const handleAddField = (field) => {
    setEventData({
      ...eventData,
      [field]: [...eventData[field], ""],
    });
  };

  const handleRemoveField = (field, index) => {
    const updatedArray = [...eventData[field]];
    updatedArray.splice(index, 1);
    setEventData({
      ...eventData,
      [field]: updatedArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Event added successfully");
        setEventData({
          name: "",
          description: "",
          date: "",
          location: "",
          free: false,
          price: 0,
          capacity: 0,
          categories: [""],
          organizer: {
            name: "",
            contact: "",
          },
          highlights: [""],
          featuredSpeakers: [""],
          schedule: [""],
        });
      })
      .catch((error) => {
        toast.error("Error adding event");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl w-full bg-gray-300 shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Free
                  </label>
                  <input
                    type="checkbox"
                    name="free"
                    className="mt-1"
                    checked={eventData.free}
                    onChange={handleChange}
                  />
                </div>
                {!eventData.free && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={eventData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.capacity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  {eventData.categories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        name={`category_${index}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={category}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveField("categories", index)}
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddField("categories")}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add Category
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Organizer
                  </label>
                  <input
                    type="text"
                    name="organizer_name"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.organizer.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="organizer_contact"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={eventData.organizer.contact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Highlights
                  </label>
                  {eventData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        name={`highlight_${index}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={highlight}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveField("highlights", index)}
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddField("highlights")}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add Highlight
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Featured Speakers
                  </label>
                  {eventData.featuredSpeakers.map((speaker, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        name={`speaker_${index}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={speaker}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveField("featuredSpeakers", index)
                        }
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddField("featuredSpeakers")}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add Speaker
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Schedule
                  </label>
                  {eventData.schedule.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        name={`schedule_${index}`}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={item}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveField("schedule", index)}
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      >
                        -
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddField("schedule")}
                    className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add Schedule Item
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded shadow-lg transform transition hover:bg-blue-700"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;

