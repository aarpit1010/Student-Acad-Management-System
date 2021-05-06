import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./announcements.css";

import { useForm } from "react-hook-form";

export default function AdminFaculty() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        axios
            .get("/admin/addFaculty/viewlist", {
                headers: {
                    "admin-auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
        return () => setLoading(false);
    }, [isLoading]);

    const onSubmit = ({
        semester,
        section,
        branch,
        courseid,
        coursename,
        name,
    }) => {
        const responseObject = {
            branch,
            semester,
            section,
            faculty: [
                {
                    courseid: courseid,
                    coursename: coursename,
                    facultyname: name,
                },
            ],
        };

        axios
            .post("/admin/addFaculty", responseObject, {
                headers: {
                    "admin-auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Faculty successfully added!");

                setLoading(true);
            })
            .catch((err) => console.log(err));
    };

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
        <div className="admin-dashboard">
            <h4 className="mx-auto">Faculty</h4>

            <div className="card shadow-lg col-md-8 mx-auto p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Enter details to add a faculty member to the list</h5>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="name">Faculty Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Firstname Lastname"
                                ref={register}
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="branch">Branch</label>
                            <input
                                type="text"
                                className="form-control"
                                id="branch"
                                name="branch"
                                placeholder="IT"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="courseid">CourseID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseid"
                                name="courseid"
                                placeholder="DS"
                                ref={register}
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="coursename">CourseName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="coursename"
                                name="coursename"
                                placeholder="Data Structures"
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                className="form-control"
                                id="semester"
                                name="semester"
                                placeholder="1"
                                ref={register}
                            />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="section">Section</label>
                            <input
                                type="text"
                                className="form-control"
                                id="section"
                                name="section"
                                placeholder="A"
                                ref={register}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            <br />
            <div className="row cards-row">
                {data.map((item, key) => {
                    return item.faculty.map((teacher, teacherKey) => {
                        return (
                            <div key={teacherKey} className="col-sm-4 card-col">
                                <div key={key} className="card mb-3">
                                    <h5 className="card-header list-group-item-info">
                                        {teacher.coursename}
                                    </h5>
                                    <div className="card-body">
                                        <h6 className="card-title">
                                            Name: {teacher.facultyname}
                                        </h6>
                                        <p className="card-text">
                                            Section: {item.section}
                                            <br />
                                            Course ID: {teacher.courseid}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    });
                })}
            </div>
        </div>
    );
}
