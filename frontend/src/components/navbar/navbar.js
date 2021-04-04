import React from "react";
import "./navbar.css";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../auth/Auth";
import { useHistory } from "react-router-dom";

function Navigation(hasAuth) {
  const history = useHistory();

  const handleLogout = () => {
    Auth.logoutStudent(() => {
      localStorage.clear();
      history.push("/selectUser");
    });
  };

  if (hasAuth)
    return (
      <div className="navbar-student-page">
        <nav className="navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="navbar-student collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-link pt-3">
                <Link to="/student/profile">Profile</Link>
              </li>
              <li className="nav-item nav-link pt-3">
                <Link to="/student/notifications">Notifications</Link>
              </li>
              <li className="nav-item nav-link">
                <Button onClick={() => handleLogout()}>Logout</Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  else return <></>;
}

export default Navigation;
