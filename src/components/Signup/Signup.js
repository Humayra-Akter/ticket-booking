import React from "react";
import { useForm } from "react-hook-form";
import auth from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import BackHome from "../Shared/BackHome";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.success("Passwords do not match", { appearance: "error" });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success("User signed up successfully", {
            appearance: "success",
          });
          navigate("/login");
        });
    } catch (error) {
      toast.error(error.message, { appearance: "error" });
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      toast.success("User signed up with Google successfully", {
        appearance: "success",
      });
    } catch (error) {
      toast.error(error.message, { appearance: "error" });
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full bg-gray-800 text-white text-center py-8 mb-8 rounded">
        <h1 className="text-4xl font-bold">Welcome to Event-Master</h1>
        <p className="mt-4 text-xl">
          Your one-stop solution for booking events, both free and paid,
          seamlessly.
        </p>
      </div>
      <div className="max-h-screen flex justify-center items-center ">
        <div className="max-w-md w-full p-8 bg-gray-300 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                id="name"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                type="password"
                id="confirmPassword"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  Please confirm your password
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700"
              >
                Sign Up
              </button>
              <button
                onClick={handleGoogleSignup}
                type="button"
                className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700"
              >
                Sign Up with Google
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mt-3">
            <Link to="/login" className="text-blue-600 font-bold  underline">
              Login account
            </Link>
          </div>
        </div>
        <BackHome />
      </div>
    </div>
  );
};

export default Signup;
