import React, { useState, useEffect } from "react";
import axios from "axios";

const SemwiseCourses = () => {
    const [semwiseCourses, setSemwiseCourses] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/student/semwise_courses", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setSemwiseCourses(response.data);
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
        <div>
            <h4 className="mx-auto">List of semwise courses</h4>
            {semwiseCourses.map((item, key) => {
                return (
                    <div>
                        <h5>
                            <div className="branch">
                                Branch: {item.branch},
                                <span className="ml-3">
                                    Semester: {item.semester}
                                </span>
                            </div>
                        </h5>
                        <table className="table table-light mb-5 table-hover shadow ">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Course ID</th>
                                    <th scope="col">Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.course_list.map((course, courseKey) => {
                                    return (
                                        <tr key={key + courseKey}>
                                            <th scope="row">{courseKey + 1}</th>
                                            <td>{course.course_ID}</td>
                                            <td>{course.course_Name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default SemwiseCourses;
