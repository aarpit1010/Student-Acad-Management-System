import React, { useState, useEffect } from "react";
import "./submitPage.css";
import axios from "axios";

const SubmitPage = () => {
    const [opted, setOpted] = useState(null);
    const [state, setState] = useState("");

    useEffect(() => {
        const headers = {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        };

        axios
            .get("/student/courseregn/opted/list", headers)
            .then((response) => {
                setOpted(response.data.opted);

                if (opted.data && opted.data.length !== 0) {
                    setState("Blank sem");
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div
            className="submit-page mx-auto"
            style={{ marginTop: "100px", width: "75%" }}
        >
            <div className="card pt-3 submit-page-card mx-auto shadow">
                <div className="card-body">
                    <h5>
                        Academic Registration for the upcoming semester is
                        complete.
                    </h5>
                    <h5>
                        Below is the list of courses you have opted for. In case
                        of any queries, please contact Admin.
                    </h5>

                    <table className="table table-light mb-3 table-hover table-striped w-75 mx-auto border shadow">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Course ID</th>
                                <th scope="col">Course Name</th>
                            </tr>
                        </thead>
                        <tbody className="table-bordered ">
                            {opted?.map((course, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}.</th>
                                        <td>{course.course_ID}</td>
                                        <td>{course.course_Name}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default SubmitPage;
