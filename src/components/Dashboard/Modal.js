import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";

const Modal = ({ isOpen, onClose, event }) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false);

  const handleToken = async (token) => {
    // Backend API integration to process payment with Stripe
    const response = await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        event,
      }),
    });

    // Handle response from backend
    const data = await response.json();
    console.log(data); // Log response from backend (success or error)

    // You can handle further actions based on the payment response
    // For example, show a success message or redirect to a confirmation page
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="mb-4">
              <p className="text-gray-600">Date: {event.date}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              {!event.free && (
                <p className="text-gray-600">Price: ${event.price}</p>
              )}
            </div>
            <div className="mb-4">
              <StripeCheckout
                token={handleToken}
                stripeKey="YOUR_STRIPE_PUBLIC_KEY"
                amount={event.price * 100} // Amount in cents
                currency="USD"
                name="Book Event"
                billingAddress={false}
              >
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center w-full ${
                    isPaymentLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isPaymentLoading}
                >
                  {isPaymentLoading ? "Processing..." : "Pay Now"}
                </button>
              </StripeCheckout>
            </div>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-center w-full"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
