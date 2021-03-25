import React from "react";
// import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";
import studentLogin from "../images/student-login.jpg";

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
      <div class="card pt-1">
        <a className="p-3 ml-auto">Haven't Registered? Get started</a>
        <img src={studentLogin} class="card-img-top m-0" alt="..." />
        <div class="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                ref={register}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                ref={register}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ "background-color": "#2F9599" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
