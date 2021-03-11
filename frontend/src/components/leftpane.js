import React from 'react';
import './leftpane.css';
import {Nav, Row, Col, Container, Navbar, Image} from 'react-bootstrap';
import studentImg from '../images/student.png';

function Leftpane() {
  return (
    <div className="leftpane">
        <Container className="container">
            <Row>
              <Col md={3}>
                  <Navbar bg="dark" variant="dark">
              <Nav defaultActiveKey="/home" className="flex-column">
                  <Image src={studentImg} fluid roundedCircle="true"/>
                  <Navbar.Brand href="#home" className="profile-name">
                  Aniket Jain, IIT2019501
                    <br/>
                    2019-2023
                 </Navbar.Brand>
                 <br />
                  <Nav.Link href="/home">Academic Registration</Nav.Link>
                  <Nav.Link eventKey="link-1">Course Summary</Nav.Link>
                  <Nav.Link eventKey="link-2">Faculty</Nav.Link>
                  <Nav.Link eventKey="link-3">Certificate</Nav.Link>
                  <Nav.Link eventKey="link-4">Semwise Courses</Nav.Link>
              </Nav>
                </Navbar>
                </Col>
            </Row>
        </Container>
    
    </div>
  );
}

export default Leftpane;