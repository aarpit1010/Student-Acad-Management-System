import React from "react";
import "./navbar.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../auth/Auth";
import { useHistory } from "react-router-dom";

function Navigation() {
  const history = useHistory();

  const handleLogout = () => {
    Auth.logout(() => {
      localStorage.clear();
      history.push("/login");
    });
  };

  return (
    <div className="navbar">
      <Navbar>
        {/* <Navbar.Brand className="portal-name">Student Portal</Navbar.Brand> */}
        <Nav className="ml-auto items">
          <Nav.Link>
            <Link to="/profile">Profile</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/notifications">Notifications</Link>
          </Nav.Link>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Nav>
      </Navbar>
    </div>
  );
}

export default Navigation;
