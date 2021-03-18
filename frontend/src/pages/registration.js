import React from "react";
import "./registration.css";
import reg from "../images/reg.jfif";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import axios from "axios";
import Auth from "../auth/Auth";

function Register() {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = ({
    email,
    password,
    name,
    username,
    enrollment,
    contact,
    section,
    semester,
    branch,
  }) => {
    axios
      .post("/student/register", {
        email,
        password,
        name,
        username,
        enrollment,
        contact,
        section,
        semester,
        branch,
      })
      .then((res) => {
        Auth.login(() => {
          localStorage.setItem("token", res.data.password);
          history.push("/");
        });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  return (
    <div className="register">
      <div className="card registration-card">
        <div className="row no-gutters my-auto">
          <div className="col-sm-7">
            <img src={reg} className="card-img-register" alt="..." />
          </div>
          <div className="col-sm-5">
            <div className="card-body">
              <h4 className="card-title">Register</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="enrollement">Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="enrollment"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="section">Section</label>
                  <input
                    type="text"
                    className="form-control"
                    name="section"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="mobile">Contact Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="contact"
                    ref={register}
                  />
                </div>
                <div className="form-group">
                  <label for="branch">Branch</label>
                  <br />
                  <input name="branch" list="branch" ref={register} />
                  <datalist id="branch">
                    {" "}
                    <option>IT</option> <option>ECE</option>
                  </datalist>
                </div>
                <div className="form-group">
                  <label for="semester">Semester</label>
                  <input
                    type="number"
                    className="form-control"
                    name="semester"
                    ref={register}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Register
                </button>
                <p className="forgot-password text-left">
                  <Link to="/login">
                    Already having an account? Try Logging in!
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
