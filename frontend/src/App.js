import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/leftpane";
import Navbar from "./components/navbar/navbar";
import AcademicRegistration from "./pages/acad-registration";
import Certificates from "./pages/certificates";
import CourseSummary from "./pages/course-summary";
import Dashboard from "./components/dashboard/dashboard";
import Faculty from "./pages/faculty";
import SemwiseCourses from "./pages/semwise-courses";
import Login from "./pages/login";
import Register from "./pages/registration";
import Profile from "./pages/profile";
import { Col, Row, Container } from "react-bootstrap";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <div className="App">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <Sidebar />
            </div>
            <div className="col">
              <div className="row">
                <Navbar />
              </div>
              <div className="row">
                <div className="col components">
                  <Route exact path="/" component={Dashboard} />
                  <Route
                    exact
                    path="/academic-registration"
                    component={AcademicRegistration}
                  />
                  <Route exact path="/certificates" component={Certificates} />
                  <Route
                    exact
                    path="/course-summary"
                    component={CourseSummary}
                  />
                  <Route exact path="/faculty" component={Faculty} />
                  <Route
                    exact
                    path="/semwise-courses"
                    component={SemwiseCourses}
                  />
                  <Route exact path="/profile" component={Profile} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Switch>
  );
}

export default App;

{
  /* <Navbar /> */
}
{
  /* <Container fluid>
          <Row>
            <Col md={2} className="main-col">
              <Sidebar />
            </Col>
            <Col className="main-col">
              <Row>
                <Navbar />
              </Row>
              <Row>
                <Route exact path="/" component={Dashboard} />
                <Route
                  exact
                  path="/academic-registration"
                  component={AcademicRegistration}
                />
                <Route exact path="/certificates" component={Certificates} />
                <Route exact path="/course-summary" component={CourseSummary} />
                <Route exact path="/faculty" component={Faculty} />
                <Route
                  exact
                  path="/semwise-courses"
                  component={SemwiseCourses}
                />
              </Row>
            </Col>
          </Row>
        </Container> */
}
