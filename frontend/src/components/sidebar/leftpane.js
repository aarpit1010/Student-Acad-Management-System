import "./leftpane.css";
import { Image } from "react-bootstrap";
import studentImg from "../../images/student.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Leftpane(hasAuth) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        let isSubscribed = true;
        axios
            .get("/student/profile", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (isSubscribed) {
                    setData(response.data);
                    setLoading(false);
                    console.log(data);
                }
            })
            .catch((error) => console.log(error));

        return () => (isSubscribed = false);
    }, []);

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }

    if (hasAuth)
        return (
            <div className="sidebar-component shadow h-100">
                <ul className="nav flex-column">
                    <div className="tech-company mx-auto p-2">
                        Student Portal
                    </div>
                    <Image
                        className="student-img m-1"
                        src={studentImg}
                        fluid
                        roundedCircle
                    />
                    <br />
                    <Link
                        to="/student/studentDashboard"
                        className="profile-name mx-auto"
                    >
                        {data.name}
                        <br />
                        {data.enrollment_no}
                        <br />
                        2019-2023
                    </Link>
                    <hr />
                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link active"
                            to="/student/academic-registration"
                        >
                            <i className="bi bi-person-lines-fill p-2"></i>{" "}
                            Academic Registration
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/course-summary"
                        >
                            <i className="bi bi-clipboard-check p-2"></i> Course
                            Summary
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/faculty"
                        >
                            <i className="bi bi-people p-2"></i> Faculty
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/certificates"
                        >
                            <i className="bi bi-file-earmark-text p-2"></i>{" "}
                            Certificates
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/semwise-courses"
                        >
                            <i className="bi bi-list-ul p-2"></i> Semwise
                            Courses
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/send"
                        >
                            <i className="bi bi-list-ul p-2"></i> Interaction
                        </Link>
                    </li>
                </ul>
            </div>
        );
    else return <></>;
}

export default Leftpane;
