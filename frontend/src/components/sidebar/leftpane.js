import React from "react";
import "./leftpane.css";
import { Nav, Image } from "react-bootstrap";
import studentImg from "../../images/student-img.jpg";
import { Link } from "react-router-dom";

function Leftpane() {
  return (
    <div className="sidebar-component shadow h-100">
      <ul className="nav flex-column">
        <div className="tech-company mx-auto p-2">Student Portal</div>
        <Image
          className="student-img m-1"
          src={studentImg}
          fluid
          roundedCircle
        />
        <br />
        <Link to="/" className="profile-name mx-auto">
          Margaret Silvette
          <br />
          IIT2019501
          <br />
          2019-2023
        </Link>
        <hr />
        <li className="nav-item">
          <Link
            className="nav-link sidebar-link active"
            to="/academic-registration"
          >
            <i class="bi bi-person-lines-fill p-2"></i> Academic Registration
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/course-summary">
            <i class="bi bi-clipboard-check p-2"></i> Course Summary
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/faculty">
            <i class="bi bi-people p-2"></i> Faculty
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/certificates">
            <i class="bi bi-file-earmark-text p-2"></i> Certificates
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/semwise-courses">
            <i class="bi bi-list-ul p-2"></i> Semwise Courses
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Leftpane;

{
  /*
    <div className="leftpane">
            <Nav defaultActiveKey="/login" className="flex-column">
              <Image className="student-img" src={studentImg} fluid roundedCircle />
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
                  <Link to="/academic-registration">Academic Registration</Link>
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
    */
}
