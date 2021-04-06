import React, { useEffect } from "react";
import "./acadRegistration.css";
import { Tabs, Tab } from "react-bootstrap";
import BlankSem from "./blankSem";
import CourseSelection from "./courseSelection";
import { useState } from "react";
import SubmitPage from "./submit";
import axios from "axios";

const AcademicRegistration = () => {
  const [isLoading, setLoading] = useState(true);
  const [blankState, setBlankState] = useState("");
  const [optedCourses, setOptedCourses] = useState(null);
  const [completed, setCompleted] = useState(false);

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
        setOptedCourses(response.data);
        console.log(optedCourses);
        setLoading(false);

        if (
          optedCourses.data &&
          optedCourses.data !== "Student hasn't opted for any courses"
        ) {
          setCompleted(true);
          return <SubmitPage />;
        }
      })
      .catch((error) => console.log(error));
  });

  if (blankState === "YES") {
    return <SubmitPage />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return null;

  //   if (completed === false) {
  //     return (
  //       <div>
  //         <Tabs id="uncontrolled-tab-example">
  //           <Tab eventKey="blankSem" title="Blank Sem">
  //             <BlankSem
  //               passBlankChoice={(word) => {
  //                 if (word === "YES") {
  //                   alert("You have opted for Blank Semester");
  //                 } else {
  //                   alert("You have not opted for Blank Semester");
  //                 }
  //                 setBlankState(word);
  //               }}
  //             />
  //           </Tab>

  //           <Tab
  //             eventKey="Course Selection"
  //             title="Course Selection"
  //             disabled={!blankState}
  //           >
  //             <CourseSelection />
  //           </Tab>
  //         </Tabs>
  //       </div>
  //     );
  //   }
};

export default AcademicRegistration;
