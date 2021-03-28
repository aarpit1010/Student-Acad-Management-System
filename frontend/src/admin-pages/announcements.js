import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Announcements() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get("/student/notifications", {
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
    }, []);

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }

    return (
        <div>
            <h1>Announcements</h1>
            <div className="card col-md-6 mx-auto p-0">
                <div className="card-header">Current Notices: </div>
                <ul className="list-group list-group-flush">
                    {data.notifs_arr.map((item, key) => {
                        return (
                            <li className="list-group-item">
                                {key + 1}. {item}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Announcements;
