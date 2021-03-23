import React, { useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./course-summary.css";
import axios from "axios";

const CourseSummary = () => {
  const [data, setData] = useState({});

  axios
    .get("/student/marks", {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => console.log(error));

  console.log(data);

  return (
    <Tabs
      id="course-summary-tabs"
      defaultActiveKey="enrolled"
      variant="tabs"
      style={{
        color: "white",
        fontWeight: "bold",
        padding: "10px",
      }}
    >
      <Tab eventKey="enrolled" title="ENROLLED">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>C1 Marks</th>
              <th>C2 Marks</th>
              <th>C3 Marks</th>
              <th>Total</th>
              <th>GPA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>key + 1</td>
              {/* {
              <td>{item.courseID}</td>
              <td>{item.courseName}</td>
              <td>{item.c1}</td>
              <td>{item.c2}</td>
              <td>{item.c3}</td>
              <td>{item.total}</td>
              <td>{item.gpa}</td>} */}
            </tr>
          </tbody>
        </Table>
      </Tab>
      {/* <Tab eventKey="completed" title="COMPLETED">
        <DetailsTable data={data} />
      </Tab>
      <Tab eventKey="unregistered" title="UNREGISTERED">
        <DetailsTable data={data} />
      </Tab>
      <Tab eventKey="dropped" title="DROPPED">
        <DetailsTable data={data} />
      </Tab> */}
    </Tabs>
  );
};

export default CourseSummary;
