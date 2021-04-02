import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Auth from "../auth/Auth";

function AdminNav(hasAuth) {
  const history = useHistory();

  const handleLogout = () => {
    Auth.logoutAdmin(() => {
      localStorage.clear();
      history.push("/selectUser");
    });
  };

  if (hasAuth)
    return (
      <div className="navbar-admin">
        <nav
          className="navbar navbar-expand-lg navbar-light"
          style={{ backgroundColor: "#2a363b" }}
        >
          <Link
            className="navbar-brand  navbar-content-admin"
            to="/admin/adminDashboard"
          >
            Academic Management Portal
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul
              className="navbar-nav ml-auto
ml-auto "
            >
              <Link
                className=" nav-item nav-link navbar-content-admin mr-3"
                to="/admin/send"
              >
                Interact
              </Link>
              <button className="btn btn-danger" onClick={() => handleLogout()}>
                Logout
              </button>
            </ul>
          </div>
        </nav>
      </div>
    );
  else return <></>;
}

export default AdminNav;
