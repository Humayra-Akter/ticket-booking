import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebaseConfig";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Shared/Loading";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const RequireAdminAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === "admin");
        }
      }
      setCheckingRole(false);
    };
    checkAdminRole();
  }, [user]);

  if (loading || checkingRole) {
    return <Loading />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdminAuth;
