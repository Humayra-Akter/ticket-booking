// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2wF2kNCfGQyrqGl_p9OtPz1OC837ZdeU",
  authDomain: "ticket-booking-7fe22.firebaseapp.com",
  projectId: "ticket-booking-7fe22",
  storageBucket: "ticket-booking-7fe22.appspot.com",
  messagingSenderId: "848743573938",
  appId: "1:848743573938:web:0f8b9e8c9840433567dcab",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
