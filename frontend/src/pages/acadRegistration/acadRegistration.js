import React, { useEffect } from "react";
import "./acadRegistration.css";
import { Tabs, Tab } from "react-bootstrap";
import BlankSem from "./blankSem";
import CourseSelection from "./courseSelection";
import { useState } from "react";
import SubmitPage from "./submit";
import axios from "axios";

const AcademicRegistration = () => {
    const [blankState, setBlankState] = useState(true);
    const [hasOpted, setHasOpted] = useState(false);

    useEffect(() => {
        const headers = {
            headers: {
                "auth-token": localStorage.token,
                "Content-Type": "application/json",
            },
        };

        axios
            .get("/student/courseregn/opted/list", headers)
            .then((response) => {
                setHasOpted(response.data.hasOpted);
            })
            .catch((error) => console.log(error));
    }, []);

    if (hasOpted || blankState === "YES") {
        return <SubmitPage />;
    }

    return (
        <div className="dashboard-student">
            <Tabs id="uncontrolled-tab-example">
                <Tab eventKey="blankSem" title="Blank Sem">
                    <BlankSem
                        passBlankChoice={(word) => {
                            if (word === "YES") {
                                alert("You have opted for Blank Semester");
                            } else {
                                alert("You have not opted for Blank Semester");
                            }
                            setBlankState(word);
                        }}
                    />
                </Tab>

                <Tab
                    eventKey="Course Selection"
                    title="Course Selection"
                    disabled={!blankState}
                >
                    <CourseSelection />
                </Tab>
            </Tabs>
        </div>
    );
};

export default AcademicRegistration;
