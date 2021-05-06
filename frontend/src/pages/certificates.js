import React, { useEffect, useState } from "react";
import axios from "axios";
import "./certificates.css";

const Certificates = () => {
    const [data, setData] = useState(null);
    const [item, setItem] = useState({ docType: "" });
    const [isAvailable, setAvailable] = useState(true);
    const { docType } = item;

    const handleChange = (e) => {
        e.persist();

        setItem((prevState) => ({
            ...prevState,
            docType: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const responseObject = { type: `${docType}` };
        axios
            .post("/student/reqDoc", responseObject, {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Request sent successfully!");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const headers = {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        };
        axios.get("/student/viewcertificate", headers).then((res) => {
            setData(res.data);
        });
        if (typeof data === "string") {
            setAvailable(false);
        }
    }, []);

    return (
        <div className="certificates-student">
            <h3 className="p-3">
                Send a request for the type of document you need.
            </h3>
            <div className="card col-md-6 mx-auto p-3 shadow">
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 cert-options">
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="flexRadioDefault1"
                                        value="Bonafide"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        Bonafide Certificate
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="flexRadioDefault2"
                                        value="Last Sem Grade Report"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Last semester's grade report
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="flexRadioDefault2"
                                        value="Fee Receipt"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Fee Receipt
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6 cert-options">
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="flexRadioDefault1"
                                        value="Migration Certificate"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault1"
                                    >
                                        Migration Certificate
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        id="flexRadioDefault2"
                                        value="Course Report"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexRadioDefault2"
                                    >
                                        Course Summary/Report
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-25 mx-auto"
                    >
                        Send Request
                    </button>
                </form>
            </div>
            <div style={{ color: "white" }}>
                <h6 className="certificate-note p-3">
                    Note: If no documents are visible, then admin hasn't
                    uploaded the document(s) that you requested for.
                </h6>
                <hr />
                <h4>Your requested documents</h4>
            </div>
            {isAvailable === false || typeof data === "string" ? (
                <div></div>
            ) : (
                <div>
                    {isAvailable &&
                        data?.map((item, key) => {
                            return (
                                <div key={key}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="certificate-links"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-danger m-2 w-25"
                                        >
                                            {item.type}
                                        </button>
                                    </a>
                                    <br />
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default Certificates;
