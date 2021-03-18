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

import Navbar from "./components/navbar/navbar";
import Auth from "./auth/Auth";

import ProtectedRoute from "./auth/ProtectedRoute";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/">
          <div className="App">
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
          </div>
        </Route>
        <Route path="*" component={() => <h1>404 NOT FOUND</h1>} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
