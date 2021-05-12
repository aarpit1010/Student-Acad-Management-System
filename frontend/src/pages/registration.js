import React from "react";
import "./registration.css";
import reg from "../images/reg-page.png";
import { useForm } from "react-hook-form";

import Logo from "../images/logo.png";

import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import axios from "axios";

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
                username: username.toLowerCase(),
                enrollment: enrollment.toLowerCase(),
                contact,
                section,
                semester,
                branch,
            })
            .then((res) => {
                alert("Successfully registered!");
                history.push("/student/selectUser");
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
            <div className="card col-md-9 register-card-row p-0 shadow-lg ">
                <div className="row no-gutters justify-content-md-center rounded">
                    <div className="col-md-6 p-1">
                        <img
                            src={reg}
                            className="card-img-register rounded"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            ref={register}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            ref={register}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="enrollement">
                                            Enrollment Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="enrollment"
                                            ref={register}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="username">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            ref={register}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            ref={register}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="section">Section</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="section"
                                            ref={register}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="semester">
                                            Semester
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="semester"
                                            ref={register}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="mobile">
                                            Contact Number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="contact"
                                            ref={register}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="branch">Branch</label>
                                        <br />
                                        {/* <select
                                            className="form-control"
                                            id="exampleFormControlSelect1"
                                            name="branch"
                                            list="branch"
                                            ref={register}
                                        >
                                            <option>IT</option>
                                            <option>ECE</option>
                                        </select> */}
                                        <input
                                            name="branch"
                                            list="branch"
                                            ref={register}
                                        />
                                        <datalist id="branch">
                                            {" "}
                                            <option>IT</option>{" "}
                                            <option>ECE</option>
                                        </datalist>
                                    </div>
                                </div>
                                <p className="forgot-password text-left">
                                    <Link to="/selectUser">
                                        Already have an account? Try Logging in!
                                    </Link>
                                </p>
                                <button type="submit" className="btn btn-dark">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
