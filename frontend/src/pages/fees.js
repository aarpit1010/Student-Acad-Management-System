import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Fees() {
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { handleSubmit } = useForm();

    useEffect(() => {
        axios
            .get("/student/feestatus", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    });

    if (isLoading) {
        return (
            <div className="text-center">
                <div className="spinner-border text-info m-3" role="status">
                    <span className="sr-only p-2">Loading...</span>
                </div>
            </div>
        );
    }

    const onSubmit = () => {
        axios
            .post(
                "/student/feestatus/update",
                { fees_paid: true },
                {
                    headers: {
                        "auth-token": localStorage.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
        alert("Fees Paid Successfully!");
    };

    return (
        <div style={{ paddingTop: "200px", textAlign: "center" }}>
            <div className="card w-75 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                        <h2>Fee status for the current semester</h2>
                        <h2>Status: {data === false ? "Not paid" : "Paid"}</h2>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={data}
                        >
                            Pay Fees
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
