import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Auth from "../../auth/Auth";
import { useHistory } from "react-router-dom";
import TimeProfile from "../dashboard/timeProfile";

import axios from "axios";
import { Modal, Button, ListGroup } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
    const [isLoading, setLoading] = useState(true);
    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        axios
            .get("/student/notifications", {
                headers: {
                    "auth-token": localStorage.token,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                setNotifs(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    if (isLoading) {
        return <div className="Course-Summary">Loading...</div>;
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Notifications
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {notifs.notifs_arr.map((item, key) => {
                        return (
                            <ListGroup.Item className="list-unstyled">
                                <h6>{item.sent_time}</h6>
                                <p>{item.message}</p>
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Navigation(hasAuth) {
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();

    const handleLogout = () => {
        Auth.logoutStudent(() => {
            localStorage.clear();
            history.push("/selectUser");
        });
    };

    if (hasAuth)
        return (
            <div className="navbar-student-page">
                <nav className="navbar-expand-lg navbar-light bg-light">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="navbar-student collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ml-auto">
                            <li
                                className="nav-item nav-link pt-3 pr-3"
                                style={{ color: "white" }}
                            >
                                <TimeProfile />
                            </li>
                            <li className="nav-item nav-link pt-3 pr-3">
                                <Link
                                    to="/student/profile"
                                    style={{ color: "white" }}
                                >
                                    <i class="bi bi-person"></i>
                                </Link>
                            </li>
                            <li
                                className="nav-item nav-link pt-3 pr-3"
                                style={{ color: "white" }}
                            >
                                {/* <Link to="/student/notifications" style={{ color: "white" }}> */}
                                <i
                                    class="bi bi-bell"
                                    onClick={() => setModalShow(true)}
                                ></i>

                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                {/* </Link> */}
                            </li>
                            <li className="nav-item nav-link">
                                <Button
                                    variant="danger"
                                    onClick={() => handleLogout()}
                                >
                                    Logout
                                </Button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    else return <></>;
}

export default Navigation;
