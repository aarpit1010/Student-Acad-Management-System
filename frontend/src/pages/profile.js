import React, { useState } from "react";
import studentImg from "../images/student-img.jpg";
import "./profile.css";
import axios from "axios";

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
    <div className="profile">
      <div className="card w-50 mb-3 mt-3">
        <img
          className="card-img-top rounded mx-auto d-block .img-fluid. max-width: 50%"
          src={studentImg}
          alt="Card cap"
        />
        <div className="card-body mx-auto">
          <h5 className="card-title">Name: {data.name}</h5>
          <p className="card-text">
            Email: {data.email}
            <br />
            Enrollment No.: {data.username}
            <br />
            Contact: {data.contact}
            <br />
            Semester: {data.semester}
            <br />
            Section: {data.section}
            <br />
            Branch: {data.branch}
            <br />
            <button type="button" className="btn btn-primary mt-3">
              Request for Changes
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
