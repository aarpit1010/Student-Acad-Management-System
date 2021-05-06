import React from "react";
import "./user-selection.css";
import Students from "../images/5853.jpg";
import { Link } from "react-router-dom";

function UserSelection() {
    return (
        <div className="selectUser container p-0">
            <nav class="navbar navbar-expand-lg homepage-navbar p-0">
                <a class="navbar-brand ml-3">SAMP</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item mr-1">
                            <Link class="nav-link active homepage-link" to="/">
                                <button
                                    type="button"
                                    class="btn rounded-pill homepage-link-pill m-0"
                                >
                                    Home
                                </button>
                            </Link>
                        </li>
                        <li class="nav-item mr-1">
                            <Link
                                class="nav-link homepage-link"
                                to="/adminLogin"
                            >
                                <button
                                    type="button"
                                    class="btn rounded-pill homepage-link-pill m-0"
                                >
                                    Admin
                                </button>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link
                                class="nav-link homepage-link "
                                to="/studentLogin"
                            >
                                <button
                                    type="button"
                                    class="btn rounded-pill homepage-link-pill m-0"
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
                    <Link class="nav-link homepage-link " to="/studentLogin">
                        <button
                            type="button"
                            class="btn rounded-pill homepage-student-login m-3"
                        >
                            Login as Student
                        </button>
                    </Link>
                </div>
            </div>
            <div class="skew-c"></div>
        </div>
    );
}

export default UserSelection;

{
    /* <h1 className="welcome">
                Welcome to Student
                <br />
                Academic Management Portal!
            </h1>
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col">
                        <h2>Admin</h2>
                        <AdminLogin />
                    </div>
                    <div className="col">
                        <h2>Student</h2>
                        <Login />
                    </div>
                </div>
            </div> */
}
