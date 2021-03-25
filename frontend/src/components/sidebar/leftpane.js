import "./leftpane.css";
import { Nav, Image } from "react-bootstrap";
import studentImg from "../../images/student.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Leftpane() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/student/profile", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

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
          {data.name}
          <br />
          {data.enrollment_no}
          <br />
          2019-2023
        </Link>
        <hr />
        <li className="nav-item">
          <Link
            className="nav-link sidebar-link active"
            to="/academic-registration"
          >
            <i className="bi bi-person-lines-fill p-2"></i> Academic
            Registration
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/course-summary">
            <i className="bi bi-clipboard-check p-2"></i> Course Summary
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/faculty">
            <i className="bi bi-people p-2"></i> Faculty
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/certificates">
            <i className="bi bi-file-earmark-text p-2"></i> Certificates
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/semwise-courses">
            <i className="bi bi-list-ul p-2"></i> Semwise Courses
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link sidebar-link" to="/student/send">
            <i className="bi bi-list-ul p-2"></i> Interaction
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
