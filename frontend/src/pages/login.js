import React, { useState } from "react";
// import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import studentLogin from "../images/student-login.jpg";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const [serverError, setServerError] = useState("");

    const onSubmit = ({ email, password }) => {
        axios
            .post("/student/login", {
                email,
                password,
            })
            .then((res) => {
                Auth.loginStudent(() => {
                    localStorage.setItem("token", res.data);
                    // console.log(res);
                    history.push("/student/studentDashboard");
                });
            })
            .catch((err) => {
                console.log({ err });
                setServerError(err.response.statusText);
            });
    };

    return (
        <div className="Login">
            <div className="card pt-1">
                <p className="p-3 ml-auto">
                    <Link to="/register">Haven't Registered? Get started</Link>
                </p>
                <img
                    src={studentLogin}
                    className="card-img-top m-0"
                    alt="..."
                />
                <div className="card-body">
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
                            style={{ backgroundColor: "#2F9599" }}
                        >
                            Login
                        </button>
                    </form>
                    {serverError && serverError === "Unauthorized" && (
                        <div style={{ color: "red" }}>
                            <br />
                            YOU DO NOT HAVE PERMISSION TO ACCESS THE PORTAL.
                            <br />
                            CONTACT ADMIN!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
