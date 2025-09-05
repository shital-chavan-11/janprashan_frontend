import React from "react";
import ReactDOM from "react-dom/client"; // React 18
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import "./i18n"; // initialize i18next

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

// private route
import PrivateRoute from "views/auth/PrivateRoute.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {/* Protected routes */}
        <Route path="/admin" component={Admin} />
        <PrivateRoute path="/profile" component={Profile} />

        {/* Public routes */}
        <Route path="/auth" component={Auth} />
        <Route path="/landing" exact component={Landing} />
        <Route path="/" exact component={Index} />

        {/* Redirect all other paths */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);
