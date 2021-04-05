import React from "react";
import "./acadRegistration.css";
import { Tabs, Tab } from "react-bootstrap";
import BlankSem from "./blankSem";
import CourseSelection from "./courseSelection";
import { useState } from "react";
import SubmitPage from "./submit";

const AcademicRegistration = () => {
  const [blankState, setBlankState] = useState("");
  if (blankState === "YES") {
    return <SubmitPage />;
  }

  return (
    <Tabs defaultActiveKey="blankSem" id="uncontrolled-tab-example">
      <Tab eventKey="blankSem" title="Blank Sem">
        <BlankSem
          passBlankChoice={(word) => {
            alert(word);
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
  );
};

export default AcademicRegistration;
