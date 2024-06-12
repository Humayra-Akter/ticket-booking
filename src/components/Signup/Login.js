import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import auth from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      fetch(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => res.json())
        .then((userData) => {
          if (userData.length > 0) {
            toast.success("Login successful", { appearance: "success" });
            navigate("/dashboard"); // Redirect to dashboard
          } else {
            toast.error("User not found, please sign up", {
              appearance: "error",
            });
            navigate("/signup"); // Redirect to signup
          }
        });
    } catch (error) {
      toast.error(error.message, { appearance: "error" });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      fetch(`http://localhost:5000/user?email=${user.email}`)
        .then((res) => res.json())
        .then((userData) => {
          if (userData.length > 0) {
            toast.success("Login successful", { appearance: "success" });
            navigate("/dashboard"); // Redirect to dashboard
          } else {
            toast.error("User not found, please sign up", {
              appearance: "error",
            });
            navigate("/signup"); // Redirect to signup
          }
        });
    } catch (error) {
      toast.error(error.message, { appearance: "error" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-700"
            >
              Login with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
