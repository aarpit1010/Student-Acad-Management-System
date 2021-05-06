import React, { useState, useEffect } from "react";
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
    }, [notifs]);

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

export default function Notifications() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="mx-auto">
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}
