import React from "react";
import "./registration.css";
import reg from "../images/reg.jfif";

function Register() {
  return (
    <div className="card">
      <div className="row no-gutters my-auto">
        <div className="col-sm-7">
          <img src={reg} className="card-img" alt="..." />
        </div>
        <div className="col-sm-5">
          <div className="card-body">
            <h4 className="card-title">Register</h4>
            <form>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="email" className="form-control" name="email" />
              </div>
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" className="form-control" name="username" />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="form-group">
                <label for="name">Name</label>
                <input type="text" className="form-control" name="name" />
              </div>
              <div className="form-group">
                <label for="enrollement">Enrollment Number</label>
                <input type="text" className="form-control" name="enrollment" />
              </div>
              <div className="form-group">
                <label for="section">Section</label>
                <input type="text" className="form-control" name="section" />
              </div>
              <div className="form-group">
                <label for="mobile">Contact Number</label>
                <input type="number" className="form-control" name="contact" />
              </div>
              <div className="form-group">
                <label for="branch">Branch</label>
                <br />
                <input name="branch" list="branch" />
                <datalist id="branch">
                  {" "}
                  <option>IT</option> <option>ECE</option>
                </datalist>
              </div>
              <div className="form-group">
                <label for="semester">Semester</label>
                <input type="number" className="form-control" name="semester" />
              </div>
              <button type="submit" className="btn btn-dark">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
