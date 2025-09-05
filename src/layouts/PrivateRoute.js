// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://janprashna-backend.onrender.com/api/auth/check-login/", {
          method: "GET",
          credentials: "include", // ✅ include cookies
        });
        if (res.ok) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-center p-4">Checking authentication...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
}
