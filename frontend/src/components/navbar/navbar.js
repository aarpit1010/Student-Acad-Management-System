import React from "react";
import "./navbar.css";
import { Nav, Navbar } from "react-bootstrap";

function Navigation() {
  return (
    <div className="navbar shadow rounded">
      <Navbar>
        <Navbar.Brand href="#home" className="portal-name">
          Student Portal
        </Navbar.Brand>
        <Nav className="ml-auto items">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="#features">Notifications</Nav.Link>
          <Nav.Link href="#pricing">Signout</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
