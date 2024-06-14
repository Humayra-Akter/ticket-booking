import React, { useState } from "react";

const EditEvent = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    _id: event._id,
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    free: event.free,
    price: event.price,
    capacity: event.capacity,
    categories: event.categories,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Ensure formData includes _id
    onClose();
  };
  return (
    <div className="container mx-auto p-6 fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-300 shadow-md rounded-lg p-4 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Event Name"
            className="w-full mb-4 p-2 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full mb-4 p-2 border rounded"
          />
          <label>
            Free Event:
            <input
              type="checkbox"
              name="free"
              checked={formData.free}
              onChange={() =>
                setFormData({ ...formData, free: !formData.free })
              }
              className="ml-2"
            />
          </label>
          {!formData.free && (
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full mb-4 p-2 border rounded"
            />
          )}
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            placeholder="Capacity"
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Categories"
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
