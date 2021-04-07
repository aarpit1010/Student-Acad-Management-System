import React, { useState } from "react";
import studentImg from "../images/student.png";
import "./profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [data, setData] = useState({});

  axios
    .get("/student/profile", {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => console.log(error));

  return (
    <div
      className="profile"
      style={{ paddingTop: "100px", textAlign: "center" }}
    >
      <div className="card col-md-8 mx-auto profile-card">
        <div className="card-body mx-auto">
          <img src="https://img.icons8.com/color/96/000000/student-male--v1.png" />
          <h2 className="card-title pb-3">Name: {data.name}</h2>
          <h4 className="card-text row">
            <div className="col-md-6" style={{ textAlign: "left" }}>
              <div className="pb-3">Email: {data.email}</div>
              <div className="pb-3">Semester: {data.semester}</div>
              <div className="pb-3">Branch: {data.branch}</div>
            </div>
            <div className="col-md-6" style={{ textAlign: "right" }}>
              <div className="pb-3">Section: {data.section}</div>
              <div className="pb-3">Enrollment No: {data.enrollment_no}</div>
              <div className="pb-3">Contact: {data.contact}</div>
            </div>
            <Link to="/student/email">
              <button type="button" className="btn btn-primary mt-3">
                Request for Changes
              </button>
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Profile;
