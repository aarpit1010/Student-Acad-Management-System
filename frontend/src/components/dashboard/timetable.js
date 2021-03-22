import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./timetable.css";
import axios from "axios";

function Timetable() {
  const [data, setData] = useState({});

  axios
    .get("/student/timetable", {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setData(response.data.data[0]);
      // console.log("DATA FETCHED", response.data);
    })
    .catch((error) => console.log(error));

  //   console.log("THIS IS MY RESPONSE:: ", data.day);

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
      {/* <tbody>
        {data.day.map((item, key) => (
          <tr>
            <td>{}</td>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>{item[3]}</td>
          </tr>
        ))}
      </tbody> */}
    </Table>
  );
}

export default Timetable;
