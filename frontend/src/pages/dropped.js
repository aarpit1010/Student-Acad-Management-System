import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./course-summary.css";
import axios from "axios";

const Dropped = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get("/student/droppedCourses", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
                console.log(data);
            })
            .catch((error) => console.log(error));
    }, []);

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Course ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.course.map((c, courseKey) => {
                        return (
                            <tr key={courseKey}>
                                <td>{courseKey + 1}</td>
                                <td>{c.course_ID}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Dropped;
