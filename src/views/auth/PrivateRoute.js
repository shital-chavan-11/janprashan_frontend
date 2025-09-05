import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading, true = auth, false = not auth

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://janprashna-backend.onrender.com/api/auth/check/", {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (response.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>; // or spinner

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
