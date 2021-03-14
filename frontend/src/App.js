import React from "react";
import "./App.css";
import Leftpane from "./components/sidebar/leftpane";
import Navbar from "./components/navbar/navbar";
import AcademicRegistration from "./pages/acad-registration";
import Certificates from "./pages/certificates";
import CourseSummary from "./pages/course-summary";
import Dashboard from "./components/dashboard/dashboard";
import Faculty from "./pages/faculty";
import SemwiseCourses from "./pages/semwise-courses";
import { Col, Row, Container } from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Container fluid>
                    <Row>
                        <Col lg={2} className="main-col">
                            <Leftpane />
                        </Col>
                        <Col className="main-col">
                            <Route exact path="/" component={Dashboard} />
                            <Route
                                exact
                                path="/academic-registration"
                                component={AcademicRegistration}
                            />
                            <Route
                                exact
                                path="/certificates"
                                component={Certificates}
                            />
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
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}

export default App;
