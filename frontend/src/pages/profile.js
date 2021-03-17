import React from "react";
import studentImg from "../images/student-img.jpg";
import "./profile.css";

function Profile() {
  return (
    <div className="profile">
      <div class="card w-50 mb-3 mt-3">
        <img
          class="card-img-top rounded mx-auto d-block .img-fluid. max-width: 50%"
          src={studentImg}
          alt="Card image cap"
        />
        <div class="card-body mx-auto">
          <h5 class="card-title">Name: Margaret Silvette</h5>
          <p class="card-text">
            Email: iit2019501@iiita.ac.in
            <br />
            Enrollment No.: IIT2019501
            <br />
            Contact: 9372983091
            <br />
            Semester: IV
            <br />
            Section: B
            <br />
            Branch: IT
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
