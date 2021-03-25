import React from "react";
import "./editStudentProfile.css";
import AdminNav from "./adminNav";
import { useEffect, useState } from "react";
import axios from "axios";

function EditStudentProfile() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/student/profile", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <div className="edit-student-profile">
      <AdminNav />
      <h3 id="student-details">Student Details</h3>
      <img
        src="https://img.icons8.com/color/96/000000/student-male--v1.png"
        className="student-details-img"
      />
      <div className="card col-md-6 mx-auto p-2">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={data.name}
                id="name"
              />
            </div>
            <div className="form-group col-md-6">
              <label for="firstName">Contact</label>
              <input
                type="contact"
                className="form-control"
                placeholder={data.contact}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="lastName">Enrolment No.</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder={data.enrollment_no}
                disabled
              />
            </div>
            <div className="form-group col-md-6">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder={data.email}
                disabled
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label for="branch">Branch</label>
              <input
                type="text"
                className="form-control"
                placeholder={data.branch}
                disabled
              />
            </div>
            <div className="form-group col-md-4">
              <label for="semester">Semester</label>
              <input
                type="text"
                className="form-control"
                placeholder={data.semester}
                disabled
              />
            </div>
            <div className="form-group col-md-4">
              <label for="section">Section</label>
              <input
                type="text"
                className="form-control"
                placeholder={data.section}
                disabled
              />
            </div>
            <h5>Enrolled Courses: </h5>
            <div className="form-row">
              {data.enrolled_course.map((course, courseKey) => {
                return (
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder={course.course_Name}
                      disabled
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditStudentProfile;
