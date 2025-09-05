import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import ForgotPassword from "views/auth/forgot.js";
// views
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import OtpVerification from "views/auth/OtpVerification.js";
import Logout from "views/auth/Logout.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
         <section className="relative w-full h-full py-8 min-h-screen bg-blueGray-800">
          <div className="w-[90vw] h-[85vh] max-w-[900px] max-h-[800px] p-6 -mt-5">
            {/* You can optionally include an image or background here */}
          </div>



          {/* Routes (on top of background) */}
          <div className="relative z-10">
            <Switch>
              <Route path="/auth/login" exact component={Login} />
              <Route path="/auth/logout" exact component={Logout} />
              <Route path="/auth/register" exact component={Register} />
              <Route path="/auth/otp-verification" exact component={OtpVerification} />
              <Route path="/auth/forget" exact component={ForgotPassword} />
              <Redirect from="/auth" to="/auth/login" />
            </Switch>
          </div>

          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}