import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./timetable.css";
import axios from "axios";

function Timetable() {
    const [data, setData] = useState({});

    useEffect(() => {
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
    }, []);

    const daysArray = [];

    for (const key in data.day) {
        const innerArray = [];
        innerArray.push(key);
        data.day[key].map((item) => {
            innerArray.push(item);
        });
        daysArray.push(innerArray);
    }

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
    );
}

export default Timetable;
