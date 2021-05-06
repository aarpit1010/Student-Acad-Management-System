import React from "react";
import "./editStudentProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditStudentProfile() {
    const { register, handleSubmit, watch, setValue, reset } = useForm();

    const [isLoading, setLoading] = useState(true);
    const [foundStudent, setFoundStudent] = useState({});
    const [profileData, setProfileData] = useState({});
    const [enrolledCourseData, setEnrolledCourseData] = useState([
        { course: { course_ID: null, course_Name: null }, marks: {} },
    ]);

    useEffect(() => {
        axios
            .get("/admin/profile-all", {
                headers: {
                    "admin-auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setProfileData(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const fetchStudentDetails = () => {
        const enrollment_no = watch("enrollment_no");
        const found = profileData.student.find((stud) =>
            stud.username.toLowerCase().includes(enrollment_no.toLowerCase())
        );

        if (found) {
            const student = Object.assign(found);
            setValue("enrollment_no", student.username);
            setValue("access", student.access);
            setValue("contact", student.contact);
            setValue("name", student.name);
            setValue("email", student.email);
            setValue("branch", student.branch);
            setValue("semester", student.semester);
            setValue("section", student.section);

            setFoundStudent(found);

            const array = [];
            const course = profileData.enrolled_courses.find(
                (c) => c.semester === student.semester
            );
            course.course_list.forEach((i1, index) => {
                const details = {};

                details.course_ID = i1.course_ID;
                details.course_Name = i1.course_Name;

                details.marks = profileData.marks.find(
                    (s) => s.enrollment === student.username
                ).semester_marks[index].marks;
                array.push(details);
            });
            setEnrolledCourseData(array);
            // console.log("RESPONSE::", {
            //   foundStudent,
            //   enrolledCourseData,
            // });
            // console.log("PROFILE-ALL::", profileData);
        } else {
            reset();
            alert("NO STUDENT FOUND!");
            setEnrolledCourseData([]);
        }
    };

    const onSubmit = (data) => {
        const updatedStudentData = {
            ...foundStudent,
            name: data.name,
            contact: data.contact,
            access: data.access,
        };

        const updatedEnrolledCourseData = enrolledCourseData;
        Object.keys(updatedEnrolledCourseData).forEach((i) => {
            if (data.c1[i].trim() !== "") {
                updatedEnrolledCourseData[i].marks.c1 = data.c1[i];
            }
            if (data.c2[i].trim() !== "") {
                updatedEnrolledCourseData[i].marks.c2 = data.c2[i];
            }
            if (data.c3[i].trim() !== "") {
                updatedEnrolledCourseData[i].marks.c3 = data.c3[i];
            }
            if (data.total[i].trim() !== "") {
                updatedEnrolledCourseData[i].marks.total = data.total[i];
            }
            if (data.gpa[i].trim() !== "") {
                updatedEnrolledCourseData[i].marks.gpa = data.gpa[i];
            }
        });

        axios
            .post(
                "/admin/updatestudentmarks",
                {
                    profileData: updatedStudentData,
                    enrolledCourseData: updatedEnrolledCourseData,
                },
                {
                    headers: {
                        "admin-auth-token": localStorage.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                alert("Marks Successfully Updated!");
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
        <div className="edit-student-profile">
            <h3 id="student-details">Student Details</h3>
            <img
                src="https://img.icons8.com/color/96/000000/student-male--v1.png"
                className="student-details-img"
                alt="student-details-img"
            />
            <div className="card col-md-10 mx-auto p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="lastName">Enrollment No.</label>
                            <input
                                ref={register}
                                type="text"
                                className="form-control"
                                id="enrollment_no"
                                name="enrollment_no"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="firstName">Contact</label>
                            <input
                                ref={register}
                                type="contact"
                                id="contact"
                                name="contact"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="lastName">Enable Access</label>
                            <input
                                ref={register}
                                type="text"
                                className="form-control"
                                id="access"
                                name="access"
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
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                disabled
                                ref={register}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="branch">Branch</label>
                            <input
                                type="text"
                                id="branch"
                                name="branch"
                                className="form-control"
                                disabled
                                ref={register}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                id="semester"
                                name="semester"
                                className="form-control"
                                disabled
                                ref={register}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="section">Section</label>
                            <input
                                type="text"
                                id="section"
                                name="section"
                                className="form-control"
                                disabled
                                ref={register}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-warning mx-auto"
                            onClick={() => fetchStudentDetails()}
                        >
                            Fetch Student Details
                        </button>
                    </div>
                    <div className="form-row">
                        <h4>Enrolled Courses: </h4>
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">C.Id.</th>
                                    <th scope="col">C.Name</th>
                                    <th scope="col">C1 Marks</th>
                                    <th scope="col">C2 Marks</th>
                                    <th scope="col">C3 Marks</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">GPA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrolledCourseData?.map((c, courseKey) => {
                                    return (
                                        <tr key={courseKey}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.course_ID}
                                                    disabled
                                                />
                                            </td>
                                            <td width="30%">
                                                <input
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.course_Name}
                                                    disabled
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    ref={register}
                                                    name={`c1[${courseKey}]`}
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.marks.c1}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    ref={register}
                                                    name={`c2[${courseKey}]`}
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.marks.c2}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    ref={register}
                                                    name={`c3[${courseKey}]`}
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.marks.c3}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    ref={register}
                                                    name={`total[${courseKey}]`}
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.marks.total}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    ref={register}
                                                    name={`gpa[${courseKey}]`}
                                                    type="text"
                                                    className="form-control p-1"
                                                    placeholder={c.marks.gpa}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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
