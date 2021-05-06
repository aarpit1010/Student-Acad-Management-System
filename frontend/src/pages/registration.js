import React from "react";
import "./registration.css";
import reg from "../images/reg.jfif";
import { useForm } from "react-hook-form";

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
            <div className="card col-md-9 register-card-row p-0 shadow-lg ">
                <div className="row no-gutters justify-content-md-center rounded">
                    <div className="col-md-4 p-1">
                        <img
                            src={reg}
                            className="card-img-register rounded"
                            alt="..."
                        />
                    </div>
                    <div className="col-md-8">
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
                                <div className="form-group col-md-6">
                                    <label htmlFor="branch">Branch</label>
                                    <br />
                                    <input
                                        name="branch"
                                        list="branch"
                                        ref={register}
                                    />
                                    <datalist id="branch">
                                        {" "}
                                        <option>IT</option> <option>ECE</option>
                                    </datalist>
                                </div>
                                <p className="forgot-password text-left">
                                    <Link to="/selectUser">
                                        Already having an account? Try Logging
                                        in!
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
