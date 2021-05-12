import React from "react";
import "./user-selection.css";
import Students from "../images/5853.jpg";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";

function UserSelection() {
    return (
        <div className="selectUser container pt-1 p-0">
            <nav className="navbar navbar-expand-lg homepage-navbar p-0">
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
            <div className="row vw-100 m-0 mt-2 p-0">
                <div className="col-md-7 m-0 p-0 text-center">
                    <img
                        src={Students}
                        className="img-fluid m-0 homepage-img"
                        alt="Homepage, students graduating"
                    ></img>
                </div>
                <div className="col m-0 text-right pt-5">
                    <div className="welcome mt-5  pr-4">
                        Students Academic Management Portal
                    </div>
                    <div className="welcome-text mt-2  pr-4">
                        A web portal to keep track of all the information
                        related to the academic courses of the students. A place
                        for students to see their marks, attendance and other
                        academic records and request for modifications if
                        required.
                    </div>
                    <Link
                        className="nav-link homepage-link "
                        to="/studentLogin"
                    >
                        <button
                            type="button"
                            className="btn rounded-pill homepage-student-login m-3"
                        >
                            Login as Student
                        </button>
                    </Link>
                </div>
            </div>
            <div className="skew-c"></div>
        </div>
    );
}

export default UserSelection;
