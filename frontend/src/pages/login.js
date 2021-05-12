import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import studentLogin from "../images/student-login-removebg-preview.png";
import Logo from "../images/logo2.png";

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
                    history.push("/student/studentDashboard");
                });
            })
            .catch((err) => {
                console.log({ err });
                setServerError(err.response.statusText);
                alert(err.response.data);
            });
    };

    return (
        <div className="Login">
            <nav className="navbar navbar-expand-lg p-0">
                <a className="navbar-brand ml-0">
                    <img
                        src={Logo}
                        style={{ width: "60px" }}
                        className="m-0 p-0"
                    />
                    SAMP
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mr-1">
                            <Link
                                className="nav-link active homepage-link"
                                to="/"
                            >
                                <button
                                    type="button"
                                    className="btn rounded-pill homepage-link-pill m-0"
                                >
                                    Home
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item mr-1">
                            <Link
                                className="nav-link homepage-link"
                                to="/adminLogin"
                            >
                                <button
                                    type="button"
                                    className="btn rounded-pill homepage-link-pill m-0"
                                >
                                    Admin
                                </button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link homepage-link "
                                to="/studentLogin"
                            >
                                <button
                                    type="button"
                                    className="btn rounded-pill homepage-link-pill m-0"
                                >
                                    Student
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="card login-card-student shadow">
                <div className="row m-0 p-0 justify-content-md-center">
                    <div
                        className="col-md-6 p-0"
                        style={{ backgroundColor: "#001333" }}
                    >
                        <img
                            src={studentLogin}
                            className="card-img-top pt-5 pb-3 card-img-student-login"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body pl-5 pr-5 mt-4">
                            <img src={Logo} className="logo-login" alt="Logo" />
                            <form
                                className="student-login-form"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <h1
                                    style={{ color: "#14385C" }}
                                    className="float-left mb-3"
                                >
                                    Login
                                </h1>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control mb-3"
                                        placeholder="Email"
                                        ref={register}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control mb-3"
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
                                <h6 className="register-text mt-3 mb-3 float-left">
                                    Haven't Registered? Get started
                                </h6>
                                <Link to="/register">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-block"
                                        style={{ backgroundColor: "#2F9599" }}
                                    >
                                        Register
                                    </button>
                                </Link>
                            </form>
                            {serverError && serverError === "Unauthorized" && (
                                <div style={{ color: "red" }}>
                                    <br />
                                    YOU DO NOT HAVE PERMISSION TO ACCESS THE
                                    PORTAL.
                                    <br />
                                    CONTACT ADMIN!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
