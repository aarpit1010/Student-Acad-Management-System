import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./course-summary.css";
import axios from "axios";

const CourseSummary = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({
        courses: null,
        droppedCourses: null,
        attendance: null,
    });

    useEffect(() => {
        let isSubscribed = true;
        const fetchAllData = async () => {
            const getEnrolledCourses = await axios.get("/student/marks", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            });

            const getDroppedCourses = await axios.get(
                "/student/droppedcourses",
                {
                    headers: {
                        "auth-token": localStorage.token,
                        "Content-Type": "application/json",
                    },
                }
            );

            const getAttendance = await axios.get("/student/attendance", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            });

            if (isSubscribed) {
                //   if (getEnrolledCourses.data === "Student doesn't exist in Database") {
                //     return <div>Student doesn't exist in database</div>;
                //   }
                setData({
                    courses: getEnrolledCourses.data,
                    droppedCourses: getDroppedCourses.data,
                    attendance: getAttendance.data,
                });
                setLoading(false);
            }
        };
        fetchAllData();

        return () => (isSubscribed = false);
    }, [isLoading]);

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
        <div className="course-summary-page">
            <br />
            <h3 className="attendance-title">Attendance</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Attendance / 90</th>
                    </tr>
                </thead>
                <tbody>
                    {data.attendance ? (
                        data.attendance?.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.course_ID}</td>
                                    <td>{item.course_Name}</td>
                                    <td>{item.daysoutof90}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <div style={{ color: "red", fontSize: "20px" }}>
                            The attendance record hasn't been entered by Admin
                            yet.
                        </div>
                    )}
                </tbody>
            </Table>
            <h3 className="attendance-title">Course Summary</h3>
            <Tabs
                id="course-summary-tabs"
                defaultActiveKey="completed"
                variant="tabs"
                style={{
                    color: "white",
                    fontWeight: "bold",
                    padding: "10px",
                }}
            >
                <Tab eventKey="completed" title="COMPLETED">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>C1 Marks</th>
                                <th>C2 Marks</th>
                                <th>C3 Marks</th>
                                <th>Total</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.courses &&
                                data.courses.marks.map((c, courseKey) => {
                                    return (
                                        <tr key={courseKey}>
                                            <td>{courseKey + 1}</td>
                                            <td>{c.course_ID}</td>
                                            <td>{c.course_Name}</td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].marks.c1
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].marks.c2
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].marks.c3
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].marks.total
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].marks.gpa
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="dropped" title="DROPPED">
                    {data.droppedCourses.dropped_courses.length !== 0 ? (
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>S. No.</th>
                                    <th>Course Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.droppedCourses &&
                                    data.droppedCourses.dropped_courses.map(
                                        (c, courseKey) => {
                                            return (
                                                <tr key={courseKey}>
                                                    <td>{courseKey + 1}</td>

                                                    <td>{c}</td>
                                                </tr>
                                            );
                                        }
                                    )}
                            </tbody>
                        </Table>
                    ) : (
                        <div
                            style={{
                                color: "white",
                                fontSize: "20px",
                                textAlign: "center",
                            }}
                        >
                            No dropped courses for the ongoing Semester.
                        </div>
                    )}
                </Tab>
            </Tabs>
        </div>
    );
};

export default CourseSummary;
