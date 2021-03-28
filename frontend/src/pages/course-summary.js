import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./course-summary.css";
import axios from "axios";

const CourseSummary = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({ courses: null, droppedCourses: null });

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

            if (isSubscribed) {
                setData({
                    courses: getEnrolledCourses.data,
                    droppedCourses: getDroppedCourses.data,
                });
                setLoading(false);
            }
        };
        fetchAllData();

        return () => (isSubscribed = false);
    }, []);

    console.log({ data });

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }

    return (
        <div>
            <br />
            <h3>Attendance</h3>
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
                    {data.courses &&
                        data.courses.course.map((c, courseKey) => {
                            return (
                                <tr key={courseKey}>
                                    <td>{courseKey + 1}</td>
                                    <td>{c.course_ID}</td>
                                    <td>{c.course_Name}</td>
                                    <td>
                                        {
                                            data.courses.attendance[courseKey]
                                                .daysout0f90
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <h3>Course Summary</h3>
            <Tabs
                id="course-summary-tabs"
                defaultActiveKey="enrolled"
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
                                data.courses.course.map((c, courseKey) => {
                                    return (
                                        <tr key={courseKey}>
                                            <td>{courseKey + 1}</td>
                                            <td>{c.course_ID}</td>
                                            <td>{c.course_Name}</td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].c1
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].c2
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].c3
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].total
                                                }
                                            </td>
                                            <td>
                                                {
                                                    data.courses.marks[
                                                        courseKey
                                                    ].gpa
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="dropped" title="DROPPED">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>S. No.</th>
                                <th>Course Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.droppedCourses.dropped_courses &&
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
                </Tab>
            </Tabs>
        </div>
    );
};

export default CourseSummary;
