import React from "react";
import "./leftpane.css";
import { Nav, Row, Col, Container, Navbar, Image } from "react-bootstrap";
import studentImg from "../../images/student.png";

function Leftpane() {
  return (
    <div className="leftpane">
      <Container className="container">
        <Row>
          <Col sm-6>
            <Navbar bg="dark" variant="dark">
              <Nav className="flex-column">
                <Image
                  className="student-img"
                  src={studentImg}
                  fluid
                  roundedCircle
                />
                <Navbar.Brand href="/" className="profile-name">
                  Aniket Jain, IIT2019501
                  <br />
                  2019-2023
                </Navbar.Brand>
                <br />
                <Nav.Link href="/academic-registration">
                  Academic Registration
                </Nav.Link>
                <Nav.Link href="/course-summary">Course Summary</Nav.Link>
                <Nav.Link href="/faculty">Faculty</Nav.Link>
                <Nav.Link href="/certificates">Certificates</Nav.Link>
                <Nav.Link href="/semwise-courses">Semwise Courses</Nav.Link>
              </Nav>
            </Navbar>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Leftpane;
