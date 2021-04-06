import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./timetable.css";
import axios from "axios";

function Timetable() {
  const [data, setData] = useState({});
  const daysArray = [];

  useEffect(() => {
    axios
      .get("/student/timetable", {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("DATA FETCHED", response.data.data[0]);
        setData(response.data.data[0]);

        for (const key in data.day) {
          const innerArray = [];
          innerArray.push(key);
          data.day[key].map((item) => {
            innerArray.push(item);
          });
          daysArray.push(innerArray);
        }
      })
      .catch((error) => console.log(error));

    //   console.log("THIS IS MY RESPONSE:: ", data.day);
  }, []);

  return (
    <div>
      {data === undefined ? (
        <div style={{ color: "red", fontSize: "20px" }}>
          TIMETABLE HASN'T BEEN UPLOADED YET.
        </div>
      ) : (
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
            {daysArray.map((outer, keyOuter) => {
              return (
                <tr key={keyOuter} id={keyOuter}>
                  {outer.map((inner, keyInner) => {
                    return (
                      <td key={keyInner} id={keyInner}>
                        {inner}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Timetable;
