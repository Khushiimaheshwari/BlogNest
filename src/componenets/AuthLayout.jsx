import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();  // Track current location
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (loader) return;  // Prevent redirecting while loading
    
    if (authentication && authStatus !== authentication) {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    } else if (!authentication && authStatus !== authentication) {
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [authStatus, authentication, navigate, location, loader]);

  useEffect(() => {
    setTimeout(() => setLoader(false), 500);  // Add a small delay to let auth state settle
  }, []);

  return loader ? <Loader/> : <>{children}</>;
}

// EASY ONE
        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }