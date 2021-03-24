import React from "react";
import "./user-selection.css";
import Login from "./login";
import AdminLogin from "../admin-pages/adminLogin";

function UserSelection() {
  return (
    <div className="selectUser">
      <h2 className="welcome">Welcome to Academic Management System</h2>
      <div className="container">
        <div className="row pt-2 justify-content-md-center">
          <div className="col-md-5">
            <h1>Admin</h1>
            <AdminLogin />
          </div>
          <div className="col-md-5">
            <h1>Student</h1>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelection;
