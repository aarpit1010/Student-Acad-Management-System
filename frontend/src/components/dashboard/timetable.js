import React from "react";
import { Tabs, Tab, Table } from "react-bootstrap";

const tableDetails = ({ data }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Day</th>
          <th>0900 - 1100 hrs</th>
          <th>1110 - 1310 hrs</th>
          <th>1510 - 1710 hrs</th>
          <th>1710 - 1910 hrs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, key) => (
          <tr>
            <td>{item.courseID}</td>
            <td>{item.courseName}</td>
            <td>{item.c1}</td>
            <td>{item.c2}</td>
            <td>{item.c3}</td>
            <td>{item.total}</td>
            <td>{item.gpa}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default function Timetable() {
  const data = fetch("http://localhost:3001/student/timetable")
    .then((response) => response.json())
    .then((json) => console.log(json));
}
