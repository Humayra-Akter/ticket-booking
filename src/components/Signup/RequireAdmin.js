import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Shared/Loading";

const RequireAdmin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const adminEmail = localStorage.getItem("adminEmail");
    const token = localStorage.getItem("token");

    if (adminEmail && token) {
      fetch(
        `https://ticket-booking-server-ocgh.onrender.com/admin?email=${adminEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0 && data[0].email === adminEmail) {
            setIsAdmin(true);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
