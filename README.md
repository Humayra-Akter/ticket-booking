Event Booking Application

##Overview
This project is a full-stack Event Booking Application where users can book events, both free and paid, using Stripe for payment processing. The application uses React for the frontend, Node.js/Express for the backend, and Firebase for user authentication.

##Features
User authentication with Firebase
Event listing with details
Stripe integration for payment processing
Booking functionality for both free and paid events

##Technologies
Frontend: React, React-Bootstrap, React-Firebase-Hooks, Stripe Checkout
Backend: Node.js, Express, Stripe API, MongoDB
Authentication: Firebase Authentication

##Usage
1.Creating an Account
Navigate to the login or registration page.
Register or log in using your email and password.

2.Browsing Events
Browse through the list of available events.
Click on an event to view more details.

3.Booking Events
For Free Events: Click the "Book Now" button.
For Paid Events: Click the "Pay Now" button, then proceed with the Stripe payment process.

4.Handling Payments
Ensure that you have a valid Stripe test or live account set up.
Use Stripe's test card numbers to simulate transactions.

##API Endpoints
1.Authentication
POST /auth/signup - Register a new user.
POST /auth/login - Log in an existing user.

2.Events
GET /events - List all events.
GET /events/:id - Get details of a specific event.

3.Booking
POST /booking - Create a booking for an event (both free and paid).

4.Payment
POST /payment - Process the payment using Stripe.
