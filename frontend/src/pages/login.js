import React from "react";
import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = ({ email, password }) => {
    axios
      .post("/student/login", {
        email,
        password,
      })
      .then((res) => {
        Auth.login(() => {
          localStorage.setItem("token", res.data);
          // console.log(res);
          history.push("/");
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <div className="card-body">
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                ref={register}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                ref={register}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
            <p className="forgot-password text-right">
              <Link to="#forgot-password">Forgot password?</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
