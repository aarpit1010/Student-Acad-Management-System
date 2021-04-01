import React from "react";
import "./user-selection.css";
import Login from "./login";
import AdminLogin from "../admin-pages/adminLogin";

function UserSelection() {
  return (
    <div className="selectUser">
      <h1 className="welcome">
        Welcome to Student</h1><h1 className="welcome"> Academic Management Portal!
      </h1><br />
      <div className="container">
        <div className="row pt-2 justify-content-md-center">
          <div className="col-md-5">
            <h2>Admin</h2>
            <AdminLogin />
          </div>
          <div className="col-md-5">
            <h2>Student</h2>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
