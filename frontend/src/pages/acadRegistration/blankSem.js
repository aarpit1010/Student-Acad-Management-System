import React from "react";
import { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Link } from "react-router-dom";
import "./acadRegistration.css";
import SubmitPage from "./submit";
import axios from "axios";

const BlankSem = (props) => {
    const [item, setItem] = useState({ choice: "" });
    const { choice } = item;

    const handleChange = (e) => {
        e.persist();
        setItem((prevState) => ({
            ...prevState,
            choice: e.target.value,
        }));
    };

    const headers = {
        headers: {
            "auth-token": localStorage.token,
            "Content-Type": "application/json",
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (choice === "YES") {
            const course_opted = [];

            axios
                .post("/student/courseregn/opted", { course_opted }, headers)
                .then((res) => {
                    if (res.status === 200) {
                        alert(
                            "You have successfully registered for the upcoming semester!"
                        );
                    }
                })
                .catch((err) => console.log(err));

            return <SubmitPage />;
        }
    };

    return (
        <div className="card blank-sem-card">
            <div className="card-body">
                <h2>Opt for a Blank Semester?</h2>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="yes"
                            value="YES"
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="yes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="no"
                            value="NO"
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="no">
                            No
                        </label>
                    </div>
                    <h6>
                        In case you do not wish to opt for a blank semester,
                        please head over to the Course Selection section for
                        further process.
                    </h6>

                    <button
                        type="submit"
                        className="btn btn-primary nextButton w-25 ml-auto"
                        onClick={() => {
                            props.passBlankChoice(choice);
                        }}
                    >
                        Next
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlankSem;
