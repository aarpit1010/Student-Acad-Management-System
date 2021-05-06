import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/student/profile", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-info m-3" role="status">
                    <span className="sr-only p-2">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="profile"
            style={{ paddingTop: "100px", textAlign: "center" }}
        >
            <div className="card col-md-6 mx-auto profile-card shadow">
                <div className="card-body">
                    <img
                        src={
                            "https://img.icons8.com/color/96/000000/student-male--v1.png"
                        }
                    />
                    <h2 className="card-title pb-3">{data.name}</h2>

                    <ul class="list-group">
                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0 "
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Email:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.email}
                            </span>
                        </li>
                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0"
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Branch:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.branch}
                            </span>
                        </li>
                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0"
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Semester:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.semester}
                            </span>
                        </li>
                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0"
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Enrollment No:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.enrollment_no.toUpperCase()}
                            </span>
                        </li>
                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0"
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Section:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.section}
                            </span>
                        </li>

                        <li class="list-group-item p-0 m-2 border">
                            <span
                                class="details-text float-left p-2 m-0"
                                style={{ backgroundColor: "#d8e3e7" }}
                            >
                                Contact:
                            </span>
                            <span className="profile-data-list float-right p-2">
                                {data.contact}
                            </span>
                        </li>
                    </ul>

                    {/* <h4 className="card-text row">
                        <div className="col-md-6" style={{ textAlign: "left" }}>
                            <div className="pb-3">Email: {data.email}</div>
                            <div className="pb-3">
                                Semester: {data.semester}
                            </div>
                            <div className="pb-3">Branch: {data.branch}</div>
                        </div>
                        <div
                            className="col-md-6"
                            style={{ textAlign: "right" }}
                        >
                            <div className="pb-3">Section: {data.section}</div>
                            <div className="pb-3">
                                Enrollment No: {data.enrollment_no}
                            </div>
                            <div className="pb-3">Contact: {data.contact}</div>
                        </div>
                        <Link to="/student/email">
                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                            >
                                Request for Changes
                            </button>
                        </Link>
                    </h4> */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
