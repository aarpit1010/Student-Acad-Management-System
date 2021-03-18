import React from "react";
import "./leftpane.css";
import { Nav, Image } from "react-bootstrap";
import studentImg from "../../images/student-img.jpg";
import { Link } from "react-router-dom";

function Leftpane() {
    return (
        <React.Fragment>
            <div className="leftpane">
                <Nav defaultActiveKey="/login" className="flex-column">
                    <Image
                        className="student-img"
                        src={studentImg}
                        fluid
                        roundedCircle
                    />
                    <Link to="/" className="profile-name">
                        <span>
                            Margaret Silvette
                            <br />
                            IIT2019501
                            <br />
                            2019-2023
                        </span>
                    </Link>
                    <br />
                    <div className="links">
                        <Nav.Link>
                            <Link to="/academic-registration">
                                Academic Registration
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/course-summary">Course Summary</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/faculty">Faculty</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/certificates">Certificates</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/semwise-courses">Semwise Courses</Link>
                        </Nav.Link>
                    </div>
                </Nav>
            </div>
        </React.Fragment>
    );
}

export default Leftpane;
