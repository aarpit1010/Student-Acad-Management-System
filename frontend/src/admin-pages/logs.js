import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./announcements.css";

export default function Logs() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState("");

    useEffect(() => {
        axios
            .get("/admin/generatelogs", {
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
        <div className="announcements-page pt-3">
            <h4 className="mx-auto">Log Report</h4>
            <table className="table table-light m-0">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                        <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {data.reverse().map((item, key) => {
                        return (
                            <tr>
                                <th scope="row">{key + 1}</th>
                                <td>{item.createdAt}</td>
                                <td>{item.action}</td>
                                <td>{item.role}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
