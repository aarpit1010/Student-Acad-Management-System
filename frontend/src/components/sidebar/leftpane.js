import "./leftpane.css";
import { Image } from "react-bootstrap";
import studentImg from "../../images/student.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Leftpane(hasAuth) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({ profile: null, cal: null });

    useEffect(() => {
        let isSubscribed = true;

        const fetchAllData = async () => {
            const getProfileData = await axios.get("/student/profile", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            });

            const getCalLink = await axios.get("/student/viewcalendar", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            });
            if (isSubscribed) {
                setData({
                    profile: getProfileData.data,
                    cal: getCalLink.data,
                });
                setLoading(false);
            }
        };
        fetchAllData();

        return () => (isSubscribed = false);
    }, []);

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }
    var enr = data.profile.enrollment_no;
    var yr = enr.substr(3, 4);

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
                        {data.profile.name}
                        <br />
                        {data.profile.enrollment_no}
                        <br />
                        {parseInt(yr)} - {parseInt(yr) + 4}
                    </Link>
                    <hr />
                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link active"
                            to="/student/academicRegistration"
                        >
                            <i className="bi bi-person-lines-fill p-2"></i>{" "}
                            Academic Registration
                        </Link>
                    </li>
                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/course-summary"
                        >
                            <i className="bi bi-clipboard-check p-2"></i> Course
                            Summary
                        </Link>
                    </li>
                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/faculty"
                        >
                            <i className="bi bi-people p-2"></i> Faculty
                        </Link>
                    </li>
                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/certificates"
                        >
                            <i className="bi bi-file-earmark-text p-2"></i>{" "}
                            Certificates
                        </Link>
                    </li>

                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/semwise-courses"
                        >
                            <i className="bi bi-list-ul p-2"></i> Semwise
                            Courses
                        </Link>
                    </li>
                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/fees"
                        >
                            <i className="bi bi-list-ul p-2"></i> Fee Payment
                        </Link>
                    </li>

                    <li className="nav-item pb-2 pl-1">
                        <Link
                            className="nav-link sidebar-link"
                            to="/student/email"
                        >
                            <i className="bi bi-envelope p-2"></i> Interaction
                        </Link>
                    </li>
                    <li className="nav-item pb-2 pl-1">
                        <a
                            className="nav-link sidebar-link"
                            href={data.cal}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <i className="bi bi-calendar-date p-2"></i> Academic
                            Calendar
                        </a>
                    </li>
                </ul>
            </div>
        );
    else return <></>;
}

export default Leftpane;
