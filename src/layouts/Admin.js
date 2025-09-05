import React, { useEffect, useState } from "react";
import { Switch, Redirect, useHistory, useLocation } from "react-router-dom";
import {Route} from "react-router-dom";
import PrivateRoute from "views/auth/PrivateRoute.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Dashboard from "views/admin/Dashboard.js";
import AdminDashboard from "views/admin/adminDashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import Complaints from "components/Cards/Complaints.js";
import MyComplaints from "components/Cards/myComplaints.js";
import AdminComplaintsDashboard from "components/Cards/admincomplaints.js";
import Education from "components/Cards/Educationannouncemnt.js";
import Commercial from "components/Cards/commercial.js";
import Welfar from "components/Cards/welfare.js"
import other from "components/Cards/other.js"
import billedu from "components/Cards/bills/allbills"
import SchemeForm from "components/Cards/schmes/allschmes";
import SchemesPage from "components/Cards/schmes/final.js";
import UpdateBills from "components/Cards/bills/updatebills.js";
import Updateannouncement from "components/Cards/announcementupdate.js";
import Admin_doubt from "components/Cards/Doubt/Admin_doubt"
//Document 
import DocumentDetail from "components/Cards/document/DocumentDetail.js";
import Documentation from "components/Cards/document/Documentation.js";
import   AdminDocumentForm from  "components/Cards/document/AdminDocumentForm.js";
//profile 
import Profile from "views/Profile.js"
import ProfileEdit from "views/ProfileEdit"
export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const superUser = localStorage.getItem("is_superuser");
    const isSuper = superUser === "true";
    setIsAdmin(isSuper);

    if (location.pathname === "/admin") {
      history.replace(isSuper ? "/admin/admindashboard" : "/admin/dashboard");
    }
  }, [history, location.pathname]);

  return (
    <>
      {isAdmin ? <AdminSidebar /> : <Sidebar />}
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <PrivateRoute exact path="/admin/maps" component={Maps} />
            <PrivateRoute exact path="/admin/settings" component={Settings} />
            <Route exact path="/admin/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/admin/admindashboard" component={AdminDashboard} />
            <PrivateRoute exact path="/admin/complaints" component={Complaints} />
            <PrivateRoute exact path="/admin/mycomplaints" component={MyComplaints} />
            <PrivateRoute exact path="/admin/admincomplaints" component={AdminComplaintsDashboard} />
            <PrivateRoute exact path="/admin/education" component={Education} />
            <PrivateRoute exact path="/admin/commercial" component={Commercial} />
            <PrivateRoute exact path="/admin/welfare" component={Welfar} />
            <PrivateRoute exact path="/admin/other" component={other} />
            <PrivateRoute exact path="/admin/bills" component={billedu} />
            <PrivateRoute exact path="/admin/final" component={SchemesPage} />
            <PrivateRoute exact path="/admin/schemes" component={SchemeForm} />
            <PrivateRoute exact path="/admin/updatebills" component={UpdateBills} />
            <PrivateRoute exact path="/admin/updateannouncement" component={Updateannouncement} />    
            <PrivateRoute exact path="/admin/doubt" component={Admin_doubt} />
            <PrivateRoute exact path="/admin/ AdminDocumentForm" component={ AdminDocumentForm} />
            <PrivateRoute path="/admin/Documentation/:id" component={DocumentDetail} />
            <PrivateRoute exact path="/admin/Documentation" component={Documentation} />
             <PrivateRoute exact path="/admin/Profile" component={Profile} />
            <PrivateRoute exact path="/admin/Profile/edit" component={ProfileEdit} />
            <Redirect to={isAdmin ? "/admin/admindashboard" : "/admin/dashboard"} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
