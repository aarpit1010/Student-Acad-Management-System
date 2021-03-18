import React from "react";
import { Table } from "react-bootstrap";
import "./timetable.css";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const DetailsTable = ({ data }) => {
  return (
    <Table responsive striped bordered hover variant="dark">
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
        {data.day.map((item, key) => (
          <tr>
            <td>{days[key]}</td>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>{item[3]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default function Timetable() {
  const data = {
    _id: "604d095acc41b23b8c4495a6",
    semester: 4,
    section: "A",
    day: [
      ["DAA", "PPL", "DAA", "NULL"],
      ["DBMS", "SE", "PPL", "PPL"],
      ["SE", "CN", "DBMS", "PPL"],
      ["CN", "NULL", "DAA", "NULL"],
      ["NULL", "NULL", "DAA", "NULL"],
    ],
  };
  return <DetailsTable data={data} />;
}
