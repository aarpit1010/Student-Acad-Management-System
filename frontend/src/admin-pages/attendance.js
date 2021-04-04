import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Attendance() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { register, handleSubmit } = useForm();

    const onSubmit = ({ enrollment }) => {
        const responseObject = { enrollment: enrollment.toLowerCase() };
        console.log(responseObject);

        axios
            .post("/admin/getattendance", responseObject, {
                headers: {
                    "admin-auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log({ error });
                console.log({ TOKEN: localStorage.token });
            });
    };

    // if (isLoading) {
    //   return <div className="Course-Summary">Loading...</div>;
    // }

    return (
        <div className="admin-certificates-page pt-5">
            <div className="card col-md-6 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h5>Enter the Attendance Record of any Student.</h5>
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
                        <button
                            type="button"
                            className="btn btn-warning mx-auto"
                        >
                            Fetch Student's Attendance
                        </button>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
