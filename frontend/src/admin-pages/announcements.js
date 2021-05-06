import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./announcements.css";

import { useForm } from "react-hook-form";

function Announcements() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        axios
            .get("/admin/notifications/view", {
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

    const onSubmit = ({ enrollment, message }) => {
        const responseObject = {
            enrollment: enrollment.toLowerCase(),
            notifs_arr: [{ message }],
        };

        axios
            .post("/admin/notifications", responseObject, {
                headers: {
                    "admin-auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setLoading(true);
                if (res.status === (200 || 201)) {
                    alert("Notification successfully Added!");
                }
            })
            .catch((err) => console.log(err));
    };

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
            <h4 className="announcements-heading pb-1">Announcements</h4>
            <div className="card shadow-lg col-md-4 mx-auto p-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h5>Enter a new announcement to make</h5>
                    <div className="form-group">
                        <label htmlFor="enrollment">Enrollment no.</label>
                        <input
                            type="text"
                            className="form-control"
                            id="enrollment"
                            name="enrollment"
                            placeholder="IIT20XX001"
                            ref={register}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="3"
                            placeholder="Write the message here"
                            ref={register}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            <br />
            {/* <div className="row"> */}
            <div className="card-columns">
                {data.map((item, key) => {
                    return (
                        <div key={key}>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-title">
                                        Enrollment No.{" "}
                                        {item.enrollment.toUpperCase()}
                                    </h6>
                                    <ul className="list-group">
                                        {item.notifs_arr.map((notif, key2) => {
                                            return (
                                                <li
                                                    key={key2}
                                                    className="list-group-item list-group-item-action list-group-item-info"
                                                >
                                                    <p className="card-text">
                                                        {notif.message}
                                                        <br />
                                                        {notif.sent_time}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* </div> */}
        </div>
    );
}
export default Announcements;
