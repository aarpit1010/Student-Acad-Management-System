import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/leftpane";

import AcademicRegistration from "./pages/acad-registration";
import Certificates from "./pages/certificates";
import CourseSummary from "./pages/course-summary";
import Dashboard from "./components/dashboard/dashboard";
import Faculty from "./pages/faculty";
import SemwiseCourses from "./pages/semwise-courses";
import Login from "./pages/login";
import Register from "./pages/registration";
import Profile from "./pages/profile";

import SelectUser from "./pages/user-selection";
import EditStudentProfile from "./admin-pages/editStudentProfile";
import Message from "./components/email/Message";
import Announcements from "./admin-pages/announcements";
// import FilesUploadComponent from './components/files-upload-component';

import Navbar from "./components/navbar/navbar";
import Auth from "./auth/Auth";

import ProtectedRoute from "./auth/ProtectedRoute";

import { Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin-pages/admin-dashboard";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/selectUser" component={SelectUser} />

        <Route
          exact
          path="/editStudentProfile"
          component={EditStudentProfile}
        />
        <Route exact path="/announcements" component={Announcements} />
        <Route exact path="/adminDashboard" component={AdminDashboard} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/">
          <div className="App">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-sm-2 sidebar p-0">
                  <Sidebar />
                </div>
                <div className="col-sm-10 p-0">
                  <div className="row m-0">
                    <div className="col p-0">
                      <Navbar hasAuth={Auth.isAuthenticated()} />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col main-col">
                      <ProtectedRoute exact path="/" component={Dashboard} />
                      <ProtectedRoute
                        exact
                        path="/academic-registration"
                        component={AcademicRegistration}
                      />
                      <ProtectedRoute
                        exact
                        path="/certificates"
                        component={Certificates}
                      />
                      <ProtectedRoute
                        exact
                        path="/course-summary"
                        component={CourseSummary}
                      />
                      <ProtectedRoute
                        exact
                        path="/faculty"
                        component={Faculty}
                      />
                      <ProtectedRoute
                        exact
                        path="/semwise-courses"
                        component={SemwiseCourses}
                      />
                      <ProtectedRoute
                        exact
                        path="/profile"
                        component={Profile}
                      />
                      <Route exact path="/student/send" component={Message} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ;
        </Route>
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

{
  /* 
      <Navbar hasAuth={Auth.isAuthenticated()} />
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-2 sidebar">
                  <Sidebar />
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col components">
                      <ProtectedRoute exact path="/" component={Dashboard} />
                      <ProtectedRoute
                        exact
                        path="/academic-registration"
                        component={AcademicRegistration}
                      />
                      <ProtectedRoute
                        exact
                        path="/certificates"
                        component={Certificates}
                      />
                      <ProtectedRoute
                        exact
                        path="/course-summary"
                        component={CourseSummary}
                      />
                      <ProtectedRoute
                        exact
                        path="/faculty"
                        component={Faculty}
                      />
                      <ProtectedRoute
                        exact
                        path="/semwise-courses"
                        component={SemwiseCourses}
                      />
                      <ProtectedRoute
                        exact
                        path="/profile"
                        component={Profile}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
*/
}
