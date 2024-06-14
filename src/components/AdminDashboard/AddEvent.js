import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const AddEvent = () => {
  const { register, handleSubmit, control, reset, watch } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "organizers",
  });
  const [isFree, setIsFree] = useState(false);

  const onSubmit = async (data) => {
    await fetch("https://ticket-booking-server-ocgh.onrender.com/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Event added successfully");
        reset();
        setIsFree(false);
      });
  };

  const handleFreeChange = (e) => {
    setIsFree(e.target.checked);
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 bg-gray-300 shadow-md rounded-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  placeholder="Event Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Event Description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  {...register("date", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  {...register("location", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  placeholder="Event Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Free Event
                </label>
                <input
                  {...register("free")}
                  type="checkbox"
                  onChange={handleFreeChange}
                />
              </div>

              {!isFree && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    {...register("price", { required: true })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="number"
                    placeholder="Event Price"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  {...register("capacity", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="number"
                  placeholder="Event Capacity"
                />
              </div>
            </div>

            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categories
                </label>
                <input
                  {...register("categories", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  placeholder="Categories (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Highlights
                </label>
                <textarea
                  {...register("highlights", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Highlights (comma separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Featured Artists/Speakers
                </label>
                <textarea
                  {...register("featured", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Featured Artists/Speakers (name and description, separated by semicolon)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Schedule
                </label>
                <textarea
                  {...register("schedule", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Schedule (time and event, separated by semicolon)"
                />
              </div>

              <div className="organizers">
                <label className="block text-sm font-medium text-gray-700">
                  Organizers
                </label>
                {fields.map((item, index) => (
                  <div key={item.id} className="mb-4">
                    <input
                      {...register(`organizers.${index}.name`, {
                        required: true,
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Organizer Name"
                    />
                    <input
                      {...register(`organizers.${index}.website`, {
                        required: true,
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Organizer Website"
                    />
                    <input
                      {...register(`organizers.${index}.contact.email`, {
                        required: true,
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Organizer Email"
                    />
                    <input
                      {...register(`organizers.${index}.contact.phone`, {
                        required: true,
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Organizer Phone"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      Remove Organizer
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      website: "",
                      contact: { email: "", phone: "" },
                    })
                  }
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Add Organizer
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
