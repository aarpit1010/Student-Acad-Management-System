import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import SubmitPage from "./submit";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const CourseSelection = () => {
    const history = useHistory();
    //   const [isLoading, setLoading] = useState(true);
    const [availableCourses, setAvailableCourses] = useState(null);
    const { handleSubmit } = useForm();

    const [state, setState] = useState({
        checkedItems: new Map(),
    });

    const Checkbox = ({
        type = "checkbox",
        name,
        checked = false,
        onChange,
    }) => (
        <input type={type} name={name} checked={checked} onChange={onChange} />
    );

    Checkbox.propTypes = {
        type: PropTypes.string,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    };

    const handleChange = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
        setState((prevState) => ({
            checkedItems: prevState.checkedItems.set(item, isChecked),
        }));
    };

    const fetchAllData = async () => {
        const headers = {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        };

        const getAvailableCourses = await axios.get(
            "/student/courseregn",
            headers
        );
        setAvailableCourses(getAvailableCourses.data);
    };

    fetchAllData();

    //   if (isLoading) {
    //     return <div>Loading...</div>;
    //   }

    const onSubmit = () => {
        let course_opted = [];

        state.checkedItems.forEach((key, value) => {
            if (key === true) {
                course_opted.push(Number(value));
            }
        });

        const headers = {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        };
        axios
            .post("/student/courseregn/opted", { course_opted }, headers)
            .then((res) => {
                if (res.status === 200) {
                    alert(
                        "You have successfully registered for the upcoming semester!"
                    );
                    history.push("/student/submitPage");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="course-selection-page">
            <div className="card pt-3 pb-3">
                <div className="card-body">
                    <h3>This is the Course Selection Page</h3>
                    <h4>Select the courses you wish to opt below.</h4>
                    <br />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {availableCourses ? (
                            <table className="table table-light mb-3 table-hover table-striped w-75 mx-auto">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Course ID</th>
                                        <th scope="col">Course Name</th>
                                        <th scope="col">Opt</th>
                                    </tr>
                                </thead>
                                <tbody className="table-bordered ">
                                    {availableCourses === {} ? (
                                        <div>Loading...</div>
                                    ) : (
                                        availableCourses.map((course, key) => {
                                            return (
                                                <tr key={key}>
                                                    <th scope="row">
                                                        {key + 1}.
                                                    </th>
                                                    <td>{course.course_ID}</td>
                                                    <td>
                                                        {course.course_Name}
                                                    </td>
                                                    <td>
                                                        <Checkbox
                                                            name={`${key}`}
                                                            checked={state.checkedItems.get(
                                                                `${key}`
                                                            )}
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <div>
                                Courses not Available. Please try again later.
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary nextButton w-25 ml-auto"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseSelection;
