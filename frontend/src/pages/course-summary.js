import React, { useState, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./course-summary.css";
import axios from "axios";

const CourseSummary = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/student/marks", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div className="Course-Summary">Loading...</div>;
  }

  return (
    <div>
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
        {/* <Tab eventKey="dropped" title="DROPPED">
          <Dropped />
        </Tab> */}
        <Tab eventKey="completed" title="COMPLETED">
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
              {data.course.map((c, courseKey) => {
                //   return data.marks.map((m, marksKey) => {
                return (
                  <tr>
                    <td>{courseKey + 1}</td>
                    <td>{c.course_ID}</td>
                    <td>{c.course_Name}</td>
                    <td>{data.marks[courseKey].c1}</td>
                    <td>{data.marks[courseKey].c2}</td>
                    <td>{data.marks[courseKey].c3}</td>
                    <td>{data.marks[courseKey].total}</td>
                    <td>{data.marks[courseKey].gpa}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        {/*
      <Tab eventKey="unregistered" title="UNREGISTERED">
        <DetailsTable data={data} />
      </Tab>
      <Tab eventKey="dropped" title="DROPPED">
        <DetailsTable data={data} />
      </Tab> */}
      </Tabs>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Attendance / 90</th>
          </tr>
        </thead>
        <tbody>
          {data.course.map((c, courseKey) => {
            return (
              <tr>
                <td>{courseKey + 1}</td>
                <td>{c.course_ID}</td>
                <td>{c.course_Name}</td>
                <td>{data.attendance[courseKey].daysout0f90}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default CourseSummary;
