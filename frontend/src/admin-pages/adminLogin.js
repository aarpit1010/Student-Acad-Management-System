import React from "react";
import adminLogin from "../images/admin.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import Auth from "../auth/Auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../images/logo2.png";
import "./adminLogin.css";

const AdminLogin = () => {
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    const onSubmit = ({ email, password }) => {
        axios
            .post("/admin/login", {
                email,
                password,
            })
            .then((res) => {
                Auth.loginAdmin(() => {
                    localStorage.setItem("token", res.data);
                    // console.log(res);
                    history.push("/admin/adminDashboard");
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="adminLogin">
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
            <div className="card pt-0 shadow rounded admin-login-card">
                <div className="row m-0 p-0 justify-content-md-center">
                    <div className="col-md-6 p-0">
                        <img
                            src={adminLogin}
                            className="card-img-top card-img-admin-login"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="card-body pl-5 pr-5 mt-4">
                            <img
                                src={Logo}
                                className="logo-login-admin"
                                alt="Logo"
                            />
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="admin-login-form"
                            >
                                <h1
                                    style={{ color: "#14385C" }}
                                    className="float-left mb-4"
                                >
                                    Login as Admin
                                </h1>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control mb-2"
                                        placeholder="Email"
                                        ref={register}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control mb-2"
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
            </div>
        </div>
    );
};

export default AdminLogin;
