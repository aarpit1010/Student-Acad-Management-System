import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Demo() {
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
        <form>
            {data.courses &&
                data.courses.course.map((c, courseKey) => {
                    return (
                        <div class="form-row">
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Course ID"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Course Name"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Marks C1"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Marks C2"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Marks C3"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Total"
                                />
                            </div>
                            <div class="col">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="GPA"
                                />
                            </div>
                        </div>
                    );
                })}
        </form>
    );
}
