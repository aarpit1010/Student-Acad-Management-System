import React from "react";
import "./editStudentProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditStudentProfile() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        axios
            .get("/student/profile-all", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const onSubmit = ({ enrollment_no }) => {
        const found = data.find((stud) =>
            stud.username.toLowerCase().includes(enrollment_no.toLowerCase())
        );

        if (found) {
            const student = Object.assign(found);
            setValue("enrollment_no", student.username);
            setValue("contact", student.contact);
            setValue("name", student.name);
            setValue("email", student.email);
            setValue("branch", student.branch);
            setValue("semester", student.semester);
            setValue("section", student.semester);
            console.log(student.name, student.username);
        } else console.log("NO STUDENT FOUND!");
    };

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }

    return (
        <div className="edit-student-profile">
            <h3 id="student-details">Student Details</h3>
            <img
                src="https://img.icons8.com/color/96/000000/student-male--v1.png"
                className="student-details-img"
                alt="student-details-img"
            />
            <div className="card col-md-6 mx-auto p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="lastName">Enrolment No.</label>
                            <input
                                ref={register}
                                type="text"
                                className="form-control"
                                id="enrollment_no"
                                name="enrollment_no"
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="firstName">Contact</label>
                            <input
                                ref={register}
                                type="contact"
                                id="contact"
                                name="contact"
                                className="form-control"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input
                                ref={register}
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                disabled
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email address</label>
                            <input
                                ref={register}
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="branch">Branch</label>
                            <input
                                ref={register}
                                type="text"
                                id="branch"
                                name="branch"
                                className="form-control"
                                disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="semester">Semester</label>
                            <input
                                ref={register}
                                type="text"
                                id="semester"
                                name="semester"
                                className="form-control"
                                disabled
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="section">Section</label>
                            <input
                                ref={register}
                                type="text"
                                id="section"
                                name="section"
                                className="form-control"
                                disabled
                            />
                        </div>
                        <h5>Enrolled Courses: </h5>
                        <div className="form-row">
                            {data.enrolled_course &&
                                data.enrolled_course.map(
                                    (course, courseKey) => {
                                        return (
                                            <div
                                                className="form-group col-md-6"
                                                key={courseKey}
                                            >
                                                <input
                                                    ref={register}
                                                    type="text"
                                                    className="form-control"
                                                    id="course-name"
                                                    name="course-name"
                                                    value={course}
                                                    disabled
                                                />
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Confirm Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditStudentProfile;
