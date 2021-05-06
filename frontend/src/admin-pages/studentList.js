import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentList() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState("");

    useEffect(() => {
        axios
            .get("/admin/studentList/view", {
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
        <div className="admin-dashboard pt-3">
            <h2 className="mx-auto">List of all Students</h2>
            <table className="table table-light table-hover m-0">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Enrollment Number</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, key) => {
                        return (
                            <tr>
                                <th scope="row">{key + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.enrollment}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
