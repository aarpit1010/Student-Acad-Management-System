import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/leftpane";

import AcademicRegistration from "./pages/acad-registration";
import Certificates from "./pages/certificates";
import CourseSummary from "./pages/course-summary";
import Dashboard from "./components/dashboard/dashboard";
import Faculty from "./pages/faculty";
import SemwiseCourses from "./pages/semwise-courses";
import Register from "./pages/registration";
import Profile from "./pages/profile";
import AdminNav from "./admin-pages/adminNav";
import AcademicCalendar from "./admin-pages/academicCalendar";
import Notifications from "./pages/notifications";

import SelectUser from "./pages/user-selection";
import EditStudentProfile from "./admin-pages/editStudentProfile";
import Message from "./components/email/Message";
import Announcements from "./admin-pages/announcements";
import Logs from "./admin-pages/logs";

import Navbar from "./components/navbar/navbar";
import Auth from "./auth/Auth";

import StudentProtectedRoute from "./auth/StudentProtectedRoute";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";

import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin-pages/adminDashboard";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/selectUser" component={SelectUser} />
        <Route path="/admin">
          <AdminNav hasAuth={Auth.isAuthenticatedStudent()} />
          <AdminProtectedRoute
            exact
            path="/admin/adminDashboard"
            component={AdminDashboard}
          />
          <AdminProtectedRoute
            exact
            path="/admin/editStudentProfile"
            component={EditStudentProfile}
          />
          <AdminProtectedRoute
            exact
            path="/admin/announcements"
            component={Announcements}
          />
          <AdminProtectedRoute
            exact
            path="/admin/academicCalendar"
            component={AcademicCalendar}
          />
          <AdminProtectedRoute exact path="/admin/logs" component={Logs} />

          <Route path="/admin/*">
            <Redirect to="/admin/adminDashboard" />
          </Route>
        </Route>

        <Route exact path="/register" component={Register} />
        <Route path="/student">
          <div className="App">
            <div className="container-fluid h-100">
              <div className="row h-100">
                <div className="col-sm-2 sidebar p-0">
                  <Sidebar hasAuth={Auth.isAuthenticatedStudent()} />
                </div>
                <div className="col-sm-10 p-0">
                  <div className="row m-0">
                    <div className="col p-0">
                      <Navbar hasAuth={Auth.isAuthenticatedStudent()} />
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col main-col">
                      <StudentProtectedRoute
                        exact
                        path="/student/studentDashboard"
                        component={Dashboard}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/academic-registration"
                        component={AcademicRegistration}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/certificates"
                        component={Certificates}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/course-summary"
                        component={CourseSummary}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/faculty"
                        component={Faculty}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/semwise-courses"
                        component={SemwiseCourses}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/profile"
                        component={Profile}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/send"
                        component={Message}
                      />
                      <StudentProtectedRoute
                        exact
                        path="/student/notifications"
                        component={Notifications}
                      />
                      <Route path="/student/*">
                        <Redirect to="/student/studentDashboard" />
                      </Route>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route exact path="/">
          <Redirect to="/selectUser" />
        </Route>
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
