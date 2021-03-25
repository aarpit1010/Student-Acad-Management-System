import React from "react";
import adminLogin from "../images/admin.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";

const AdminLogin = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = ({ username, password }) => {
    axios
      .post("/admin/login", {
        username,
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
    <div className="AdminLogin">
      <div className="card pt-1 shadow rounded">
        <img src={adminLogin} className="card-img-top m-0" alt="..." />
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="username"
                name="username"
                className="form-control"
                placeholder="username"
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
              style={{ backgroundColor: "#2F9599" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
