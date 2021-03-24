import React from "react";

function Navigation() {
  return (
    <div className="navbar-admin">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#2a363b" }}
      >
        <a className="navbar-brand  navbar-content-admin" href="#">
          Academic Management System
        </a>
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
            <a className=" nav-item nav-link  navbar-content-admin" href="#">
              Notifications
            </a>
            <a className=" nav-item nav-link  navbar-content-admin" href="#">
              Logout
            </a>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
